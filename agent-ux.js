// ── Agent UX/UI Tab – Rendering Logic ──
// Matrix overview + near-fullscreen popup for cells, features, and tools

let uxInitialised = false;

function initAgentUx() {
  if (uxInitialised) return;
  uxInitialised = true;
  renderUxMatrix();

  // Close popup on backdrop click (with grace area) or Escape, arrow keys for navigation
  const popup = document.getElementById('ux-popup');
  popup.querySelector('.ux-popup-backdrop').addEventListener('click', (e) => {
    // Don't close if click is within 60px of the popup panel (grace area for arrows)
    const panel = popup.querySelector('.ux-popup-panel');
    const rect = panel.getBoundingClientRect();
    const grace = 60;
    if (e.clientX >= rect.left - grace && e.clientX <= rect.right + grace &&
        e.clientY >= rect.top - grace && e.clientY <= rect.bottom + grace) {
      return;
    }
    closeUxPopup();
  });
  document.addEventListener('keydown', (e) => {
    if (popup.classList.contains('hidden')) return;
    // Only close popup if lightbox isn't open
    const lightbox = document.getElementById('screenshot-lightbox');
    if (lightbox && !lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') {
      closeUxPopup();
    } else if (e.key === 'ArrowLeft') {
      navigateUxPopup('tool', -1);
    } else if (e.key === 'ArrowRight') {
      navigateUxPopup('tool', 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateUxPopup('feature', -1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateUxPopup('feature', 1);
    }
  });
}

// ─── Matrix View ───────────────────────────────────────────────────────────

function renderUxMatrix() {
  const container = document.getElementById('ux-matrix-view');

  // Build header row
  let headerHtml = '<th class="ux-matrix-corner"></th>';
  for (const tool of AGENT_UX_TOOLS) {
    headerHtml += `<th class="ux-matrix-tool-header" data-tool="${tool.id}" onclick="openToolPopup('${tool.id}')" title="View ${tool.name} screenshots">${tool.name}</th>`;
  }

  // Build feature rows
  let rowsHtml = '';
  for (const feature of AGENT_UX_FEATURES) {
    let cells = '';
    for (const tool of AGENT_UX_TOOLS) {
      const cell = getUxCell(tool.id, feature.id);
      const statusIcon = cell.status === 'YES' ? '✅' : cell.status === 'LIMITED' ? '⚠️' : '❌';
      const statusClass = cell.status === 'YES' ? 'ux-status-yes' : cell.status === 'LIMITED' ? 'ux-status-limited' : 'ux-status-no';
      const hasShots = cell.screenshots.length > 0 ? 'ux-has-shots' : '';
      cells += `<td class="ux-matrix-cell ux-clickable ${statusClass} ${hasShots}" onclick="openCellPopup('${tool.id}', '${feature.id}')" title="${tool.name}: ${feature.name} — ${cell.status}">
        <span class="ux-status-icon">${statusIcon}</span>
      </td>`;
    }
    rowsHtml += `<tr>
      <td class="ux-matrix-feature-header" onclick="openFeaturePopup('${feature.id}')" title="View all screenshots for ${feature.name}">
        <span class="ux-feature-icon">${feature.icon}</span> ${feature.name}
      </td>
      ${cells}
    </tr>`;
  }

  container.innerHTML = `
    <div class="ux-matrix-scroll">
      <table class="ux-matrix-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>`;
}

// ─── Popup Helpers ─────────────────────────────────────────────────────────

// Track current popup context for swipe navigation
let uxPopupContext = { type: null, toolId: null, featureId: null };

function openUxPopup(titleHtml, bodyHtml) {
  const popup = document.getElementById('ux-popup');
  popup.querySelector('.ux-popup-title').innerHTML = titleHtml;
  popup.querySelector('.ux-popup-body').innerHTML = bodyHtml;
  popup.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setupUxPopupSwipe();
  updateUxPopupArrows();
}

function setupUxPopupSwipe() {
  const popup = document.getElementById('ux-popup');
  const panel = popup.querySelector('.ux-popup-panel');

  // Remove previous listeners if any
  if (popup._swipeCleanup) {
    popup._swipeCleanup();
    popup._swipeCleanup = null;
  }

  let startX = 0, startY = 0, swiping = false;

  function onTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    swiping = true;
  }
  function onTouchEnd(e) {
    if (!swiping) return;
    swiping = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      // Horizontal swipe: tools for cells, features for feature popups, tools for tool popups
      const ctx = uxPopupContext;
      if (ctx.type === 'cell') {
        navigateUxPopup('tool', dx < 0 ? 1 : -1);
      } else if (ctx.type === 'feature') {
        navigateUxPopup('feature', dx < 0 ? 1 : -1);
      } else {
        navigateUxPopup('tool', dx < 0 ? 1 : -1);
      }
    }
  }

  panel.addEventListener('touchstart', onTouchStart, { passive: true });
  panel.addEventListener('touchend', onTouchEnd, { passive: true });
  popup._swipeCleanup = function () {
    panel.removeEventListener('touchstart', onTouchStart);
    panel.removeEventListener('touchend', onTouchEnd);
  };
}

