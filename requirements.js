// ============================================================
// Requirements Tab – Renderer with collaborative features
// ============================================================
(function () {
  var _initDone = false;
  var _viewMode = 'category'; // 'category' | 'priority'
  var _collabData = { votes: {}, comments: {}, suggestions: [] };
  var _author = localStorage.getItem('req-author') || '';
  var _openCommentPanel = null; // track currently open comment panel to auto-close

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
  function coverageBar(coverageStr) {
    var parts = coverageStr.split('/');
    var val = parseInt(parts[0], 10);
    var max = parseInt(parts[1], 10);
    var pct = (val / max) * 100;
    var color = val >= 5 ? 'var(--status-yes-border)' : val >= 3 ? '#fbbf24' : '#ef4444';
    return el('div', { cls: 'req-coverage' }, [
      el('div', { cls: 'req-coverage-track' }, [
        el('div', { cls: 'req-coverage-fill', style: 'width:' + pct + '%;background:' + color })
      ]),
      el('span', { cls: 'req-coverage-label', text: coverageStr })
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
      var downCount = el('span', { cls: 'req-vote-count', text: '' + votes.down.length });

      container.appendChild(upBtn);
      container.appendChild(upCount);
      container.appendChild(downBtn);
      container.appendChild(downCount);
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
          panel.style.display = 'block';
          toggleBtn.classList.add('req-comments-toggle--open');
          _openCommentPanel = closeThis;
        } else {
          closeThis();
        }
      }
    });

    function closeThis() {
      expanded = false;
      panel.style.display = 'none';
      toggleBtn.classList.remove('req-comments-toggle--open');
      if (_openCommentPanel === closeThis) _openCommentPanel = null;
    }

    var panel = el('div', { cls: 'req-comments-panel', style: 'display:none' });

    function renderComments() {
      comments = _collabData.comments[featureId] || [];
      panel.innerHTML = '';
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
              cls: 'req-comment-delete', html: '✕', title: 'Delete your comment',
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
    wrapper.appendChild(panel);
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

  // ---- Feature row ----
  function featureRow(f, mode) {
    var tagEl = mode === 'category' ? priorityPill(f) : categoryPill(f.category);
    var row = el('div', { cls: 'req-feature-row' + (f.highlight ? ' req-feature-highlight' : '') }, [
      el('div', { cls: 'req-feature-info' }, [
        el('div', { cls: 'req-feature-name' }, [
          f.highlight ? el('span', { cls: 'req-star', html: '★' }) : null,
          f.name,
          tagEl
        ]),
        el('div', { cls: 'req-feature-note', text: f.note })
      ]),
      el('div', { cls: 'req-feature-meta' }, [
        coverageBar(f.coverage),
        el('div', { cls: 'req-coverage-detail', text: f.coverageDetail })
      ]),
      el('div', { cls: 'req-feature-collab' }, [
        voteWidget(f.id),
        commentSection(f.id)
      ])
    ]);
    return row;
  }

  // ---- Suggestion row (visual distinction) ----
  function suggestionRow(s) {
    return el('div', { cls: 'req-feature-row req-suggested-item' }, [
      el('div', { cls: 'req-feature-info' }, [
        el('div', { cls: 'req-feature-name' }, [
          s.name,
          el('span', { cls: 'req-suggested-badge', text: 'Suggested by ' + s.author })
        ]),
        s.note ? el('div', { cls: 'req-feature-note', text: s.note }) : null
      ]),
      el('div', { cls: 'req-feature-meta' }, [
        el('div', { cls: 'req-suggested-time', text: relativeTime(s.timestamp) })
      ])
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
        body.appendChild(el('div', { cls: 'req-suggested-divider', text: 'Suggested by team' }));
        catSuggestions.forEach(function (s) { body.appendChild(suggestionRow(s)); });
      }
      body.appendChild(suggestButton(catId));
    }

    var collapsed = !startExpanded;
    var header = el('button', { cls: 'req-group-header', type: 'button' }, [
      el('span', { cls: 'req-group-toggle', html: collapsed ? '▸' : '▾' }),
      el('span', { cls: 'req-group-name', text: title }),
      el('span', { cls: 'req-group-count', text: features.length + ' feature' + (features.length !== 1 ? 's' : '') })
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
  function buildCategoryNav() {
    var nav = el('nav', { cls: 'req-cat-nav', id: 'req-cat-nav' });
    requirementsData.categories.forEach(function (cat) {
      var letter = cat.name.split('.')[0];
      var shortLabel = cat.name.replace(/^[A-L]\.\s*/, '');
      // Truncate long labels
      if (shortLabel.length > 20) shortLabel = shortLabel.substring(0, 18) + '…';
      var item = el('a', {
        cls: 'req-cat-nav-item',
        href: '#req-cat-' + cat.id,
        text: letter + '. ' + shortLabel,
        onclick: function (e) {
          e.preventDefault();
          var target = document.getElementById('req-cat-' + cat.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Expand if collapsed
            if (target.classList.contains('req-group--collapsed')) {
              target.classList.remove('req-group--collapsed');
              var toggle = target.querySelector('.req-group-toggle');
              if (toggle) toggle.innerHTML = '▾';
            }
          }
        }
      });
      nav.appendChild(item);
    });
    return nav;
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
            'Uno Studio Live Requirements',
            el('span', { cls: 'av-title__span', text: ' (' + totalCount + ' features, Draft)' })
          ]),
          el('p', { cls: 'subtitle', text: requirementsData.meta.subtitle })
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
      { id: 'priority', label: 'By Priority' }
    ];
    views.forEach(function (v) {
      var btn = el('button', {
        cls: 'uvc-subnav-btn req-view-btn' + (v.id === _viewMode ? ' active' : ''),
        'data-view': v.id,
        type: 'button',
        text: v.label
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

    // Expand/Collapse buttons
    var expandBtn = el('button', {
      cls: 'uvc-subnav-btn req-expand-btn', text: 'Expand All', type: 'button',
      onclick: function () { toggleAllGroups(true); }
    });
    var collapseBtn = el('button', {
      cls: 'uvc-subnav-btn req-expand-btn', text: 'Collapse All', type: 'button',
      onclick: function () { toggleAllGroups(false); }
    });
    viewBar.appendChild(expandBtn);
    viewBar.appendChild(collapseBtn);

    host.appendChild(viewBar);

    // Category nav placeholder
    host.appendChild(el('div', { id: 'req-cat-nav-container' }));

    // List container
    host.appendChild(el('div', { id: 'req-list-container' }));

    renderList = function () {
      var listHost = document.getElementById('req-list-container');
      var navHost = document.getElementById('req-cat-nav-container');
      listHost.innerHTML = '';
      navHost.innerHTML = '';

      if (_viewMode === 'category') {
        navHost.appendChild(buildCategoryNav());
        listHost.appendChild(buildCategoryView(_allFeatures));
      } else {
        listHost.appendChild(buildPriorityView(_allFeatures));
      }
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
