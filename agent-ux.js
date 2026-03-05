// ── Agent UX/UI Tab – Rendering Logic ──
// Matrix overview + near-fullscreen popup for cells, features, and tools

let uxInitialised = false;

function initAgentUx() {
  if (uxInitialised) return;
  uxInitialised = true;
  renderUxMatrix();

  // Close popup on backdrop click or Escape
  const popup = document.getElementById('ux-popup');
  popup.querySelector('.ux-popup-backdrop').addEventListener('click', closeUxPopup);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
      // Only close popup if lightbox isn't open
      const lightbox = document.getElementById('screenshot-lightbox');
      if (lightbox && !lightbox.classList.contains('hidden')) return;
      closeUxPopup();
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
      const clickAction = cell.screenshots.length > 0
        ? `onclick="openCellPopup('${tool.id}', '${feature.id}')"`
        : '';
      const hasShots = cell.screenshots.length > 0 ? 'ux-has-shots' : '';
      cells += `<td class="ux-matrix-cell ${statusClass} ${hasShots}" ${clickAction} title="${tool.name}: ${feature.name} — ${cell.status}">
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
      navigateUxPopup(dx < 0 ? 1 : -1);
    }
  }

  panel.addEventListener('touchstart', onTouchStart, { passive: true });
  panel.addEventListener('touchend', onTouchEnd, { passive: true });
  popup._swipeCleanup = function () {
    panel.removeEventListener('touchstart', onTouchStart);
    panel.removeEventListener('touchend', onTouchEnd);
  };
}

function navigateUxPopup(direction) {
  const ctx = uxPopupContext;
  if (ctx.type === 'cell') {
    // Navigate features for the same tool
    const featureIdx = AGENT_UX_FEATURES.findIndex(f => f.id === ctx.featureId);
    const newIdx = featureIdx + direction;
    if (newIdx >= 0 && newIdx < AGENT_UX_FEATURES.length) {
      openCellPopup(ctx.toolId, AGENT_UX_FEATURES[newIdx].id);
    }
  } else if (ctx.type === 'feature') {
    const featureIdx = AGENT_UX_FEATURES.findIndex(f => f.id === ctx.featureId);
    const newIdx = featureIdx + direction;
    if (newIdx >= 0 && newIdx < AGENT_UX_FEATURES.length) {
      openFeaturePopup(AGENT_UX_FEATURES[newIdx].id);
    }
  } else if (ctx.type === 'tool') {
    const toolIdx = AGENT_UX_TOOLS.findIndex(t => t.id === ctx.toolId);
    const newIdx = toolIdx + direction;
    if (newIdx >= 0 && newIdx < AGENT_UX_TOOLS.length) {
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
  return {
    toolId,
    toolName: AGENT_UX_TOOLS.find(t => t.id === toolId)?.name || toolId,
    filename,
    path: `AI Agent UI/${toolId}/${filename}`,
    src: `AI Agent UI/${encodeURIComponent(toolId)}/${encodeURIComponent(filename)}`,
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

  openUxPopup(
    `${feature.icon} ${feature.name} — ${tool.name}`,
    buildPinterestGrid(shots)
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
