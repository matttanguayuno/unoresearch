// ============================================================
// Requirements Tab – Renderer with collaborative features
// ============================================================
(function () {
  var _initDone = false;
  var _viewMode = 'category'; // 'category' | 'priority' | 'uvp'
  var _collabData = { votes: {}, comments: {}, suggestions: [] };
  var _author = localStorage.getItem('req-author') || '';
  var _openCommentPanel = null; // track currently open comment panel to auto-close

  // ---- Mapping from requirement IDs to data.js feature IDs ----
  var REQ_TO_FEATURE = {
    'github-native-integration': 'gh_native',
    'branching': 'branching',
    'code-export-project-ownership': 'code_export_native_ownership',
    'import-existing-repo': 'import_repo',
    'create-new-repo': 'create_repo',
    'push-prs': 'pr_creation',
    'merging-in-product': 'merge_in_product',
    'codebase-aware-prompting': 'codebase_aware_prompting',
    'file-component-targeting': 'file_component_targeting',
    'diff-aware-prompting': 'diff_aware_prompting',
    'persistent-prompt-memory': 'persistent_prompt_memory',
    'screenshot-as-prompt-input': 'screenshot_prompt_input',
    'repo-as-ai-input': 'repo_as_ai_input',
    'figma-app-import': 'figma_import',
    'runtime-preview-state-ai-input': 'runtime_preview_as_input',
    'custom-assets': 'custom_assets',
    'mcp-tool-connectors': 'mcp_connectors',
    'db-state-usable-by-ai': 'db_state_as_context',
    'telemetry-analytics-ai-input': 'telemetry_as_context',
    'backend-integration': 'opinionated_backend',
    'secrets-management': 'secrets_handling_documented',
    'validation-before-apply': 'validation_before_apply',
    'shareable-preview-staging': 'shareable_preview_links',
    'auto-rollback-on-failure': 'auto_rollback',
    'explicit-mobile-app-target': 'explicit_mobile_target',
    'mobile-framework': 'mobile_framework',
    'on-device-testing': 'on_device_testing',
    'hot-reload-on-device': 'hot_reload_on_device',
    'native-ui-navigation': 'native_ui_navigation',
    'device-apis-services': 'device_apis_services',
    'mobile-first-editing': 'mobile_first_editing',
    'web-app-publishing': 'web_publishing',
    'app-store-deployment': 'app_store_deployment',
    'live-updates-after-publish': 'live_updates_after_publish',
    'cross-platform-7-targets': 'cross_platform_single_codebase',
    'desktop-app-target': 'desktop_app_target',
    'embedded-iot-targets': 'embedded_iot_target',
    'accessible-output-wcag': 'a11y_generation',
    'visual-regression-testing': 'visual_regression_testing',
    'design-system-theming': 'design_system_enforcement',
    'llm-model-selection': 'llm_model_choice',
    'mode-selection': 'mode_selection',
    'local-self-hosted-ai': 'local_selfhosted_ai',
    'credits-token-pricing': 'credits',
    'sample-templates': 'templates',
    'in-app-feedback': 'feedback',
    'starting-prompt': 'starting_prompt',
    'speech-to-prompt': 'speech_to_prompt'
  };

  // Map requirement IDs to Agent UX/UI feature IDs (for supplementary screenshots)
  var REQ_TO_UX_FEATURE = {
    'starting-prompt': 'starting-prompt',
    'speech-to-prompt': 'speech-to-prompt',
    'in-app-feedback': 'feedback',
    'llm-model-selection': 'llm-model-selection',
    'mode-selection': 'multi-mode',
    'credits-token-pricing': 'token-management',
    'screenshot-as-prompt-input': 'visual-edits'
  };

  // ---- Show competitive landscape panel ----
  function showCompetitiveLandscape(reqId, event) {
    var featureId = REQ_TO_FEATURE[reqId];
    if (!featureId) return;
    var feature = findFeature(featureId);
    if (!feature) return;

    var tools = currentData.tools;
    var html = '<div class="fm-popup-header">' + feature.name + '</div>';

    // Why It Matters & Uno Opportunity as context cards
    if (feature.whyItMatters || feature.unoOpportunity) {
      html += '<div class="fm-popup-context">';
      if (feature.whyItMatters) {
        html += '<div class="fm-popup-context-card">';
        html += '<h4>Why It Matters</h4>';
        html += '<p>' + feature.whyItMatters + '</p>';
        html += '</div>';
      }
      if (feature.unoOpportunity) {
        html += '<div class="fm-popup-context-card">';
        html += '<h4>Uno Opportunity</h4>';
        html += '<p>' + feature.unoOpportunity + '</p>';
        html += '</div>';
      }
      html += '</div>';
    }

    // Build merged tool list (data.js + agent-ux, deduplicated)
    var uxFeatureId = REQ_TO_UX_FEATURE[reqId];
    var seenTools = {};
    var allToolRows = [];

    tools.forEach(function (tool) {
      var cell = feature.cells[tool.id];
      if (!cell) return;
      seenTools[normalizeToolName(tool.name)] = true;
      allToolRows.push({ name: tool.name, status: cell.status, note: cell.note, screenshots: cell.screenshots || [], basePath: 'screenshots/' });
    });

    if (uxFeatureId && typeof AGENT_UX_TOOLS !== 'undefined' && typeof AGENT_UX_MATRIX !== 'undefined') {
      AGENT_UX_TOOLS.forEach(function (tool) {
        if (seenTools[normalizeToolName(tool.name)]) return;
        var uxCell = AGENT_UX_MATRIX[tool.id] && AGENT_UX_MATRIX[tool.id][uxFeatureId];
        if (!uxCell) return;
        if (uxCell.status === 'NO' && (!uxCell.screenshots || uxCell.screenshots.length === 0) && !uxCell.note) return;
        seenTools[normalizeToolName(tool.name)] = true;
        var paths = (uxCell.screenshots || []).map(function (f) {
          if (f.indexOf('/') !== -1) return f;
          return 'AI Agent UI/' + tool.id + '/' + f;
        });
        allToolRows.push({ name: tool.name, status: uxCell.status, note: uxCell.note, screenshots: paths, basePath: '' });
      });
    }

    // Build tool groups for lightbox navigation
    var toolGroups = [];
    allToolRows.forEach(function (row) {
      if (row.screenshots.length > 0) {
        toolGroups.push({ name: row.name, screenshots: row.screenshots, basePath: row.basePath });
      }
    });
    window._reqToolGroups = toolGroups;

    // Build horizontal table: each column = one tool
    html += '<table class="fm-popup-table">';
    html += '<thead><tr>';
    allToolRows.forEach(function (row) {
      html += '<th>' + row.name + '</th>';
    });
    html += '</tr></thead>';
    html += '<tbody><tr>';
    var groupIdx = 0;
    allToolRows.forEach(function (row) {
      var icon = row.status === 'YES' ? '✅' : row.status === 'LIMITED' ? '⚠️' : '❌';
      var statusLabel = row.status === 'YES' ? 'Supported' : row.status === 'LIMITED' ? 'Limited' : row.status === 'NO' ? 'Not Supported' : 'Unknown';
      var pillClass = row.status === 'YES' ? 'status-yes' : row.status === 'LIMITED' ? 'status-limited' : row.status === 'NO' ? 'status-no' : 'status-unknown';

      html += '<td data-tool="' + row.name + '">';
      html += '<div class="fm-popup-status-pill ' + pillClass + '">' + icon + ' ' + statusLabel + '</div>';
      if (row.note) {
        html += '<p class="fm-popup-note">' + row.note + '</p>';
      }
      if (row.screenshots.length > 0) {
        var gi = groupIdx;
        groupIdx++;
        html += '<div class="fm-popup-screenshots">';
        row.screenshots.forEach(function (f, idx) {
          var src = (row.basePath + f).split('/').map(encodeURIComponent).join('/');
          html += '<img class="screenshot-thumb" src="' + src + '" alt="' + f + '" data-index="' + idx + '" data-group="' + gi + '" onclick="openReqLightbox(' + gi + ', ' + idx + ')">';
        });
        html += '</div>';
      }
      html += '</td>';
    });
    html += '</tr></tbody></table>';

    // Dev status toggle — Matt only
    if (_author === 'Matt Tanguay') {
      var curStatus = getDevStatus(reqId) || 'none';
      html += '<div class="detail-section" style="margin-top:1rem;">';
      html += '<h4 style="color:var(--text-muted);margin-bottom:0.5rem;">Studio Live Status</h4>';
      html += '<div id="req-dev-status-btns" style="display:flex;gap:0.5rem;">';

      var opts = [
        { val: 'none', label: 'Not started', icon: '—' },
        { val: 'designed', label: 'Designed', icon: '🎨' },
        { val: 'implemented', label: 'Implemented', icon: '💻' }
      ];
      opts.forEach(function (o) {
        var active = curStatus === o.val;
        html += '<button class="req-dev-status-btn' + (active ? ' active' : '') + '" data-status="' + o.val + '" data-req-id="' + reqId + '" style="' +
          'padding:0.35rem 0.75rem;border-radius:6px;border:1px solid ' + (active ? 'var(--uno-violet)' : 'var(--border)') + ';' +
          'background:' + (active ? 'rgba(140,0,184,0.15)' : 'var(--surface)') + ';' +
          'color:' + (active ? 'var(--uno-violet)' : 'var(--text-muted)') + ';' +
          'cursor:pointer;font-size:13px;">' + o.icon + ' ' + o.label + '</button>';
      });
      html += '</div></div>';
    }

    // Always show as fullscreen popup
    openDetailPanel(html, event);
    var panel = document.getElementById('detail-panel');
    if (panel) {
      panel.style.cssText = '';
      panel.classList.add('req-fullscreen');
      var existing = document.querySelector('.req-fullscreen-backdrop');
      if (!existing) {
        var backdrop = document.createElement('div');
        backdrop.className = 'req-fullscreen-backdrop';
        backdrop.addEventListener('click', function () { closeDetailPanel(); });
        document.body.appendChild(backdrop);
      }
      document.body.style.overflow = 'hidden';
    }

    // Attach click handlers for status buttons
    if (_author === 'Matt Tanguay') {
      var statusHost = document.getElementById('detail-content');
      var btns = statusHost ? statusHost.querySelectorAll('.req-dev-status-btn') : [];
      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var newStatus = btn.getAttribute('data-status');
          var rid = btn.getAttribute('data-req-id');
          setDevStatus(rid, newStatus === 'none' ? null : newStatus);
          btns.forEach(function (b) {
            var isActive = b === btn;
            b.classList.toggle('active', isActive);
            b.style.borderColor = isActive ? 'var(--uno-violet)' : 'var(--border)';
            b.style.background = isActive ? 'rgba(140,0,184,0.15)' : 'var(--surface)';
            b.style.color = isActive ? 'var(--uno-violet)' : 'var(--text-muted)';
          });
          renderList();
        });
      });
    }
  }

  // Close detail panel (no longer needed for docked panel)
  window.closeReqDetailPanel = function () {};

  // ---- helpers ----
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'cls') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'style') node.style.cssText = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k.indexOf('on') === 0) node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (!c) return;
        if (typeof c === 'string') node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
      });
    }
    return node;
  }

  // ---- Author identity ----
  function ensureAuthor(callback) {
    if (_author) return callback(_author);
    showAuthorModal(callback);
  }

  function showAuthorModal(callback) {
    var overlay = el('div', { cls: 'req-author-modal' });
    var card = el('div', { cls: 'req-author-modal-card' });
    card.appendChild(el('h3', { text: 'What\'s your name?' }));
    card.appendChild(el('p', { cls: 'req-author-modal-sub', text: 'Your name will appear on votes, comments, and suggestions.' }));
    var input = el('input', { type: 'text', cls: 'req-author-modal-input', placeholder: 'Full name…', autocomplete: 'name' });
    card.appendChild(input);
    var errMsg = el('div', { cls: 'req-author-modal-err' });
    card.appendChild(errMsg);
    var actions = el('div', { cls: 'req-author-modal-actions' });
    var submitBtn = el('button', { cls: 'req-author-modal-btn', text: 'Continue', type: 'button' });
    actions.appendChild(submitBtn);
    card.appendChild(actions);
    overlay.appendChild(card);
    document.body.appendChild(overlay);
    setTimeout(function () { input.focus(); }, 50);

    function submit() {
      var val = input.value.trim();
      if (!val || val.length < 2) {
        errMsg.textContent = 'Please enter your full name.';
        return;
      }
      _author = val;
      localStorage.setItem('req-author', _author);
      overlay.remove();
      updateAuthorBar();
      callback(_author);
    }
    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  }

  function updateAuthorBar() {
    var bar = document.getElementById('req-author-bar');
    if (!bar) return;
    if (_author) {
      bar.innerHTML = '';
      bar.appendChild(el('span', { cls: 'req-author-label', text: 'Signed in as ' }));
      bar.appendChild(el('strong', { text: _author }));
      bar.appendChild(el('button', {
        cls: 'req-author-change', text: 'change',
        onclick: function () {
          _author = '';
          localStorage.removeItem('req-author');
          showAuthorModal(function () {});
        }
      }));
    } else {
      bar.innerHTML = '';
      bar.appendChild(el('button', {
        cls: 'req-author-change', text: 'Set your name to participate',
        onclick: function () { showAuthorModal(function () {}); }
      }));
    }
  }

  // ---- API helpers ----
  function apiGet(path, cb) {
    fetch(path).then(function (r) { return r.json(); }).then(cb).catch(function () {});
  }
  function apiPost(path, body, cb) {
    fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(cb).catch(function () {});
  }
  function apiDelete(path, body, cb) {
    fetch(path, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json(); }).then(cb).catch(function () {});
  }

  // ---- Build priority lookup from priorities array ----
  var _priorityMap = {};
  (function () {
    requirementsData.priorities.forEach(function (p) {
      _priorityMap[p.id] = p;
    });
  })();

  // ---- Flatten all features with their priority info attached ----
  function getAllFeatures() {
    var all = [];
    requirementsData.categories.forEach(function (cat) {
      cat.features.forEach(function (f) {
        var p = _priorityMap[f.priority] || _priorityMap['p1'];
        all.push({
          id: f.id,
          name: f.name,
          note: f.note,
          coverage: f.coverage,
          coverageDetail: f.coverageDetail,
          highlight: f.highlight,
          category: cat.name,
          categoryId: cat.id,
          priorityId: p.id,
          priorityLabel: p.label,
          priorityIcon: p.icon,
          priorityColor: p.tagColor,
          priorityBg: p.tagBg,
          priorityBorder: p.tagBorder
        });
      });
    });
    return all;
  }

  // ---- Priority pill ----
  function priorityPill(f) {
    return el('span', {
      cls: 'req-priority-pill',
      style: 'color:' + f.priorityColor + ';background:' + f.priorityBg + ';border-color:' + f.priorityBorder,
      text: f.priorityId.toUpperCase()
    });
  }

  // ---- Category pill ----
  function categoryPill(catName) {
    return el('span', { cls: 'req-category-pill', text: catName });
  }

  // ---- Coverage bar ----
  function normalizeToolName(name) {
    return name.toLowerCase().replace(/\.(new|io|app)$/i, '');
  }

  function coverageBar(coverageStr, reqId) {
    var val, max;
    var yes = [], limited = [], no = [];
    var tooltipEl = null;
    var featureKey = reqId ? REQ_TO_FEATURE[reqId] : null;
    var uxFeatureKey = reqId ? REQ_TO_UX_FEATURE[reqId] : null;
    var seen = {};

    // Gather statuses from main tools (data.js)
    if (featureKey) {
      var feature = findFeature(featureKey);
      if (feature && typeof currentData !== 'undefined') {
        currentData.tools.forEach(function (tool) {
          seen[normalizeToolName(tool.name)] = true;
          var cell = feature.cells[tool.id];
          if (!cell || cell.status === 'NO') no.push(tool.name);
          else if (cell.status === 'LIMITED') limited.push(tool.name);
          else yes.push(tool.name);
        });
      }
    }

    // Add Agent UX/UI tools (deduplicate by normalized name)
    if (uxFeatureKey && typeof AGENT_UX_TOOLS !== 'undefined' && typeof AGENT_UX_MATRIX !== 'undefined') {
      AGENT_UX_TOOLS.forEach(function (tool) {
        if (seen[normalizeToolName(tool.name)]) return;
        seen[normalizeToolName(tool.name)] = true;
        var uxCell = AGENT_UX_MATRIX[tool.id] && AGENT_UX_MATRIX[tool.id][uxFeatureKey];
        if (!uxCell || uxCell.status === 'NO') no.push(tool.name);
        else if (uxCell.status === 'LIMITED') limited.push(tool.name);
        else yes.push(tool.name);
      });
    }

    // Compute coverage dynamically if we have tool data, otherwise use static string
    if (yes.length || limited.length || no.length) {
      val = yes.length + limited.length;
      max = val + no.length;
    } else {
      var parts = coverageStr.split('/');
      val = parseInt(parts[0], 10);
      max = parseInt(parts[1], 10);
    }

    var pct = (val / max) * 100;
    var color = pct >= 80 ? 'var(--status-yes-border)' : pct >= 50 ? '#fbbf24' : '#ef4444';

    // Build tooltip
    if (yes.length || limited.length || no.length) {
      var lines = '';
      if (yes.length) lines += '<div class="req-cov-tip-row"><span class="req-cov-tip-icon" style="color:#67e5ad">✅</span>' + yes.join(', ') + '</div>';
      if (limited.length) lines += '<div class="req-cov-tip-row"><span class="req-cov-tip-icon" style="color:#f59e0b">⚠️</span>' + limited.join(', ') + '</div>';
      if (no.length) lines += '<div class="req-cov-tip-row"><span class="req-cov-tip-icon" style="color:#ef4444">❌</span>' + no.join(', ') + '</div>';
      tooltipEl = el('div', { cls: 'req-cov-tooltip', html: lines });
    }

    return el('div', { cls: 'req-coverage' }, [
      el('div', { cls: 'req-coverage-track' }, [
        el('div', { cls: 'req-coverage-fill', style: 'width:' + pct + '%;background:' + color })
      ]),
      el('span', { cls: 'req-coverage-label', text: val + '/' + max }),
      tooltipEl
    ]);
  }

  // ---- Vote widget ----
  function voteWidget(featureId) {
    var votes = _collabData.votes[featureId] || { up: [], down: [] };
    var container = el('div', { cls: 'req-vote' });

    function render() {
      votes = _collabData.votes[featureId] || { up: [], down: [] };
      container.innerHTML = '';
      var myUp = votes.up.indexOf(_author) >= 0;
      var myDown = votes.down.indexOf(_author) >= 0;

      var upBtn = el('button', {
        cls: 'req-vote-btn req-vote-up' + (myUp ? ' req-vote-active' : ''),
        html: '▲',
        title: votes.up.length ? 'Upvoted by: ' + votes.up.join(', ') : 'Upvote',
        onclick: function () {
          ensureAuthor(function (author) {
            apiPost('/api/vote', { featureId: featureId, author: author, direction: 'up' }, function (res) {
              _collabData.votes[featureId] = res.votes;
              render();
            });
          });
        }
      });
      var upCount = el('span', { cls: 'req-vote-count', text: '' + votes.up.length });

      var downBtn = el('button', {
        cls: 'req-vote-btn req-vote-down' + (myDown ? ' req-vote-active' : ''),
        html: '▼',
        title: votes.down.length ? 'Downvoted by: ' + votes.down.join(', ') : 'Downvote',
        onclick: function () {
          ensureAuthor(function (author) {
            apiPost('/api/vote', { featureId: featureId, author: author, direction: 'down' }, function (res) {
              _collabData.votes[featureId] = res.votes;
              render();
            });
          });
        }
      });

      container.appendChild(upBtn);
      container.appendChild(upCount);
      container.appendChild(downBtn);
    }

    render();
    return container;
  }

  // ---- Comment section ----
  function commentSection(featureId) {
    var comments = _collabData.comments[featureId] || [];
    var wrapper = el('div', { cls: 'req-comments-wrapper' });
    var expanded = false;

    var toggleBtn = el('button', {
      cls: 'req-comments-toggle',
      html: '💬 ' + (comments.length || ''),
      title: 'Comments',
      onclick: function () {
        if (!expanded) {
          // Close any other open comment panel first
          if (_openCommentPanel && _openCommentPanel !== closeThis) {
            _openCommentPanel();
          }
          expanded = true;
          // Position panel fixed relative to toggle button
          var btnRect = toggleBtn.getBoundingClientRect();
          panel.style.top = (btnRect.bottom + 4) + 'px';
          panel.style.left = Math.max(8, btnRect.right - 320) + 'px';
          panel.style.display = 'block';
          toggleBtn.classList.add('req-comments-toggle--open');
          _openCommentPanel = closeThis;
          document.addEventListener('mousedown', outsideClickHandler);
          window.addEventListener('scroll', repositionPanel, true);
        } else {
          closeThis();
        }
      }
    });

    function repositionPanel() {
      if (!expanded) return;
      var btnRect = toggleBtn.getBoundingClientRect();
      panel.style.top = (btnRect.bottom + 4) + 'px';
      panel.style.left = Math.max(8, btnRect.right - 320) + 'px';
    }

    function closeThis() {
      if (!expanded) return;
      // Auto-send any typed comment before closing
      var input = panel.querySelector('.req-comment-input');
      if (input && input.value.trim()) {
        var text = input.value.trim();
        ensureAuthor(function (author) {
          apiPost('/api/comment', { featureId: featureId, author: author, text: text }, function (res) {
            if (!_collabData.comments[featureId]) _collabData.comments[featureId] = [];
            _collabData.comments[featureId].push(res.comment);
            renderComments();
          });
        });
      }
      expanded = false;
      panel.style.display = 'none';
      toggleBtn.classList.remove('req-comments-toggle--open');
      if (_openCommentPanel === closeThis) _openCommentPanel = null;
      document.removeEventListener('mousedown', outsideClickHandler);
      window.removeEventListener('scroll', repositionPanel, true);
    }

    function outsideClickHandler(e) {
      if (!expanded) return;
      // Grace area: 20px around the panel
      var rect = panel.getBoundingClientRect();
      var grace = 20;
      var x = e.clientX, y = e.clientY;
      if (x >= rect.left - grace && x <= rect.right + grace &&
          y >= rect.top - grace && y <= rect.bottom + grace) return;
      // Also allow clicks on the toggle button itself
      if (wrapper.contains(e.target)) return;
      closeThis();
    }

    var panel = el('div', { cls: 'req-comments-panel', style: 'display:none' });
    document.body.appendChild(panel);

    function renderComments() {
      comments = _collabData.comments[featureId] || [];
      panel.innerHTML = '';

      // Close button
      panel.appendChild(el('button', {
        cls: 'req-comments-close', html: '✕', title: 'Close',
        onclick: function () { closeThis(); }
      }));
      toggleBtn.innerHTML = '💬 ' + (comments.length || '');
      toggleBtn.classList.toggle('req-comments-toggle--has', comments.length > 0);

      if (comments.length === 0) {
        panel.appendChild(el('div', { cls: 'req-comments-empty', text: 'No comments yet.' }));
      } else {
        comments.forEach(function (c) {
          var timeAgo = relativeTime(c.timestamp);
          var headerChildren = [
            el('strong', { text: c.author }),
            el('span', { cls: 'req-comment-time', text: timeAgo })
          ];
          // Show delete button only for the comment author
          if (_author && c.author === _author) {
            headerChildren.push(el('button', {
              cls: 'req-comment-delete', text: 'delete', title: 'Delete your comment',
              onclick: function () {
                apiDelete('/api/comment', { featureId: featureId, commentId: c.id }, function () {
                  var arr = _collabData.comments[featureId];
                  if (arr) {
                    _collabData.comments[featureId] = arr.filter(function (x) { return x.id !== c.id; });
                  }
                  renderComments();
                });
              }
            }));
          }
          var comment = el('div', { cls: 'req-comment' }, [
            el('div', { cls: 'req-comment-header' }, headerChildren),
            el('div', { cls: 'req-comment-text', text: c.text })
          ]);
          panel.appendChild(comment);
        });
      }

      // Add comment input
      var inputRow = el('div', { cls: 'req-comment-input-row' });
      var input = el('input', { type: 'text', cls: 'req-comment-input', placeholder: 'Add a comment…' });
      var sendBtn = el('button', { cls: 'req-comment-send', text: 'Send', onclick: doSend });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSend(); });
      inputRow.appendChild(input);
      inputRow.appendChild(sendBtn);
      panel.appendChild(inputRow);

      function doSend() {
        var text = input.value.trim();
        if (!text) return;
        ensureAuthor(function (author) {
          apiPost('/api/comment', { featureId: featureId, author: author, text: text }, function (res) {
            if (!_collabData.comments[featureId]) _collabData.comments[featureId] = [];
            _collabData.comments[featureId].push(res.comment);
            renderComments();
          });
        });
      }
    }

    renderComments();
    wrapper.appendChild(toggleBtn);
    return wrapper;
  }

  function relativeTime(isoStr) {
    var d = new Date(isoStr);
    var now = new Date();
    var diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
    return d.toLocaleDateString();
  }

  // ---- Dev status persistence (localStorage) ----
  var _devStatuses = JSON.parse(localStorage.getItem('req-dev-status') || '{}');

  function getDevStatus(reqId) { return _devStatuses[reqId] || null; }

  function setDevStatus(reqId, status) {
    if (status) _devStatuses[reqId] = status;
    else delete _devStatuses[reqId];
    localStorage.setItem('req-dev-status', JSON.stringify(_devStatuses));
  }

  // ---- Status icon for design / implemented state ----
  function statusIcon(f) {
    var s = getDevStatus(f.id);
    if (s === 'implemented') return el('span', { cls: 'req-status-icon', title: 'Implemented in Studio Live', html: '💻' });
    if (s === 'designed') return el('span', { cls: 'req-status-icon', title: 'Designed', html: '🎨' });
    return null;
  }

  // ---- Feature row ----
  function featureRow(f, mode) {
    var tagEl = mode === 'category' ? priorityPill(f) : categoryPill(f.category);
    var hasMapping = !!REQ_TO_FEATURE[f.id];
    var clickHandler = hasMapping ? function (e) {
      // Don't trigger if clicking a link or button inside
      if (e.target.closest('a') || e.target.closest('button')) return;
      e.preventDefault();
      showCompetitiveLandscape(f.id, e);
    } : null;

    var infoEl = el('div', { cls: 'req-feature-info' + (hasMapping ? ' req-feature-clickable' : ''), onclick: clickHandler }, [
      el('div', { cls: 'req-feature-name' }, [
        f.highlight ? el('span', { cls: 'req-star', html: '★' }) : null,
        hasMapping
          ? el('span', { cls: 'req-feature-link' }, [f.name])
          : f.name,
        statusIcon(f),
        tagEl
      ]),
      el('div', { cls: 'req-feature-note', text: f.note })
    ]);

    var metaEl = el('div', { cls: 'req-feature-meta' + (hasMapping ? ' req-feature-clickable' : ''), onclick: clickHandler }, [
      coverageBar(f.coverage, f.id)
    ]);

    var row = el('div', { cls: 'req-feature-row' + (f.highlight ? ' req-feature-highlight' : ''), 'data-req-id': f.id }, [
      voteWidget(f.id),
      infoEl,
      metaEl,
      commentSection(f.id)
    ]);
    return row;
  }

  // ---- Suggestion row (visual distinction) ----
  function suggestionRow(s) {
    var hasComments = (_collabData.comments[s.id] || []).length > 0;
    var canDelete = _author && s.author === _author && !hasComments;

    var nameChildren = [
      s.name,
      el('span', { cls: 'req-suggested-badge', text: 'Suggested by ' + s.author })
    ];
    if (canDelete) {
      nameChildren.push(el('button', {
        cls: 'req-suggestion-delete', html: '✕', title: 'Delete your suggestion',
        onclick: function () {
          if (!confirm('Delete this suggested requirement?')) return;
          apiDelete('/api/suggest', { suggestionId: s.id }, function () {
            _collabData.suggestions = _collabData.suggestions.filter(function (x) { return x.id !== s.id; });
            renderList();
          });
        }
      }));
    }

    return el('div', { cls: 'req-feature-row req-suggested-item' }, [
      voteWidget(s.id),
      el('div', { cls: 'req-feature-info' }, [
        el('div', { cls: 'req-feature-name' }, nameChildren),
        s.note ? el('div', { cls: 'req-feature-note', text: s.note }) : null
      ]),
      el('div', { cls: 'req-feature-meta' }, [
        el('div', { cls: 'req-suggested-time', text: relativeTime(s.timestamp) })
      ]),
      commentSection(s.id)
    ]);
  }

  // ---- Suggest form ----
  function suggestButton(categoryId) {
    var container = el('div', { cls: 'req-suggest-container' });
    var btn = el('button', {
      cls: 'req-suggest-btn', html: '+ Suggest a Requirement',
      onclick: function () {
        if (container.querySelector('.req-suggest-form')) return;
        showSuggestForm(container, categoryId);
      }
    });
    container.appendChild(btn);
    return container;
  }

  function showSuggestForm(container, categoryId) {
    var form = el('div', { cls: 'req-suggest-form' });
    var nameInput = el('input', { type: 'text', cls: 'req-suggest-input', placeholder: 'Feature name…' });
    var noteInput = el('input', { type: 'text', cls: 'req-suggest-input', placeholder: 'Notes / rationale (optional)…' });
    var actions = el('div', { cls: 'req-suggest-actions' });
    var submitBtn = el('button', { cls: 'req-suggest-submit', text: 'Submit', onclick: doSubmit });
    var cancelBtn = el('button', { cls: 'req-suggest-cancel', text: 'Cancel', onclick: function () { form.remove(); } });
    actions.appendChild(submitBtn);
    actions.appendChild(cancelBtn);
    form.appendChild(nameInput);
    form.appendChild(noteInput);
    form.appendChild(actions);
    container.appendChild(form);
    nameInput.focus();

    nameInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') doSubmit(); });

    function doSubmit() {
      var name = nameInput.value.trim();
      if (!name) { nameInput.style.borderColor = '#ef4444'; return; }
      ensureAuthor(function (author) {
        apiPost('/api/suggest', { categoryId: categoryId, name: name, note: noteInput.value.trim(), author: author }, function (res) {
          _collabData.suggestions.push(res.suggestion);
          form.remove();
          // Re-render the list to show the new suggestion
          renderList();
        });
      });
    }
  }

  // ---- Collapsible group ----
  function renderGroup(title, features, mode, catId, startExpanded) {
    var body = el('div', { cls: 'req-group-body' });
    features.forEach(function (f) { body.appendChild(featureRow(f, mode)); });

    // Show suggestions for this category
    if (catId && mode === 'category') {
      var catSuggestions = _collabData.suggestions.filter(function (s) { return s.categoryId === catId; });
      if (catSuggestions.length) {
        body.appendChild(el('div', { cls: 'req-suggested-divider', text: 'Suggested' }));
        catSuggestions.forEach(function (s) { body.appendChild(suggestionRow(s)); });
      }
      body.appendChild(suggestButton(catId));
    }

    var collapsed = !startExpanded;
    var header = el('button', { cls: 'req-group-header', type: 'button' }, [
      el('span', { cls: 'req-group-toggle', html: collapsed ? '▸' : '▾' }),
      el('span', { cls: 'req-group-name', text: title })
    ]);

    var groupId = catId ? 'req-cat-' + catId : '';
    var container = el('div', {
      cls: 'req-group' + (collapsed ? ' req-group--collapsed' : ''),
      id: groupId
    }, [header, body]);

    header.addEventListener('click', function () {
      container.classList.toggle('req-group--collapsed');
      header.querySelector('.req-group-toggle').innerHTML =
        container.classList.contains('req-group--collapsed') ? '▸' : '▾';
    });

    return container;
  }

  // ---- Category sub-navigation ----
  function buildCategoryNav(features) {
    var container = el('div', { cls: 'req-cat-nav-container', id: 'req-cat-nav' });

    // Determine which categories have features
    var catIds = {};
    features.forEach(function (f) { catIds[f.categoryId] = true; });

    // Desktop: pill links
    var nav = el('nav', { cls: 'req-cat-nav req-cat-nav--pills' });
    requirementsData.categories.forEach(function (cat) {
      if (!catIds[cat.id]) return;
      var letter = cat.name.split('.')[0];
      var shortLabel = cat.name.replace(/^[A-L]\.\s*/, '');
      var item = el('a', {
        cls: 'req-cat-nav-item',
        href: '#req-cat-' + cat.id,
        text: letter + '. ' + shortLabel,
        onclick: function (e) {
          e.preventDefault();
          scrollToCategory(cat.id);
        }
      });
      nav.appendChild(item);
    });
    container.appendChild(nav);

    // Mobile: dropdown
    var select = el('select', { cls: 'req-cat-nav req-cat-nav--dropdown' });
    select.appendChild(el('option', { value: '', text: 'Jump to section…' }));
    requirementsData.categories.forEach(function (cat) {
      if (!catIds[cat.id]) return;
      var letter = cat.name.split('.')[0];
      var shortLabel = cat.name.replace(/^[A-L]\.\s*/, '');
      select.appendChild(el('option', { value: cat.id, text: letter + '. ' + shortLabel }));
    });
    select.addEventListener('change', function () {
      if (select.value) {
        scrollToCategory(select.value);
        select.value = '';
      }
    });
    container.appendChild(select);

    return container;
  }

  function scrollToCategory(catId) {
    var target = document.getElementById('req-cat-' + catId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (target.classList.contains('req-group--collapsed')) {
        target.classList.remove('req-group--collapsed');
        var toggle = target.querySelector('.req-group-toggle');
        if (toggle) toggle.innerHTML = '▾';
      }
    }
  }

  // ---- Build "By Category" view ----
  function buildCategoryView(allFeatures) {
    var container = el('div', { cls: 'req-list' });
    requirementsData.categories.forEach(function (cat) {
      var features = allFeatures.filter(function (f) { return f.categoryId === cat.id; });
      if (!features.length) return;
      container.appendChild(renderGroup(cat.name, features, 'category', cat.id, true));
    });
    return container;
  }

  // ---- Build "By Priority" view ----
  function buildPriorityView(allFeatures) {
    var container = el('div', { cls: 'req-list' });
    requirementsData.priorities.forEach(function (p) {
      var filtered = allFeatures.filter(function (f) { return f.priorityId === p.id; });
      if (!filtered.length) return;

      var groupTitle = p.icon + '  ' + p.label;
      var group = renderGroup(groupTitle, filtered, 'priority', null, true);

      var desc = el('div', { cls: 'req-priority-desc req-group-desc', text: p.description });
      group.insertBefore(desc, group.children[1]);

      container.appendChild(group);
    });
    return container;
  }

  // ---- Expand / Collapse all ----
  function toggleAllGroups(expand) {
    var groups = document.querySelectorAll('#req-list-container .req-group');
    groups.forEach(function (g) {
      if (expand) {
        g.classList.remove('req-group--collapsed');
        g.querySelector('.req-group-toggle').innerHTML = '▾';
      } else {
        g.classList.add('req-group--collapsed');
        g.querySelector('.req-group-toggle').innerHTML = '▸';
      }
    });
  }

  // ---- Main render ----
  var _allFeatures = [];
  var renderList; // hoisted for reuse

  function renderRequirements() {
    var host = document.getElementById('requirements-content');
    if (!host) return;
    host.innerHTML = '';

    _allFeatures = getAllFeatures();
    var totalCount = _allFeatures.length;

    // Header with author bar
    var headerBlock = el('div', { cls: 'av-header' }, [
      el('div', { cls: 'av-header__top' }, [
        el('div', {}, [
          el('h2', { cls: 'av-title' }, [
            'Studio Live Requirements'
          ])
        ])
      ]),
      el('div', { cls: 'req-author-bar', id: 'req-author-bar' })
    ]);
    host.appendChild(headerBlock);
    updateAuthorBar();

    // View toggle bar
    var viewBar = el('nav', { cls: 'uvc-subnav req-subnav' });
    var views = [
      { id: 'category', label: 'By Category' },
      { id: 'priority', label: 'By Priority' },
      { id: 'uvp', label: '★ UVP', tooltip: 'Unique Value Proposition — features that set Uno Studio apart' }
    ];
    views.forEach(function (v) {
      var btn = el('button', {
        cls: 'uvc-subnav-btn req-view-btn' + (v.id === _viewMode ? ' active' : ''),
        'data-view': v.id,
        type: 'button',
        text: v.label,
        title: v.tooltip || ''
      });
      btn.addEventListener('click', function () {
        if (_viewMode === v.id) return;
        _viewMode = v.id;
        document.querySelectorAll('.req-view-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.view === _viewMode);
        });
        renderList();
      });
      viewBar.appendChild(btn);
    });

    // Expand/Collapse buttons (grouped together)
    var expandCollapseGroup = el('div', { cls: 'req-expand-group' });
    var expandBtn = el('button', {
      cls: 'uvc-subnav-btn req-expand-btn', html: '⊞', title: 'Expand All', type: 'button',
      onclick: function () { toggleAllGroups(true); }
    });
    var collapseBtn = el('button', {
      cls: 'uvc-subnav-btn req-expand-btn', html: '⊟', title: 'Collapse All', type: 'button',
      onclick: function () { toggleAllGroups(false); }
    });
    expandCollapseGroup.appendChild(expandBtn);
    expandCollapseGroup.appendChild(collapseBtn);
    viewBar.appendChild(expandCollapseGroup);

    host.appendChild(viewBar);

    // Category nav placeholder
    host.appendChild(el('div', { id: 'req-cat-nav-container' }));

    // List container
    host.appendChild(el('div', { id: 'req-list-container' }));

    renderList = function () {
      var listHost = document.getElementById('req-list-container');
      var navHost = document.getElementById('req-cat-nav-container');

      // Lock container height to prevent scroll jump when content shrinks (e.g. UVP filter)
      listHost.style.minHeight = listHost.offsetHeight + 'px';

      listHost.innerHTML = '';
      navHost.innerHTML = '';

      var features = _allFeatures;
      if (_viewMode === 'uvp') {
        features = _allFeatures.filter(function (f) { return f.highlight; });
      }

      if (_viewMode === 'category' || _viewMode === 'uvp') {
        navHost.appendChild(buildCategoryNav(features));
        listHost.appendChild(buildCategoryView(features));
      } else {
        listHost.appendChild(buildPriorityView(features));
      }

      // Release height lock now that new content is in place
      listHost.style.minHeight = '';
    };

    renderList();
  }

  // ---- Public init ----
  window.initRequirements = function () {
    if (_initDone) return;
    _initDone = true;
    // Load collab data then render
    apiGet('/api/collab', function (data) {
      _collabData = data;
      renderRequirements();
    });
    // Fallback if API is unavailable (e.g., static hosting)
    setTimeout(function () {
      if (!document.getElementById('req-list-container')) {
        renderRequirements();
      }
    }, 2000);
  };
})();