function updateUxPopupArrows() {
  const popup = document.getElementById('ux-popup');
  const wrapper = popup.querySelector('.ux-popup-wrapper');
  const ctx = uxPopupContext;

  // Remove existing arrows
  popup.querySelectorAll('.ux-popup-arrow').forEach(a => a.remove());

  function addArrow(cls, html, title, disabled, axis, dir) {
    const btn = document.createElement('button');
    btn.className = 'ux-popup-arrow ' + cls;
    btn.innerHTML = html;
    btn.title = title;
    btn.disabled = disabled;
    btn.addEventListener('click', () => navigateUxPopup(axis, dir));
    wrapper.appendChild(btn);
  }

  if (ctx.type === 'cell') {
    const fIdx = AGENT_UX_FEATURES.findIndex(f => f.id === ctx.featureId);
    const tIdx = AGENT_UX_TOOLS.findIndex(t => t.id === ctx.toolId);
    addArrow('ux-popup-arrow--up',    '&#8249;', 'Previous feature (↑)', fIdx <= 0,                             'feature', -1);
    addArrow('ux-popup-arrow--down',  '&#8250;', 'Next feature (↓)',     fIdx >= AGENT_UX_FEATURES.length - 1,  'feature',  1);
    addArrow('ux-popup-arrow--left',  '&#8249;', 'Previous tool (←)',    tIdx <= 0,                             'tool',    -1);
    addArrow('ux-popup-arrow--right', '&#8250;', 'Next tool (→)',        tIdx >= AGENT_UX_TOOLS.length - 1,     'tool',     1);
  } else if (ctx.type === 'feature') {
    const fIdx = AGENT_UX_FEATURES.findIndex(f => f.id === ctx.featureId);
    addArrow('ux-popup-arrow--up',   '&#8249;', 'Previous feature (↑)', fIdx <= 0,                             'feature', -1);
    addArrow('ux-popup-arrow--down', '&#8250;', 'Next feature (↓)',     fIdx >= AGENT_UX_FEATURES.length - 1,  'feature',  1);
  } else if (ctx.type === 'tool') {
    const tIdx = AGENT_UX_TOOLS.findIndex(t => t.id === ctx.toolId);
    addArrow('ux-popup-arrow--left',  '&#8249;', 'Previous tool (←)', tIdx <= 0,                           'tool', -1);
    addArrow('ux-popup-arrow--right', '&#8250;', 'Next tool (→)',     tIdx >= AGENT_UX_TOOLS.length - 1,   'tool',  1);
  }
}

