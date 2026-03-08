// ============================================================
// Global Search Module
// ============================================================
// Builds a flat index from all tab data sources and provides
// a real-time dropdown results panel with cross-tab navigation.
// ============================================================

(function () {
  'use strict';

  // ── Constants ──
  const DEBOUNCE_MS = 150;
  const MAX_RESULTS_PER_TAB = 5;
  const SNIPPET_RADIUS = 60; // chars around match

  const TAB_LABELS = {
    'feature-map':       'By Feature',
    'tool-comparison':   'By Tool',
    'uno-vs-competitors':'Uno vs Competitors',
    'ai-value-outlook':  'Uno + AI',
    'agent-ux':          'Agent UX/UI',
    'requirements':      'Requirements'
  };

  const TAB_ICONS = {
    'feature-map':       '🔬',
    'tool-comparison':   '🛠️',
    'uno-vs-competitors':'⚔️',
    'ai-value-outlook':  '🤖',
    'agent-ux':          '🖥️',
    'requirements':      '📋'
  };

  // ── State ──
  let searchIndex = [];
  let debounceTimer = null;
  let selectedIdx = -1;  // keyboard navigation
  let isOpen = false;
  let lastQuery = '';     // for in-page text highlighting

  // ── Index Entry Builder ──
  function entry(tabId, title, text, opts) {
    if (!text || typeof text !== 'string') return null;
    return {
      tabId,
      title,
      text,
      section: (opts && opts.section) || '',
      elementId: (opts && opts.elementId) || '',
      dataId: (opts && opts.dataId) || '',
      toolId: (opts && opts.toolId) || ''
    };
  }

  // ── Build the Search Index ──
  function buildSearchIndex() {
    searchIndex = [];

    // ---------- 1. By Feature tab (feature-centric matrix) ----------
    var matrix = currentData &&
      currentData.matrices &&
      currentData.matrices.matrix3_featureCentric_v2;

    if (matrix && matrix.sections) {
      matrix.sections.forEach(function (section) {
        (section.features || []).forEach(function (f) {
          var fId = f.id;
          push(entry('feature-map', f.name, f.name, { section: section.name, dataId: fId }));
          push(entry('feature-map', f.name, f.whyItMatters, { section: section.name, dataId: fId }));
          push(entry('feature-map', f.name, f.unoOpportunity, { section: section.name, dataId: fId }));

          // cells per tool
          Object.keys(f.cells || {}).forEach(function (toolKey) {
            var c = f.cells[toolKey];
            push(entry('feature-map', f.name, c.note, { section: section.name, dataId: fId, toolId: toolKey }));
            (c.links || []).forEach(function (l) {
              push(entry('feature-map', f.name, l, { section: section.name, dataId: fId, toolId: toolKey }));
            });
            (c.screenshots || []).forEach(function (s) {
              push(entry('feature-map', f.name, s, { section: section.name, dataId: fId, toolId: toolKey }));
            });
          });
        });
      });
    }

    // ---------- 2. By Tool tab ----------
    (currentData.tools || []).forEach(function (tool) {
      push(entry('tool-comparison', tool.name, tool.name, { dataId: tool.id }));
      push(entry('tool-comparison', tool.name, tool.typeHint, { dataId: tool.id }));
      push(entry('tool-comparison', tool.name, tool.website, { dataId: tool.id }));

      // Index primary docs
      if (tool.primaryDocs) {
        Object.keys(tool.primaryDocs).forEach(function (key) {
          push(entry('tool-comparison', tool.name, key + ': ' + tool.primaryDocs[key], { dataId: tool.id }));
        });
      }

      // Index each feature's cell note for this tool
      if (matrix && matrix.sections) {
        matrix.sections.forEach(function (section) {
          (section.features || []).forEach(function (feature) {
            var cell = feature.cells && feature.cells[tool.id];
            if (cell && cell.note) {
              push(entry('tool-comparison', tool.name + ' — ' + feature.name, cell.note, { dataId: tool.id, section: section.headline || section.name }));
            }
          });
        });
      }
    });

    // ---------- 3. Uno vs Competitors tab ----------
    // 3a. Key Strengths
    var adv = currentData.unoUniqueAdvantages;
    if (adv && adv.items) {
      adv.items.forEach(function (item) {
        push(entry('uno-vs-competitors', item.title, item.title, { section: 'Key Strengths', dataId: 'key-strengths' }));
        push(entry('uno-vs-competitors', item.title, item.description, { section: 'Key Strengths', dataId: 'key-strengths' }));
      });
    }

    // 3b. Competitor analysis cards
    var uvc = currentData.unoVsCompetitors;
    if (uvc && uvc.cards) {
      uvc.cards.forEach(function (card) {
        push(entry('uno-vs-competitors', card.headline, card.headline, { section: 'Competitor Analysis', dataId: card.id }));
        push(entry('uno-vs-competitors', card.headline, card.summary, { section: 'Competitor Analysis', dataId: card.id }));
        var rm = card.readMore || {};
        flatPush('uno-vs-competitors', card.headline, rm.observed, { section: 'Competitor Analysis', dataId: card.id });
        flatPush('uno-vs-competitors', card.headline, rm.whyItMatters, { section: 'Competitor Analysis', dataId: card.id });
        flatPush('uno-vs-competitors', card.headline, rm.opportunityForUno, { section: 'Competitor Analysis', dataId: card.id });
      });
    }

    // 3c. Missed opportunities
    var mo = currentData.missedOpportunities;
    if (mo && mo.cards) {
      mo.cards.forEach(function (card) {
        push(entry('uno-vs-competitors', card.headline, card.headline, { section: 'Opportunities', dataId: card.id }));
        push(entry('uno-vs-competitors', card.headline, card.summary, { section: 'Opportunities', dataId: card.id }));
        var rm = card.readMore || {};
        flatPush('uno-vs-competitors', card.headline, rm.competitorGap, { section: 'Opportunities', dataId: card.id });
        flatPush('uno-vs-competitors', card.headline, rm.opportunityForUno, { section: 'Opportunities', dataId: card.id });
        flatPush('uno-vs-competitors', card.headline, rm.whyItMatters, { section: 'Opportunities', dataId: card.id });
      });
    }

    // 3d. Uno opportunity cards
    (currentData.unoOpportunityCards || []).forEach(function (card) {
      push(entry('uno-vs-competitors', card.title, card.title, { section: 'Opportunities', dataId: card.id }));
      push(entry('uno-vs-competitors', card.title, card.summary, { section: 'Opportunities', dataId: card.id }));
      push(entry('uno-vs-competitors', card.title, card.whyNow, { section: 'Opportunities', dataId: card.id }));
      (card.whatCompetitorsDo || []).forEach(function (s) {
        push(entry('uno-vs-competitors', card.title, s, { section: 'Opportunities', dataId: card.id }));
      });
      (card.howUnoWins || []).forEach(function (s) {
        push(entry('uno-vs-competitors', card.title, s, { section: 'Opportunities', dataId: card.id }));
      });
    });

    // 3e. Threat watch
    var tw = currentData.threatWatch;
    if (tw && tw.threats) {
      tw.threats.forEach(function (t) {
        push(entry('uno-vs-competitors', t.name, t.name, { section: 'Threat Watch', dataId: t.id }));
        push(entry('uno-vs-competitors', t.name, t.description, { section: 'Threat Watch', dataId: t.id }));
        push(entry('uno-vs-competitors', t.name, t.whyWatch, { section: 'Threat Watch', dataId: t.id }));
        push(entry('uno-vs-competitors', t.name, t.unoAngle, { section: 'Threat Watch', dataId: t.id }));
        push(entry('uno-vs-competitors', t.name, t.category, { section: 'Threat Watch', dataId: t.id }));
      });
    }

    // 3f. Benchmarks
    var benchProjects = [
      'Flight Details', 'Football Fantasy', 'Travel Guide', 'Electric Utility Dashboard',
      'Video Streaming', 'Notes', 'Calendar', 'Hospital Dashboard', 'Budgeting Dashboard',
      'Recipe Home Screen', 'Fitness Tracking', 'Login Register', 'Travel Home Screen',
      'Burger Joint', 'Fitness Home Screen'
    ];
    benchProjects.forEach(function (name) {
      push(entry('uno-vs-competitors', name, name + ' benchmark performance comparison', { section: 'Benchmarks', dataId: 'benchmarks' }));
    });
    push(entry('uno-vs-competitors', 'Performance Benchmarks', 'Performance benchmarks time credits cost per page Uno Antigravity Lovable Dreamflow', { section: 'Benchmarks', dataId: 'benchmarks' }));

    // ---------- 4. Uno + AI tab (AI_VALUE_MODEL) ----------
    if (typeof AI_VALUE_MODEL !== 'undefined') {
      var avm = AI_VALUE_MODEL;

      // Positioning lines
      ['exec', 'product', 'tech'].forEach(function (mode) {
        if (avm.positioning && avm.positioning[mode]) {
          push(entry('ai-value-outlook', 'Positioning (' + mode + ')', avm.positioning[mode], { section: 'Core Thesis' }));
        }
      });

      // KPIs
      ['exec', 'product', 'tech'].forEach(function (mode) {
        (avm.kpis && avm.kpis[mode] || []).forEach(function (kpi) {
          push(entry('ai-value-outlook', kpi.label, kpi.value, { section: 'Core Thesis' }));
        });
      });

      // Replace vs Can't
      if (avm.replaceVsCant) {
        (avm.replaceVsCant.replace || []).forEach(function (s) {
          push(entry('ai-value-outlook', 'What AI replaces', s, { section: 'Replace vs Can\'t' }));
        });
        (avm.replaceVsCant.cant || []).forEach(function (s) {
          push(entry('ai-value-outlook', 'What AI can\'t replace', s, { section: 'Replace vs Can\'t' }));
        });
      }

      // Timeline
      (avm.timeline || []).forEach(function (item) {
        push(entry('ai-value-outlook', item.name, item.name, { section: 'Timeline', dataId: item.name }));
        push(entry('ai-value-outlook', item.name, item.desc, { section: 'Timeline', dataId: item.name }));
        push(entry('ai-value-outlook', item.name, item.detail, { section: 'Timeline', dataId: item.name }));
        push(entry('ai-value-outlook', item.name, item.action, { section: 'Timeline', dataId: item.name }));
      });

      // Strategic position
      (avm.strategicPosition || []).forEach(function (item) {
        push(entry('ai-value-outlook', item.title, item.title, { section: 'Strategic Position' }));
        push(entry('ai-value-outlook', item.title, item.desc, { section: 'Strategic Position' }));
        if (item.unoAngle) {
          (Array.isArray(item.unoAngle) ? item.unoAngle : [item.unoAngle]).forEach(function (s) {
            push(entry('ai-value-outlook', item.title, s, { section: 'Strategic Position' }));
          });
        }
        if (item.mitigation) {
          push(entry('ai-value-outlook', item.title, item.mitigation, { section: 'Strategic Position' }));
        }
      });

      // Roadmap
      ['exec', 'product', 'tech'].forEach(function (mode) {
        (avm.roadmap && avm.roadmap[mode] || []).forEach(function (item) {
          push(entry('ai-value-outlook', item.title, item.title, { section: 'Roadmap (' + mode + ')' }));
          push(entry('ai-value-outlook', item.title, item.desc, { section: 'Roadmap (' + mode + ')' }));
        });
      });
    }

    // ---------- 5. Agent UX/UI tab ----------
    if (typeof AGENT_UX_FEATURES !== 'undefined') {
      AGENT_UX_FEATURES.forEach(function (feat) {
        push(entry('agent-ux', feat.name, feat.name, { section: 'Features', dataId: feat.id }));
      });
    }
    if (typeof AGENT_UX_TOOLS !== 'undefined') {
      AGENT_UX_TOOLS.forEach(function (tool) {
        push(entry('agent-ux', tool.name, tool.name, { section: 'Tools', dataId: tool.id }));
      });
    }
    if (typeof AGENT_UX_MATRIX !== 'undefined') {
      Object.keys(AGENT_UX_MATRIX).forEach(function (toolId) {
        var feats = AGENT_UX_MATRIX[toolId];
        Object.keys(feats).forEach(function (featId) {
          var cell = feats[featId];
          (cell.screenshots || []).forEach(function (s) {
            push(entry('agent-ux', toolId + ' — ' + featId, s, { section: 'Screenshots', dataId: toolId + '/' + featId }));
          });
        });
      });
    }
    if (typeof AGENT_UX_VIDEOS !== 'undefined') {
      Object.keys(AGENT_UX_VIDEOS).forEach(function (toolId) {
        push(entry('agent-ux', toolId + ' video', AGENT_UX_VIDEOS[toolId], { section: 'Videos', dataId: toolId }));
      });
    }

    // ---------- 6. Requirements tab ----------
    if (typeof requirementsData !== 'undefined' && requirementsData.categories) {
      requirementsData.categories.forEach(function (cat) {
        (cat.features || []).forEach(function (f) {
          push(entry('requirements', f.name, f.name, { section: cat.name, dataId: f.id }));
          push(entry('requirements', f.name, f.note, { section: cat.name, dataId: f.id }));
          push(entry('requirements', f.name, f.coverageDetail, { section: cat.name, dataId: f.id }));
        });
      });
    }

    console.log('🔍 Search index built: ' + searchIndex.length + ' entries');
  }

  function push(e) { if (e) searchIndex.push(e); }

  function flatPush(tabId, title, arr, opts) {
    if (!Array.isArray(arr)) return;
    arr.forEach(function (s) { push(entry(tabId, title, s, opts)); });
  }

  // ── Query parsing (supports "quoted phrases") ──
  function parseQuery(raw) {
    var phrases = [];
    var rest = raw.replace(/"([^"]+)"/g, function (_, p) {
      var trimmed = p.trim();
      if (trimmed) phrases.push(trimmed.toLowerCase());
      return ' ';
    });
    var words = rest.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 0; });
    // terms = individual words + quoted phrases, all lowercased
    return { words: words, phrases: phrases, terms: words.concat(phrases) };
  }

  // ── Search Logic ──
  function search(query) {
    if (!query) return {};
    lastQuery = query;
    var parsed = parseQuery(query);
    if (parsed.terms.length === 0) return {};
    var grouped = {};

    for (var i = 0; i < searchIndex.length; i++) {
      var e = searchIndex[i];
      var combined = (e.title + ' ' + e.text).toLowerCase();

      // Every term (word or quoted phrase) must appear somewhere in the title or text
      var allMatch = true;
      var firstIdx = -1;
      for (var w = 0; w < parsed.terms.length; w++) {
        var wIdx = combined.indexOf(parsed.terms[w]);
        if (wIdx === -1) { allMatch = false; break; }
        if (firstIdx === -1 || wIdx < firstIdx) firstIdx = wIdx;
      }
      if (!allMatch) continue;

      if (!grouped[e.tabId]) grouped[e.tabId] = [];

      // Deduplicate by dataId (or title if no dataId) within same tab
      var dedupeKey = e.dataId || e.title;
      var isDupe = grouped[e.tabId].some(function (existing) {
        return (existing.dataId || existing.title) === dedupeKey;
      });
      if (isDupe) continue;

      // Compute firstIdx relative to text only (for snippet extraction)
      var textLower = e.text.toLowerCase();
      var snippetIdx = -1;
      for (var si = 0; si < parsed.terms.length; si++) {
        var sIdx = textLower.indexOf(parsed.terms[si]);
        if (sIdx !== -1 && (snippetIdx === -1 || sIdx < snippetIdx)) snippetIdx = sIdx;
      }
      // If match is only in title, show start of text
      if (snippetIdx === -1) snippetIdx = 0;

      grouped[e.tabId].push({
        tabId: e.tabId,
        title: e.title,
        section: e.section,
        dataId: e.dataId,
        toolId: e.toolId || '',
        snippet: buildSnippet(e.text, snippetIdx, parsed.terms, textLower)
      });
    }

    return grouped;
  }

  function buildSnippet(text, firstIdx, terms, lower) {
    // Show context around the first matching term
    var firstTermLen = 0;
    for (var i = 0; i < terms.length; i++) {
      if (lower.indexOf(terms[i]) === firstIdx) { firstTermLen = terms[i].length; break; }
    }
    if (firstTermLen === 0) firstTermLen = terms[0].length;

    var start = Math.max(0, firstIdx - SNIPPET_RADIUS);
    var end = Math.min(text.length, firstIdx + firstTermLen + SNIPPET_RADIUS);
    var prefix = start > 0 ? '…' : '';
    var suffix = end < text.length ? '…' : '';
    var raw = text.substring(start, end);

    // Highlight all matched terms in the snippet (longest first to avoid partial overlap)
    var escaped = escHtml(raw);
    var sorted = terms.slice().sort(function (a, b) { return b.length - a.length; });
    for (var j = 0; j < sorted.length; j++) {
      var re = new RegExp('(' + escRegex(escHtml(sorted[j])) + ')', 'gi');
      escaped = escaped.replace(re, '<mark>$1</mark>');
    }
    return prefix + escaped + suffix;
  }

  function escRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Rendering ──
  function renderResults(grouped) {
    var dropdown = document.getElementById('search-results-dropdown');
    if (!dropdown) return;

    var tabOrder = ['feature-map', 'tool-comparison', 'uno-vs-competitors', 'ai-value-outlook', 'agent-ux', 'requirements'];
    var html = '';
    var totalResults = 0;

    tabOrder.forEach(function (tabId) {
      var items = grouped[tabId];
      if (!items || items.length === 0) return;
      var total = items.length;
      var collapsed = total > MAX_RESULTS_PER_TAB;
      totalResults += total;

      html += '<div class="search-result-group" data-group-tab="' + tabId + '">';
      html += '<div class="search-result-group-header"><span class="search-group-icon">' + (TAB_ICONS[tabId] || '') + '</span>' + escHtml(TAB_LABELS[tabId] || tabId);
      if (collapsed) {
        html += ' <button class="search-result-count search-show-all" data-group="' + tabId + '">' + total + ' matches ▼</button>';
      }
      html += '</div>';

      items.forEach(function (item, i) {
        var hiddenClass = (collapsed && i >= MAX_RESULTS_PER_TAB) ? ' search-result-hidden' : '';
        html += '<button class="search-result-item' + hiddenClass + '" data-tab="' + item.tabId + '" data-id="' + escHtml(item.dataId || '') + '" data-section="' + escHtml(item.section || '') + '" data-tool="' + escHtml(item.toolId || '') + '">';
        var highlightedTitle = escHtml(item.title);
        var titleTerms = parseQuery(lastQuery).terms.slice().sort(function(a,b) { return b.length - a.length; });
        for (var tw = 0; tw < titleTerms.length; tw++) {
          var tre = new RegExp('(' + escRegex(titleTerms[tw]) + ')', 'gi');
          highlightedTitle = highlightedTitle.replace(tre, '<mark>$1</mark>');
        }
        html += '<span class="search-result-title">' + highlightedTitle + '</span>';
        if (item.section) {
          html += '<span class="search-result-section">' + escHtml(item.section) + '</span>';
        }
        html += '<span class="search-result-snippet">' + item.snippet + '</span>';
        html += '</button>';
      });

      html += '</div>';
    });

    if (totalResults === 0) {
      html = '<div class="search-no-results">No results found</div>';
    }

    dropdown.innerHTML = html;
    showDropdown();
    selectedIdx = -1;
    updateSelection();
  }

  // ── Dropdown visibility ──
  function showDropdown() {
    var dd = document.getElementById('search-results-dropdown');
    if (dd) { dd.classList.remove('hidden'); isOpen = true; }
  }

  function hideDropdown() {
    var dd = document.getElementById('search-results-dropdown');
    if (dd) { dd.classList.add('hidden'); isOpen = false; }
    selectedIdx = -1;
  }

  // ── Keyboard Navigation ──
  function updateSelection() {
    var items = getResultButtons();
    items.forEach(function (el, i) {
      el.classList.toggle('selected', i === selectedIdx);
    });
    if (selectedIdx >= 0 && items[selectedIdx]) {
      items[selectedIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  function getResultButtons() {
    var dd = document.getElementById('search-results-dropdown');
    return dd ? Array.from(dd.querySelectorAll('.search-result-item')) : [];
  }

  // ── Sub-navigation section mapping ──
  var SECTION_TO_SUBNAV = {
    'Key Strengths': 'overview',
    'Competitor Analysis': 'analysis',
    'Opportunities': 'opportunities',
    'Threat Watch': 'threats',
    'Benchmarks': 'benchmarks'
  };

  // ── Navigation ──
  function navigateToResult(tabId, dataId, section, toolId) {
    hideDropdown();

    // Switch tab (reuse app.js's switchTab)
    if (typeof switchTab === 'function') {
      switchTab(tabId);
    }

    // Switch sub-nav for uno-vs-competitors
    if (tabId === 'uno-vs-competitors' && section && SECTION_TO_SUBNAV[section]) {
      if (typeof switchUvcSection === 'function') {
        switchUvcSection(SECTION_TO_SUBNAV[section]);
      }
    }

    // Give the tab time to render (especially lazy-init tabs)
    setTimeout(function () {
      highlightTarget(tabId, dataId, section, toolId);
    }, 200);
  }

  function highlightTarget(tabId, dataId, section, toolId) {
    if (!dataId) return;

    var target = null;

    if (tabId === 'feature-map') {
      // Feature rows have data-feature-id attributes
      target = document.querySelector('[data-feature-id="' + CSS.escape(dataId) + '"]');

    } else if (tabId === 'tool-comparison') {
      // Select the tool to load its content, then scroll to section
      var sidebarItem = document.querySelector('.tool-item[data-tool-id="' + CSS.escape(dataId) + '"]');
      if (sidebarItem) {
        sidebarItem.classList.add('active');
        // Remove active from siblings
        var allItems = document.querySelectorAll('.tool-item');
        allItems.forEach(function (item) {
          if (item !== sidebarItem) item.classList.remove('active');
        });
      }
      // Sync mobile dropdown
      var mobileDD = document.getElementById('tool-mobile-dropdown');
      if (mobileDD) mobileDD.value = dataId;
      // Load the tool profile content
      if (typeof showToolProfile === 'function') {
        showToolProfile(dataId);
      }
      // After content renders, scroll to the relevant section and highlight
      setTimeout(function () {
        var scrollTarget = null;
        if (section) {
          // Section is like "K. AI agent configuration" — extract the letter
          var sectionLetter = section.charAt(0);
          var sectionAnchor = document.getElementById('tool-section-' + dataId + '-' + sectionLetter);
          if (sectionAnchor) {
            scrollTarget = sectionAnchor;
          }
        }
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          scrollTarget.classList.add('search-highlight');
          setTimeout(function () { scrollTarget.classList.remove('search-highlight'); }, 2500);
        }
        // Highlight search terms in the loaded content
        var tabContainer = document.getElementById(tabId);
        if (tabContainer) {
          clearInPageHighlights(tabContainer);
          highlightQueryInElement(tabContainer);
        }
      }, 150);
      return; // skip the default highlighting below
    } else if (tabId === 'uno-vs-competitors') {
      // Cards use data-card-id; threats use data-id; some have id=""
      target = document.querySelector('[data-card-id="' + CSS.escape(dataId) + '"]')
        || document.querySelector('[data-id="' + CSS.escape(dataId) + '"]')
        || document.getElementById('details-' + dataId)
        || document.getElementById(dataId);

      // Auto-expand collapsed content if inside a card/threat
      if (target) {
        autoExpandAncestor(target);
      }
    } else if (tabId === 'ai-value-outlook') {
      // Timeline nodes use aria-label matching item.name
      if (section === 'Timeline') {
        var nodes = document.querySelectorAll('.av-tl-node');
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i].getAttribute('aria-label') === dataId) {
            target = nodes[i];
            // Also open the popup so the content is visible
            target.classList.add('av-tl-node--open');
            break;
          }
        }
      }
      if (!target) {
        // Strategic position items / roadmap items / KPI items — match by text
        var avTab = document.getElementById('ai-value-outlook');
        if (avTab) {
          var candidates = avTab.querySelectorAll('.av-titem__name, .av-tl-node-label, .av-kpi__value, h3, h4');
          for (var j = 0; j < candidates.length; j++) {
            if (candidates[j].textContent.indexOf(dataId) !== -1) {
              target = candidates[j].closest('.av-titem') || candidates[j].closest('.av-tl-node') || candidates[j].closest('.av-kpi') || candidates[j];
              break;
            }
          }
        }
      }
    } else if (tabId === 'agent-ux') {
      // UX matrix cells or tool/feature headers
      var parts = dataId.split('/');
      if (parts.length === 2) {
        target = document.querySelector('[data-ux-tool="' + CSS.escape(parts[0]) + '"][data-ux-feature="' + CSS.escape(parts[1]) + '"]');
      } else {
        target = document.querySelector('[data-ux-tool="' + CSS.escape(dataId) + '"]')
          || document.querySelector('[data-ux-feature="' + CSS.escape(dataId) + '"]');
      }
    } else if (tabId === 'requirements') {
      target = document.querySelector('[data-req-id="' + CSS.escape(dataId) + '"]');    }

    if (!target) {
      // Fallback: search by text content within the tab
      var tabEl = document.getElementById(tabId);
      if (tabEl) {
        var fallbackCandidates = tabEl.querySelectorAll('h3, h4, .card-headline, .threat-name, .advantage-title, td, .av-titem__name');
        for (var k = 0; k < fallbackCandidates.length; k++) {
          if (fallbackCandidates[k].textContent.indexOf(dataId) !== -1) {
            target = fallbackCandidates[k];
            break;
          }
        }
      }
    }

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('search-highlight');
      setTimeout(function () {
        target.classList.remove('search-highlight');
      }, 2500);
    }

    // Highlight the search query across the entire visible tab content
    var tabContainer = document.getElementById(tabId);
    if (tabContainer) {
      clearInPageHighlights(tabContainer);
      highlightQueryInElement(tabContainer);
    }
  }

  // Auto-expand collapsed card/threat details so the match is visible
  function autoExpandAncestor(el) {
    // Threat cards: expand .threat-expandable
    var threatCard = el.closest('.threat-card');
    if (threatCard) {
      var detail = threatCard.querySelector('.threat-expandable');
      if (detail && !detail.classList.contains('expanded')) {
        detail.classList.add('expanded');
        var icon = threatCard.querySelector('.threat-expand-btn .toggle-icon');
        if (icon) icon.textContent = '\u25B2';
      }
    }
    // Comparison cards: expand .comparison-card-details
    var compCard = el.closest('.comparison-card');
    if (compCard) {
      var compDetail = compCard.querySelector('.comparison-card-details');
      if (compDetail && !compDetail.classList.contains('expanded')) {
        compDetail.classList.add('expanded');
        var compIcon = compCard.querySelector('.comparison-card-toggle .toggle-icon');
        if (compIcon) compIcon.textContent = '\u25B2';
      }
    }
    // Opportunity cards: expand .opportunity-card-details
    var oppCard = el.closest('.opportunity-card');
    if (oppCard) {
      var oppDetail = oppCard.querySelector('.opportunity-card-details');
      if (oppDetail && !oppDetail.classList.contains('expanded')) {
        oppDetail.classList.add('expanded');
        var oppIcon = oppCard.querySelector('.opportunity-card-toggle .toggle-icon');
        if (oppIcon) oppIcon.textContent = '\u25B2';
      }
    }
  }

  // Highlight all occurrences of the search query inside a container element
  function highlightQueryInElement(container) {
    if (!container || !lastQuery) return;
    var q = lastQuery;
    var words = q.toLowerCase().split(/\s+/).filter(function (w) { return w.length > 0; });
    if (words.length === 0) return;

    // Remove any previous in-page highlights
    clearInPageHighlights(container);

    // Build list of phrases to search: full query first, then individual words
    var phrases = [];
    var fullPhrase = q.toLowerCase().trim();
    if (words.length > 1) phrases.push(fullPhrase);
    for (var p = 0; p < words.length; p++) phrases.push(words[p]);

    // Walk text nodes – match full phrase first, then individual words
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    var matches = [];
    while (walker.nextNode()) {
      var node = walker.currentNode;
      var text = node.nodeValue;
      var lowerText = text.toLowerCase();
      var occupied = []; // track already-matched ranges to avoid overlaps
      for (var ph = 0; ph < phrases.length; ph++) {
        var searchFrom = 0;
        var idx;
        while ((idx = lowerText.indexOf(phrases[ph], searchFrom)) !== -1) {
          var end = idx + phrases[ph].length;
          // Skip if this range overlaps with an already-claimed range
          var overlaps = false;
          for (var oc = 0; oc < occupied.length; oc++) {
            if (idx < occupied[oc][1] && end > occupied[oc][0]) { overlaps = true; break; }
          }
          if (!overlaps) {
            matches.push({ node: node, index: idx, length: phrases[ph].length });
            occupied.push([idx, end]);
          }
          searchFrom = idx + phrases[ph].length;
        }
      }
    }

    // Sort by node order then by index descending so we can split safely
    // Group by node, then process each node's matches in reverse index order
    var nodeMap = new Map();
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      if (!nodeMap.has(m.node)) nodeMap.set(m.node, []);
      nodeMap.get(m.node).push(m);
    }

    nodeMap.forEach(function (nodeMatches) {
      // Sort descending by index; for overlaps keep longest
      nodeMatches.sort(function (a, b) { return b.index - a.index; });
      // Remove overlapping ranges (keep earliest / already-processed)
      for (var j = nodeMatches.length - 1; j >= 0; j--) {
        var cur = nodeMatches[j];
        var textNode = cur.node;
        var before = textNode.nodeValue.substring(0, cur.index);
        var matchText = textNode.nodeValue.substring(cur.index, cur.index + cur.length);
        var after = textNode.nodeValue.substring(cur.index + cur.length);

        var mark = document.createElement('mark');
        mark.className = 'search-query-highlight';
        mark.textContent = matchText;

        var parent = textNode.parentNode;
        if (after) parent.insertBefore(document.createTextNode(after), textNode.nextSibling);
        parent.insertBefore(mark, textNode.nextSibling);
        textNode.nodeValue = before;
      }
    });
  }

  function clearInPageHighlights(container) {
    if (!container) return;
    var marks = container.querySelectorAll('mark.search-query-highlight');
    for (var i = 0; i < marks.length; i++) {
      var mark = marks[i];
      var parent = mark.parentNode;
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
  }

  // ── Event Wiring ──
  function initGlobalSearch() {
    // Build the index after all data is available
    buildSearchIndex();

    var input = document.getElementById('global-search');
    var clearBtn = document.getElementById('global-search-clear');
    if (!input) return;

    // Input handler (debounced)
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var val = input.value.trim();

      if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';

      if (!val) {
        hideDropdown();
        lastQuery = '';
        clearInPageHighlights(document.body);
        return;
      }

      debounceTimer = setTimeout(function () {
        var results = search(val);
        renderResults(results);
      }, DEBOUNCE_MS);
    });

    // Focus opens dropdown if there's a query (reuse existing HTML to preserve expanded state)
    input.addEventListener('focus', function () {
      if (input.value.trim()) {
        var dd = document.getElementById('search-results-dropdown');
        // If dropdown already has content for this query, just re-show it
        if (dd && dd.innerHTML && dd.innerHTML.length > 0 && lastQuery === input.value.trim()) {
          showDropdown();
        } else {
          var results = search(input.value.trim());
          renderResults(results);
        }
      }
    });

    // Clear button
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        clearBtn.style.display = 'none';
        hideDropdown();
        lastQuery = '';
        clearInPageHighlights(document.body);
        input.focus();
      });
    }

    // Keyboard shortcuts
    input.addEventListener('keydown', function (e) {
      var items = getResultButtons();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen) return;
        selectedIdx = Math.min(selectedIdx + 1, items.length - 1);
        updateSelection();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) return;
        selectedIdx = Math.max(selectedIdx - 1, 0);
        updateSelection();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIdx >= 0 && items[selectedIdx]) {
          items[selectedIdx].click();
        }
      } else if (e.key === 'Escape') {
        hideDropdown();
        input.blur();
      }
    });

    // Click on result item or "show all" button
    document.getElementById('search-results-dropdown').addEventListener('click', function (e) {
      // Handle "show all" expand button
      var expandBtn = e.target.closest('.search-show-all');
      if (expandBtn) {
        e.stopPropagation();
        var groupTab = expandBtn.dataset.group;
        var dropdownEl = document.getElementById('search-results-dropdown');
        var group = dropdownEl.querySelector('.search-result-group[data-group-tab="' + groupTab + '"]');
        if (group) {
          var hidden = group.querySelectorAll('.search-result-hidden');
          for (var i = 0; i < hidden.length; i++) {
            hidden[i].classList.remove('search-result-hidden');
          }
          expandBtn.remove();
        }
        return;
      }

      var btn = e.target.closest('.search-result-item');
      if (!btn) return;
      btn.classList.add('search-result-visited');
      var tabId = btn.dataset.tab;
      var dataId = btn.dataset.id;
      var section = btn.dataset.section;
      var toolId = btn.dataset.tool;
      navigateToResult(tabId, dataId, section, toolId);
      input.blur();
    });

    // Close on click outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.global-search-wrapper') && !e.target.closest('#search-results-dropdown')) {
        hideDropdown();
      }
    });

    // Global keyboard shortcut: Ctrl+K or / to focus search
    document.addEventListener('keydown', function (e) {
      // Don't intercept if user is typing in an input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      if (e.key === '/' || (e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }

  // ── Expose globally ──
  window.initGlobalSearch = initGlobalSearch;
  window.rebuildSearchIndex = buildSearchIndex;
  window.highlightQueryInElement = highlightQueryInElement;
})();