function navigateUxPopup(axis, direction) {
  const ctx = uxPopupContext;
  if (axis === 'feature') {
    // Navigate along feature axis (rows)
    if (!ctx.featureId && ctx.type !== 'feature') return;
    const featureIdx = AGENT_UX_FEATURES.findIndex(f => f.id === ctx.featureId);
    const newIdx = featureIdx + direction;
    if (newIdx < 0 || newIdx >= AGENT_UX_FEATURES.length) return;
    if (ctx.type === 'cell') {
      openCellPopup(ctx.toolId, AGENT_UX_FEATURES[newIdx].id);
    } else {
      openFeaturePopup(AGENT_UX_FEATURES[newIdx].id);
    }
  } else if (axis === 'tool') {
    // Navigate along tool axis (columns)
    if (ctx.type === 'cell') {
      const toolIdx = AGENT_UX_TOOLS.findIndex(t => t.id === ctx.toolId);
      const newIdx = toolIdx + direction;
      if (newIdx < 0 || newIdx >= AGENT_UX_TOOLS.length) return;
      openCellPopup(AGENT_UX_TOOLS[newIdx].id, ctx.featureId);
    } else if (ctx.type === 'tool') {
      const toolIdx = AGENT_UX_TOOLS.findIndex(t => t.id === ctx.toolId);
      const newIdx = toolIdx + direction;
      if (newIdx < 0 || newIdx >= AGENT_UX_TOOLS.length) return;
      openToolPopup(AGENT_UX_TOOLS[newIdx].id);
    }
  }
}

function closeUxPopup() {
  const popup = document.getElementById('ux-popup');
  popup.classList.add('hidden');
  document.body.style.overflow = '';
  // Pause any playing videos
  popup.querySelectorAll('video').forEach(v => v.pause());
  // Clean up swipe listeners
  if (popup._swipeCleanup) {
    popup._swipeCleanup();
    popup._swipeCleanup = null;
  }
  uxPopupContext = { type: null, toolId: null, featureId: null };
}

function buildPinterestGrid(shots) {
  if (shots.length === 0) {
    return '<p class="ux-empty">No screenshots available.</p>';
  }
  const paths = shots.map(s => s.path);
  let html = '';
  shots.forEach((shot, i) => {
    html += `<div class="ux-pin-item" onclick="openLightbox(${JSON.stringify(paths).replace(/"/g, '&quot;')}, ${i}, '')">
      <img src="${shot.src}" alt="${shot.filename}" loading="lazy">
      <div class="ux-pin-label">${shot.toolName}</div>
      <div class="ux-pin-filename">${shot.filename}</div>
    </div>`;
  });
  return `<div class="ux-pinterest-grid">${html}</div>`;
}

function buildShotEntry(toolId, filename) {
  // Support filenames with explicit path prefix (e.g. "screenshots/foo.png")
  const hasPath = filename.includes('/');
  const path = hasPath ? filename : `AI Agent UI/${toolId}/${filename}`;
  const src = hasPath
    ? filename.split('/').map(encodeURIComponent).join('/')
    : `AI Agent UI/${encodeURIComponent(toolId)}/${encodeURIComponent(filename)}`;
  return {
    toolId,
    toolName: AGENT_UX_TOOLS.find(t => t.id === toolId)?.name || toolId,
    filename,
    path,
    src,
  };
}

// ─── Cell Popup (single feature × tool) ────────────────────────────────────

function openCellPopup(toolId, featureId) {
  const tool = AGENT_UX_TOOLS.find(t => t.id === toolId);
  const feature = AGENT_UX_FEATURES.find(f => f.id === featureId);
  if (!tool || !feature) return;

  uxPopupContext = { type: 'cell', toolId, featureId };
  const cell = getUxCell(toolId, featureId);
  const shots = cell.screenshots.map(f => buildShotEntry(toolId, f));

  const statusText = cell.status === 'YES' ? 'Supported' : cell.status === 'LIMITED' ? 'Limited' : 'Not Supported';
  const statusIcon = cell.status === 'YES' ? '✅' : cell.status === 'LIMITED' ? '⚠️' : '❌';

  let bodyHtml = '<div class="ux-cell-detail">';
  bodyHtml += `<p class="ux-cell-status">${statusIcon} <span class="ux-cell-status-label">${statusText}</span></p>`;
  if (cell.note) {
    bodyHtml += `<div class="ux-cell-note">${cell.note}</div>`;
  }
  bodyHtml += '</div>';

  if (shots.length > 0) {
    bodyHtml += buildPinterestGrid(shots);
  }

  openUxPopup(
    `${feature.icon} ${feature.name} — ${tool.name}`,
    bodyHtml
  );
}

// ─── Feature Popup (one feature, all tools) ────────────────────────────────

function openFeaturePopup(featureId) {
  const feature = AGENT_UX_FEATURES.find(f => f.id === featureId);
  if (!feature) return;

  uxPopupContext = { type: 'feature', toolId: null, featureId };

  const allShots = [];
  for (const tool of AGENT_UX_TOOLS) {
    const cell = getUxCell(tool.id, featureId);
    for (const filename of cell.screenshots) {
      allShots.push(buildShotEntry(tool.id, filename));
    }
  }

  // Feature nav (prev/next)
  const featureIdx = AGENT_UX_FEATURES.findIndex(f => f.id === featureId);
  const prevFeature = featureIdx > 0 ? AGENT_UX_FEATURES[featureIdx - 1] : null;
  const nextFeature = featureIdx < AGENT_UX_FEATURES.length - 1 ? AGENT_UX_FEATURES[featureIdx + 1] : null;
  let navHtml = '<div class="ux-tool-nav">';
  navHtml += prevFeature
    ? `<button class="ux-tool-nav-btn" onclick="openFeaturePopup('${prevFeature.id}')">← ${prevFeature.icon} ${prevFeature.name}</button>`
    : '<span></span>';
  navHtml += nextFeature
    ? `<button class="ux-tool-nav-btn" onclick="openFeaturePopup('${nextFeature.id}')">${nextFeature.icon} ${nextFeature.name} →</button>`
    : '<span></span>';
  navHtml += '</div>';

  openUxPopup(
    `${feature.icon} ${feature.name}`,
    `${navHtml}${buildPinterestGrid(allShots)}${navHtml}`
  );
}

// ─── Tool Popup (one tool, video + all screenshots) ────────────────────────

function openToolPopup(toolId) {
  const tool = AGENT_UX_TOOLS.find(t => t.id === toolId);
  if (!tool) return;

  uxPopupContext = { type: 'tool', toolId, featureId: null };

  // Video (served from SiteGround – too large for GitHub)
  const videoFile = AGENT_UX_VIDEOS[toolId];
  const videoSrc = videoFile ? `https://mattt98.sg-host.com/AI%20Agent%20UI/${encodeURIComponent(toolId)}/${encodeURIComponent(videoFile)}` : '';
  let videoHtml = '';
  if (videoSrc) {
    videoHtml = `
      <div class="ux-video-wrapper">
        <video controls preload="metadata" class="ux-video-player">
          <source src="${videoSrc}" type="video/mp4">
          Your browser does not support video playback.
        </video>
      </div>`;
  }

  // All screenshots for this tool
  const allShots = [];
  for (const feature of AGENT_UX_FEATURES) {
    const cell = getUxCell(toolId, feature.id);
    for (const filename of cell.screenshots) {
      allShots.push(buildShotEntry(toolId, filename));
    }
  }

  // Tool nav (prev/next)
  const toolIdx = AGENT_UX_TOOLS.findIndex(t => t.id === toolId);
  const prevTool = toolIdx > 0 ? AGENT_UX_TOOLS[toolIdx - 1] : null;
  const nextTool = toolIdx < AGENT_UX_TOOLS.length - 1 ? AGENT_UX_TOOLS[toolIdx + 1] : null;
  let navHtml = '<div class="ux-tool-nav">';
  navHtml += prevTool
    ? `<button class="ux-tool-nav-btn" onclick="openToolPopup('${prevTool.id}')">← ${prevTool.name}</button>`
    : '<span></span>';
  navHtml += nextTool
    ? `<button class="ux-tool-nav-btn" onclick="openToolPopup('${nextTool.id}')">${nextTool.name} →</button>`
    : '<span></span>';
  navHtml += '</div>';

  openUxPopup(
    tool.name,
    `${navHtml}${videoHtml}${buildPinterestGrid(allShots)}${navHtml}`
  );
}
