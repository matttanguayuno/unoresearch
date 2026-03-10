// Import data from external module (now loaded as global variables)
// import { data } from './data.js';
// import { applyVerification } from './mergeVerification.js';
// import { verificationResults } from './verification_results.js';

// State (currentData will hold either base data or verified data)
let currentData = data;
let verificationAvailable = false;

// Load verification data if available
async function loadVerificationData() {
  try {
    console.log('Loading verification data...');
    if (verificationResults) {
      console.log('Verification data loaded:', verificationResults);
      currentData = applyVerification(data, verificationResults);
      verificationAvailable = true;
      console.log('✅ Verification data loaded and applied');
    }
  } catch (error) {
    console.log('ℹ️ Error loading verification data, using baseline data');
    console.error('Error details:', error);
  }
}

// State
let state = {
  activeTab: 'overview',
  showGapsOnly: false,
  selectedTool: null,
  detailPanelOpen: false
};

// Utility: Get status icon
function getStatusIcon(status) {
  const icons = {
    'YES': '✅',
    'LIMITED': '⚠️',
    'NO': '❌',
    'UNKNOWN': '❓'
  };
  return icons[status] || '';
}

// Render Uno vs Competitors
function renderUnoVsCompetitors() {
  const container = document.getElementById('uno-vs-competitors-content');
  if (!container) return;

  const uvc = currentData.unoVsCompetitors;
  const colors = ['blue', 'violet', 'green', 'rose', 'cyan', 'blue', 'violet', 'green', 'rose'];
  
  const mo = currentData.missedOpportunities;
  const oppColors = ['blue', 'green', 'violet', 'rose', 'cyan', 'blue', 'green', 'violet', 'rose', 'cyan'];

  // Get new data sections
  const ua = currentData.unoUniqueAdvantages;
  const tw = currentData.threatWatch;

  // Build sub-navigation
  const subnav = document.getElementById('uvc-subnav');
  if (subnav) {
    const navSections = [
      { id: 'overview', label: 'Key Strengths', icon: '💪' },
      { id: 'analysis', label: 'Competitor Analysis', icon: '🔍' },
      { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
    ];
    if (tw) navSections.push({ id: 'threats', label: 'Threat Watch', icon: '⚡' });
    navSections.push({ id: 'benchmarks', label: 'Benchmarks', icon: '⏱️' });

    subnav.innerHTML = navSections.map((s, i) => `
      <button class="uvc-subnav-btn${i === 0 ? ' active' : ''}" data-section="${s.id}">
        <span class="subnav-icon">${s.icon}</span>
        <span class="subnav-label">${s.label}</span>
      </button>
    `).join('');

    subnav.querySelectorAll('.uvc-subnav-btn').forEach(btn => {
      btn.addEventListener('click', () => switchUvcSection(btn.dataset.section));
    });
  }

  container.innerHTML = `
    <div class="uvc-section active" data-section="overview">
    ${ua ? `
    <div class="unique-advantages-section">
      <div class="unique-advantages-header">
        <h2>${ua.title}</h2>
        <p class="subtitle">${ua.subtitle}</p>
      </div>
      <div class="unique-advantages-grid">
        ${ua.items.map(item => `
          <div class="unique-advantage-item">
            <span class="ua-icon">${item.icon}</span>
            <div class="ua-content">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
    </div>

    <div class="uvc-section" data-section="analysis">
    <div class="section-divider">
      <h2>Strategic differentiation analysis</h2>
      <p class="subtitle">${uvc.intro}</p>
    </div>

    <div class="comparison-cards-grid">
      ${uvc.cards.map((card, index) => `
        <div class="comparison-card" data-color="${colors[index % colors.length]}">
          <h3 class="comparison-card-headline">${card.headline}</h3>
          <p class="comparison-card-summary">${card.summary}</p>
          <button class="comparison-card-toggle" data-card-id="${card.id}">
            Read more <span class="toggle-icon">▼</span>
          </button>
          <div class="comparison-card-details" id="details-${card.id}">
            <div class="detail-section">
              <h4>OBSERVATIONS</h4>
              <ul>
                ${card.readMore.observed.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="detail-section">
              <h4>Why it matters</h4>
              <ul>
                ${card.readMore.whyItMatters.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="detail-section">
              <h4>Opportunity for Uno</h4>
              <ul>
                ${card.readMore.opportunityForUno.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="closing-note">
      <p><strong>Takeaway:</strong> ${uvc.closingNote.replace('Takeaway: ', '')}</p>
    </div>
    </div>

    <div class="uvc-section" data-section="opportunities">
    <div id="opportunity-cards-overview"></div>
    <div class="missed-opportunities-section">
      <div class="missed-opportunities-header">
        <h2>${mo.title}</h2>
        <p class="subtitle">${mo.subtitle}</p>
      </div>

      <div class="opportunity-cards-grid">
        ${mo.cards.map((card, index) => `
          <div class="opportunity-card" data-color="${oppColors[index % oppColors.length]}">
            <h3 class="opportunity-card-headline">${card.headline}</h3>
            <p class="opportunity-card-summary">${card.summary}</p>
            <button class="opportunity-card-toggle" data-card-id="opp-${card.id}">
              Read more <span class="toggle-icon">▼</span>
            </button>
            <div class="opportunity-card-details" id="details-opp-${card.id}">
              <div class="detail-section">
                <h4>Competitor gap</h4>
                <ul>
                  ${card.readMore.competitorGap.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              <div class="detail-section">
                <h4>Opportunity for Uno</h4>
                <ul>
                  ${card.readMore.opportunityForUno.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
              <div class="detail-section">
                <h4>Why it matters</h4>
                <ul>
                  ${card.readMore.whyItMatters.map(item => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="closing-callout">
        <h3>${mo.closingCallout.headline}</h3>
        <p>${mo.closingCallout.text}</p>
      </div>
    </div>
    </div>

    ${tw ? `
    <div class="uvc-section" data-section="threats">
    <div class="threat-watch-section">
      <div class="threat-watch-header">
        <h2>${tw.title}</h2>
        <p class="subtitle">${tw.subtitle}</p>
      </div>
      <div class="threat-watch-lanes">
        <div class="threat-lane" data-level="high">
          <div class="threat-lane-label"><span class="threat-lane-dot high"></span>High threat</div>
          <div class="threat-lane-cards">
            ${tw.threats.filter(t => t.threatLevel === 'high').map(threat => `
              <div class="threat-card" data-level="high" data-id="${threat.id}">
                <div class="threat-severity-bar"></div>
                <div class="threat-card-body">
                  <h3>${threat.name}</h3>
                  <span class="threat-category">${threat.category}</span>
                  <p class="threat-description">${threat.description}</p>
                </div>
                <div class="threat-card-footer">
                  <button class="threat-expand-btn" data-threat="${threat.id}">Details <span class="toggle-icon">▼</span></button>
                </div>
                <div class="threat-expandable" id="threat-detail-${threat.id}">
                  <div class="threat-detail-row">
                    <span class="threat-detail-label">Why watch</span>
                    <p>${threat.whyWatch}</p>
                  </div>
                  <div class="threat-detail-row">
                    <span class="threat-detail-label">Uno's angle</span>
                    <p>${threat.unoAngle}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="threat-lane" data-level="medium">
          <div class="threat-lane-label"><span class="threat-lane-dot medium"></span>Medium threat</div>
          <div class="threat-lane-cards">
            ${tw.threats.filter(t => t.threatLevel === 'medium').map(threat => `
              <div class="threat-card" data-level="medium" data-id="${threat.id}">
                <div class="threat-severity-bar"></div>
                <div class="threat-card-body">
                  <h3>${threat.name}</h3>
                  <span class="threat-category">${threat.category}</span>
                  <p class="threat-description">${threat.description}</p>
                </div>
                <div class="threat-card-footer">
                  <button class="threat-expand-btn" data-threat="${threat.id}">Details <span class="toggle-icon">▼</span></button>
                </div>
                <div class="threat-expandable" id="threat-detail-${threat.id}">
                  <div class="threat-detail-row">
                    <span class="threat-detail-label">Why watch</span>
                    <p>${threat.whyWatch}</p>
                  </div>
                  <div class="threat-detail-row">
                    <span class="threat-detail-label">Uno's angle</span>
                    <p>${threat.unoAngle}</p>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
    </div>
    ` : ''}

    <div class="uvc-section" data-section="benchmarks">
      <div class="section-divider">
        <h2>Performance Benchmarks</h2>
      </div>
      <div class="benchmarks-table-wrapper" id="benchmarks-table-wrapper"></div>
      <p class="bench-link">See visual output comparisons: <a href="https://matttanguayuno.github.io/promptcomparison/" target="_blank" rel="noopener noreferrer">Prompt Output Comparison →</a></p>
    </div>
  `;

  // Render benchmarks table with computed highlights
  (function renderBenchmarksTable() {
    const wrapper = document.getElementById('benchmarks-table-wrapper');
    if (!wrapper) return;
    // Columns: 0=name, 1=VS Code, 2=VS Code MCP, 3=Antigravity, 4=Lovable Time, 5=Lovable Credits, 6=Lovable Cost, 7=Dreamflow Time, 8=Dreamflow Credits, 9=Dreamflow Cost
    const rows = [
      ['1. Flight Details',            150, 105,  80,  180, 2.1, 0.90,  200,  3.4, 0.31],
      ['2. Football Fantasy',          110, 170,  65,  420, 2.9, 1.25,  500, 11.5, 2.07],
      ['3. Travel Guide',              120, 180,  80,  230, 2.4, 1.03,  170,  4.1, 0.74],
      ['4. Electric Utility Dashboard', 115, 290,  95,  160, 1.8, 0.77,  220,  3.9, 0.70],
      ['5. Video Streaming',           105, 160,  90,  270, 2.5, 0.54,  330,  5.8, 0.26],
      ['6. Notes',                     275, 150,  90,  180, 2.0, 0.29,  210,  3.8, 0.23],
      ['7. Calendar',                  210, 230,  75,  290, 2.2, 0.95,  225,  7.0, 1.26],
      ['8. Hospital Dashboard',        120, 150,  85,  180, 1.9, 0.82,  260,  4.4, 0.79],
      ['9. Budgeting Dashboard',       160, 140,  80,  150, 1.7, 0.73,  240,  5.4, 0.97],
      ['10. Recipe Home Screen',       150, 170,  80,  120, 1.6, 0.69,  185,  4.5, 0.81],
      ['11. Fitness Tracking',         120, 180,  75,  200, 1.9, 0.82,  240,  3.5, 0.63],
      ['12. Login Register',            90, 300,  60,  155, 2.1, 0.45,  255,  3.5, 0.32],
      ['13. Travel Home Screen',       400, 240,  75,  210, 2.1, 0.90,  220,  8.5, 1.53],
      ['14. Burger Joint',             100, 330,  80,  200, 1.8, 0.77,  225,  3.4, 0.61],
      ['15. Fitness Home Screen',        0,   0,   0,    0, 0,   0,       0,   0,   0  ],
    ];
    // Group-start columns (for left-border separator)
    const groupStarts = new Set([1, 3, 4, 7]);

    // Per-row color coding (lower is better):
    // Time group: cols 1,2,3,4,7 — best/worst within each row
    // Cost group: cols 6,9 — best/worst within each row
    // Credits (5,8): no color
    const timeGroup = [1, 2, 3, 4, 7];
    const costGroup = [6, 9];

    function cellClass(row, col) {
      const v = row[col];
      if (!v || v <= 0) return '';

      let group;
      if (timeGroup.indexOf(col) !== -1) group = timeGroup;
      else if (costGroup.indexOf(col) !== -1) group = costGroup;
      else return '';

      const vals = [];
      for (let i = 0; i < group.length; i++) {
        if (row[group[i]] > 0) vals.push(row[group[i]]);
      }
      if (vals.length < 2) return '';

      let lo = vals[0], hi = vals[0];
      for (let i = 1; i < vals.length; i++) {
        if (vals[i] < lo) lo = vals[i];
        if (vals[i] > hi) hi = vals[i];
      }
      if (lo === hi) return '';
      if (v <= lo) return 'value-best';
      if (v >= hi) return 'value-worst';
      return '';
    }

    // Compute averages from non-zero rows
    const active = rows.filter(r => r[1] > 0);
    const n = active.length;
    const avg = [null];
    for (let c = 1; c <= 9; c++) {
      avg[c] = +(active.reduce((s, r) => s + r[c], 0) / n).toFixed(1);
    }

    const subHeaders = [
      'VS Code<br>Time (s)', 'VS Code MCP<br>Time (s)',
      'Time (s)',
      'Time (s)', 'Credits', 'Cost/Page ($)',
      'Time (s)', 'Credits', 'Cost/Page ($)'
    ];

    let html = `<table class="benchmarks-table">
      <thead>
        <tr class="bench-group-row">
          <th rowspan="2" class="bench-project">Project</th>
          <th colspan="2" class="bench-group bench-group-uno">Uno Platform</th>
          <th colspan="1" class="bench-group bench-group-other">Antigravity</th>
          <th colspan="3" class="bench-group bench-group-other">Lovable</th>
          <th colspan="3" class="bench-group bench-group-other">Dreamflow</th>
        </tr>
        <tr class="bench-sub-row">`;
    subHeaders.forEach((label, i) => {
      const gs = [0, 2, 3, 6].includes(i) ? ' bench-group-start' : '';
      html += `<th class="bench-sub${gs}">${label}</th>`;
    });
    html += `</tr></thead><tbody>`;
    rows.forEach(row => {
      html += '<tr>';
      html += `<td>${row[0]}</td>`;
      for (let c = 1; c <= 9; c++) {
        const cls = [cellClass(row, c), groupStarts.has(c) ? 'bench-group-start' : ''].filter(Boolean).join(' ');
        html += `<td${cls ? ` class="${cls}"` : ''}>${row[c]}</td>`;
      }
      html += '</tr>';
    });
    html += '<tr class="bench-avg-row"><td><strong>Average</strong></td>';
    for (let c = 1; c <= 9; c++) {
      const gs = groupStarts.has(c) ? ' class="bench-group-start"' : '';
      html += `<td${gs}><strong>${avg[c]}</strong></td>`;
    }
    html += '</tr></tbody></table>';
    wrapper.innerHTML = html;
  })();

  // Add click handlers for comparison card toggles
  container.querySelectorAll('.comparison-card-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardId = e.currentTarget.dataset.cardId;
      const details = document.getElementById(`details-${cardId}`);
      const icon = e.currentTarget.querySelector('.toggle-icon');
      
      details.classList.toggle('expanded');
      icon.textContent = details.classList.contains('expanded') ? '▲' : '▼';
    });
  });

  // Add click handlers for opportunity card toggles
  container.querySelectorAll('.opportunity-card-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardId = e.currentTarget.dataset.cardId;
      const details = document.getElementById(`details-${cardId}`);
      const icon = e.currentTarget.querySelector('.toggle-icon');
      
      details.classList.toggle('expanded');
      icon.textContent = details.classList.contains('expanded') ? '▲' : '▼';
    });
  });

  // Render the interactive opportunity cards inside the Opportunities section
  renderUnoOpportunityInOverview();

  // Add click handlers for threat expand buttons
  container.querySelectorAll('.threat-expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const threatId = btn.dataset.threat;
      const detail = document.getElementById(`threat-detail-${threatId}`);
      const icon = btn.querySelector('.toggle-icon');
      detail.classList.toggle('expanded');
      icon.textContent = detail.classList.contains('expanded') ? '▲' : '▼';
    });
  });
}

// Switch Uno vs Competitors sub-section
function switchUvcSection(sectionId) {
  // Update sub-nav buttons
  document.querySelectorAll('.uvc-subnav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === sectionId);
  });

  // Update content sections
  document.querySelectorAll('#uno-vs-competitors-content .uvc-section').forEach(section => {
    section.classList.toggle('active', section.dataset.section === sectionId);
  });

}

// Render Verification tab
function renderVerification() {
  const container = document.getElementById('verification-content');
  if (!container) return;
  
  if (!verificationAvailable) {
    container.innerHTML = `
      <div class="verification-status-card">
        <h3>ℹ️ No Verification Data Available</h3>
        <p>The site is currently showing baseline data. To enable verification:</p>
        <ol>
          <li>Run <code>node verification/verify.js</code> to generate the template</li>
          <li>Edit <code>verification_results.json</code> to add evidence and overrides</li>
          <li>Refresh this page to see verification results</li>
        </ol>
        <p class="text-muted">Verification data allows you to override cell statuses with evidence-backed findings.</p>
      </div>
    `;
    return;
  }
  
  // Calculate verification stats
  const matrix = currentData.matrices.matrix3_featureCentric_v2;
  let totalCells = 0;
  let verifiedCells = 0;
  let baselineCells = 0;
  let cellsWithEvidence = 0;
  const overriddenCells = [];
  
  const statusCounts = { YES: 0, LIMITED: 0, NO: 0 };
  
  matrix.sections.forEach(section => {
    section.features.forEach(feature => {
      Object.keys(feature.cells).forEach(toolId => {
        const cell = feature.cells[toolId];
        totalCells++;
        
        statusCounts[cell.status]++;
        
        if (cell.verification) {
          if (cell.verification.state === 'verified') {
            verifiedCells++;
            
            // Track cells with evidence
            if (cell.evidence && cell.evidence.length > 0) {
              cellsWithEvidence++;
              const tool = currentData.tools.find(t => t.id === toolId);
              overriddenCells.push({
                cellKey: `${toolId}::${feature.id}`,
                tool: tool.name,
                feature: feature.name,
                status: cell.status,
                evidenceCount: cell.evidence.length,
                confidence: cell.verification.confidence,
                verifiedAt: cell.verification.verifiedAt
              });
            }
          } else {
            baselineCells++;
          }
        } else {
          baselineCells++;
        }
      });
    });
  });
  
  const verificationPercentage = ((verifiedCells / totalCells) * 100).toFixed(1);
  const evidencePercentage = ((cellsWithEvidence / totalCells) * 100).toFixed(1);
  
  let html = `
    <div class="verification-summary">
      <div class="verification-stat-card">
        <div class="stat-value">${totalCells}</div>
        <div class="stat-label">Total Cells</div>
        <div class="stat-breakdown">
          <span>✅ YES: ${statusCounts.YES}</span>
          <span>⚠️ LIMITED: ${statusCounts.LIMITED}</span>
          <span>❌ NO: ${statusCounts.NO}</span>
        </div>
      </div>
      
      <div class="verification-stat-card">
        <div class="stat-value">${verifiedCells}</div>
        <div class="stat-label">Verified Cells</div>
        <div class="stat-breakdown">${verificationPercentage}% of total</div>
      </div>
      
      <div class="verification-stat-card">
        <div class="stat-value">${cellsWithEvidence}</div>
        <div class="stat-label">Cells with Evidence</div>
        <div class="stat-breakdown">${evidencePercentage}% of total</div>
      </div>
      
      <div class="verification-stat-card">
        <div class="stat-value">${baselineCells}</div>
        <div class="stat-label">Baseline Cells</div>
        <div class="stat-breakdown">No verification overrides</div>
      </div>
    </div>
  `;
  
  if (overriddenCells.length > 0) {
    html += `
      <div class="verification-table-container">
        <h3>Cells with Evidence</h3>
        <table class="verification-table">
          <thead>
            <tr>
              <th>Tool</th>
              <th>Feature</th>
              <th>Status</th>
              <th>Evidence</th>
              <th>Confidence</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    overriddenCells.forEach(cell => {
      const verifiedDate = cell.verifiedAt ? new Date(cell.verifiedAt).toLocaleDateString() : 'N/A';
      html += `
        <tr>
          <td>${cell.tool}</td>
          <td>${cell.feature}</td>
          <td><span class="status-badge status-${cell.status}">${getStatusIcon(cell.status)} ${cell.status}</span></td>
          <td>${cell.evidenceCount} item${cell.evidenceCount !== 1 ? 's' : ''}</td>
          <td><span class="confidence-badge confidence-${cell.confidence}">${cell.confidence}</span></td>
          <td>${verifiedDate}</td>
        </tr>
      `;
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
  } else {
    html += `
      <div class="verification-status-card">
        <h3>No Evidence Added Yet</h3>
        <p>All ${verifiedCells} verified cells are using baseline data without additional evidence.</p>
        <p>Add evidence objects to cells in <code>verification_results.json</code> to track sources and timestamps.</p>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// Initialize app
async function init() {
  // Prevent browser from restoring a mid-page scroll position on hash navigation
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Load verification data first
  await loadVerificationData();
  
  // Then render all content
  renderOverview();
  renderFeatureMap();
  renderToolComparison();
  renderUnoVsCompetitors();
  renderVerification();
  setupEventListeners();

  // Initialize global search
  if (typeof initGlobalSearch === 'function') {
    initGlobalSearch();
  }

  // Activate tab from URL hash on initial load (hash format: #tab/tabId)
  const initialHash = window.location.hash.slice(1);
  const initialTab = initialHash.startsWith('tab/') ? initialHash.slice(4) : null;
  if (initialTab && document.getElementById(initialTab)) {
    switchTab(initialTab);
  }
}

// Setup event listeners
function setupEventListeners() {
  // Features dropdown tabs
  const FEATURES_TABS = ['feature-map', 'tool-comparison', 'agent-ux', 'requirements'];

  // Tab navigation — normal click switches in-page; Ctrl/middle-click opens new tab via native <a> behavior
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      const tab = e.currentTarget.dataset.tab;
      switchTab(tab);
    });
  });

  // Dropdown item clicks
  document.querySelectorAll('.tab-dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      const tab = e.currentTarget.dataset.tab;
      closeFeaturesDropdown();
      switchTab(tab);
    });
  });

  // Dropdown trigger toggle
  const dropdownTrigger = document.getElementById('features-dropdown-trigger');
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFeaturesDropdown();
    });
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tab-dropdown')) {
      closeFeaturesDropdown();
    }
  });

  // Handle browser back/forward with hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    const tab = hash.startsWith('tab/') ? hash.slice(4) : null;
    if (tab && document.getElementById(tab)) {
      switchTab(tab, true);
    }
  });

  // Close detail panel on X button
  document.addEventListener('click', (e) => {
    if (e.target.closest('.close-panel')) {
      closeDetailPanel();
    }
  });

  // Close detail panel on click outside
  document.addEventListener('click', (e) => {
    const panel = document.getElementById('detail-panel');
    if (panel && !panel.classList.contains('hidden')) {
      // Ignore clicks on the panel itself, on cells (which open the panel), on feature names, or on lightbox elements
      if (!e.target.closest('#detail-panel') && !e.target.closest('.cell') && !e.target.closest('.feature-name') && !e.target.closest('.req-feature-clickable') && !e.target.closest('.lightbox-backdrop') && !e.target.closest('.lightbox-content')) {
        closeDetailPanel();
      }
    }
    const oppPanel = document.getElementById('opportunity-detail-panel');
    if (oppPanel && !oppPanel.classList.contains('hidden')) {
      if (!e.target.closest('#opportunity-detail-panel') && !e.target.closest('.opportunity-card')) {
        closeOpportunityPanel();
      }
    }
  });

  // Close panels on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // If lightbox is open, let lightboxKeyHandler handle it — don't also close the detail panel
      const lb = document.getElementById('screenshot-lightbox');
      if (lb && !lb.classList.contains('hidden')) return;

      const panel = document.getElementById('detail-panel');
      if (panel && !panel.classList.contains('hidden')) {
        closeDetailPanel();
        return;
      }
      const oppPanel = document.getElementById('opportunity-detail-panel');
      if (oppPanel && !oppPanel.classList.contains('hidden')) {
        closeOpportunityPanel();
      }
    }
  });

  // Lightbox controls
  document.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', lightboxPrev);
  document.querySelector('.lightbox-next').addEventListener('click', lightboxNext);
  document.querySelector('.lightbox-up').addEventListener('click', lightboxUp);
  document.querySelector('.lightbox-down').addEventListener('click', lightboxDown);

  // Doc layer cards expand/collapse (accordion)
  document.querySelectorAll('.doc-layer-card').forEach(card => {
    card.addEventListener('click', () => {
      const wasExpanded = card.classList.contains('expanded');
      document.querySelectorAll('.doc-layer-card.expanded').forEach(c => c.classList.remove('expanded'));
      if (!wasExpanded) card.classList.add('expanded');
    });
  });

  // Draw mapping connectors dynamically
  drawMappingConnectors();
  window.addEventListener('resize', drawMappingConnectors);

  // Close llms.txt popup on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResourcePopup();
  });
}

// ── Features dropdown helpers ──
function toggleFeaturesDropdown() {
  var dropdown = document.querySelector('.tab-dropdown');
  var menu = document.getElementById('features-dropdown-menu');
  if (!dropdown || !menu) return;
  if (dropdown.classList.contains('open')) {
    closeFeaturesDropdown();
  } else {
    dropdown.classList.add('open');
    menu.classList.remove('hidden');
    menu.offsetHeight; // reflow
    menu.classList.add('visible');
  }
}

function closeFeaturesDropdown() {
  var dropdown = document.querySelector('.tab-dropdown');
  var menu = document.getElementById('features-dropdown-menu');
  if (!dropdown || !menu) return;
  dropdown.classList.remove('open');
  menu.classList.remove('visible');
  setTimeout(function() { menu.classList.add('hidden'); }, 150);
}



// Switch tab
function switchTab(tabId, fromHash) {
  const FEATURES_TABS = ['feature-map', 'tool-comparison', 'agent-ux', 'requirements'];
  state.activeTab = tabId;

  // Update URL hash (skip if already triggered by hashchange to avoid loops)
  if (!fromHash) {
    history.replaceState(null, '', '#tab/' + tabId);
  }
  
  // Update top-level tab buttons (not dropdown items)
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
    if (btn.dataset.tab === tabId) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  // Update Features dropdown trigger & items
  const isFeatureTab = FEATURES_TABS.includes(tabId);
  const trigger = document.getElementById('features-dropdown-trigger');
  if (trigger) {
    trigger.classList.toggle('active', isFeatureTab);
    // Update trigger label to show current sub-tab
    const activeItem = document.querySelector('.tab-dropdown-item[data-tab="' + tabId + '"]');
    const label = activeItem ? activeItem.textContent : 'Features';
    trigger.innerHTML = (isFeatureTab ? label : 'Features') +
      ' <svg class="tab-dropdown-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  }
  document.querySelectorAll('.tab-dropdown-item').forEach(item => {
    item.classList.toggle('active', item.dataset.tab === tabId);
  });
  
  // Update content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === tabId);
  });

  // Initialise AI Value Outlook on first activation
  if (tabId === 'ai-value-outlook' && typeof initAiValueOutlook === 'function') {
    initAiValueOutlook();
  }

  // Initialise Agent UX/UI on first activation
  if (tabId === 'agent-ux' && typeof initAgentUx === 'function') {
    initAgentUx();
  }

  // Initialise Requirements on first activation
  if (tabId === 'requirements' && typeof initRequirements === 'function') {
    initRequirements();
  }

  // Draw mapping connectors when Documentation tab is shown
  if (tabId === 'documentation') {
    setTimeout(drawMappingConnectors, 50);
  }
}

// Render Overview
function renderOverview() {
  // Image filename mapping
  const toolImages = {
    'dreamflow': 'dreamflow.png',
    'lovable': 'lovable.png',
    'vibecode': 'vibecode.png',
    'builder': 'builder.png',
    'bolt': 'bolt.png',
    'tempo': 'tempo.png'
  };
  
  // Render tool cards
  const toolsCards = document.getElementById('tools-cards');
  toolsCards.innerHTML = currentData.tools.map(tool => `
    <a href="${tool.website}" target="_blank" rel="noopener noreferrer" class="tool-card-link">
      <div class="tool-card">
        <div class="tool-card-image">
          <img src="images/${toolImages[tool.id]}" alt="${tool.name} screenshot">
        </div>
        <h4>${tool.name}</h4>
        <p>${tool.typeHint}</p>
      </div>
    </a>
  `).join('');
  
  // No need for click handlers since they're now direct links
}

// Render Feature Map
function renderFeatureMap() {
  const grid = document.getElementById('feature-grid');
  const matrix = currentData.matrices.matrix3_featureCentric_v2;
  
  // Build all section rows first, then wrap in one table
  let bodyHtml = '';
  let hasContent = false;
  
  matrix.sections.forEach((section, sectionIndex) => {
    let features = section.features.slice().sort((a, b) => a.name.localeCompare(b.name));
    
    // Apply filters
    if (features.length === 0) return;
    hasContent = true;
    
    // Add section header as a row spanning all columns
    const sectionTitle = section.headline || section.name;
    bodyHtml += `<tr class="section-header-row"><td colspan="${currentData.tools.length + 1}" class="section-header"><span class="section-header-text">${sectionTitle}</span></td></tr>`;
    
    features.forEach(feature => {
      bodyHtml += '<tr>';
      bodyHtml += `<td class="feature-cell"><span class="feature-name" data-feature-id="${feature.id}">${feature.name}</span></td>`;
      currentData.tools.forEach(tool => {
        const cell = feature.cells[tool.id];
        bodyHtml += `<td class="status-cell"><span class="cell" data-feature-id="${feature.id}" data-tool-id="${tool.id}" data-status="${cell.status}">${getStatusIcon(cell.status)}</span></td>`;
      });
      bodyHtml += '</tr>';
    });
  });
  
  // Build one single table with a sticky thead
  let html = '';
  if (hasContent) {
    html += '<table class="feature-grid-table">';
    html += '<thead>';
    html += '<tr class="section-tools-header">';
    html += '<th>Feature</th>';
    currentData.tools.forEach(tool => {
      html += `<th class="tool-column-header" data-tool-id="${tool.id}" title="View ${tool.name} in By Tool tab">${tool.name}</th>`;
    });
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    html += bodyHtml;
    html += '</tbody>';
    html += '</table>';
  }
  grid.innerHTML = html;
  
  // Debug: log the first 500 chars of HTML
  console.log('First 500 chars of table HTML:', html.substring(0, 500));
  
  // Add event listeners
  grid.querySelectorAll('.feature-name').forEach(el => {
    el.addEventListener('click', (e) => {
      const featureId = e.target.dataset.featureId;
      showFeatureDetail(featureId, e);
    });
  });
  
  grid.querySelectorAll('.cell').forEach(el => {
    el.addEventListener('click', (e) => {
      const cellEl = e.target.closest('.cell') || e.currentTarget;
      const featureId = cellEl.dataset.featureId;
      const toolId = cellEl.dataset.toolId;
      showCellDetail(featureId, toolId, e);
    });
  });

  // Tool column headers → navigate to By Tool tab
  grid.querySelectorAll('.tool-column-header').forEach(el => {
    el.addEventListener('click', () => {
      const toolId = el.dataset.toolId;
      switchTab('tool-comparison');
      setTimeout(() => {
        showToolProfile(toolId);
        const sidebar = document.getElementById('tools-sidebar');
        if (sidebar) {
          sidebar.querySelectorAll('.tool-item').forEach(item => {
            item.classList.toggle('active', item.dataset.toolId === toolId);
          });
        }
        // Scroll the tool profile into view
        const profile = document.getElementById('tool-profile');
        if (profile) {
          profile.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  });
}

// Show feature detail — fullscreen popup with tools as columns
function showFeatureDetail(featureId, event) {
  const feature = findFeature(featureId);
  if (!feature) return;
  
  let html = '<div class="fm-popup-header">' + feature.name + '</div>';
  
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
  
  // Build horizontal table: each column = one tool
  html += '<table class="fm-popup-table">';
  html += '<thead><tr>';
  currentData.tools.forEach(function(tool) {
    html += '<th>' + tool.name + '</th>';
  });
  html += '</tr></thead>';
  html += '<tbody><tr>';
  currentData.tools.forEach(function(tool) {
    var cell = feature.cells[tool.id];
    html += '<td data-tool="' + tool.name + '">';
    if (cell) {
      var icon = getStatusIcon(cell.status);
      var statusLabel = cell.status === 'YES' ? 'Supported' : cell.status === 'LIMITED' ? 'Limited' : cell.status === 'NO' ? 'Not Supported' : 'Unknown';
      var pillClass = cell.status === 'YES' ? 'status-yes' : cell.status === 'LIMITED' ? 'status-limited' : cell.status === 'NO' ? 'status-no' : 'status-unknown';
      html += '<div class="fm-popup-status-pill ' + pillClass + '">' + icon + ' ' + statusLabel + '</div>';
      if (cell.note) {
        html += '<p class="fm-popup-note">' + cell.note + '</p>';
      }
      if (cell.screenshots && cell.screenshots.length > 0) {
        html += '<div class="fm-popup-screenshots">';
        cell.screenshots.forEach(function(filename, index) {
          html += '<img class="screenshot-thumb" src="screenshots/' + encodeURIComponent(filename) + '" alt="' + filename + '" data-index="' + index + '" data-screenshots=\'' + JSON.stringify(cell.screenshots).replace(/'/g, '&#39;') + '\' onclick="openLightbox(this.dataset.screenshots, ' + index + ')">';
        });
        html += '</div>';
      }
    } else {
      html += '<span style="color:var(--text-muted);">N/A</span>';
    }
    html += '</td>';
  });
  html += '</tr></tbody></table>';
  
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
}

// Show cell detail
function showCellDetail(featureId, toolId, event) {
  const feature = findFeature(featureId);
  const tool = currentData.tools.find(t => t.id === toolId);
  if (!feature || !tool) return;
  
  const cell = feature.cells[toolId];
  
  const statusText = cell.status === 'YES' ? 'Documented' : cell.status === 'LIMITED' ? 'Limited/Constrained' : 'Not Supported';
  
  let html = '<div class="detail-section">';
  
  if (cell.links && cell.links.length > 0) {
    const firstLink = typeof cell.links[0] === 'object' ? cell.links[0].url : cell.links[0];
    html += `<p style="font-size: 1.1rem; margin-bottom: 1rem;">${getStatusIcon(cell.status)} <a href="${firstLink}" target="_blank" style="color: var(--primary); text-decoration: none; font-weight: 600;">${statusText}</a></p>`;
  } else {
    html += `<p style="font-size: 1.1rem; margin-bottom: 1rem;">${getStatusIcon(cell.status)} <span style="font-weight: 600;">${statusText}</span></p>`;
  }
  html += `<p style="color: var(--text-muted); line-height: 1.65;">${cell.note}</p>`;
  
  // Show pricing table if available
  if (cell.noteTable) {
    html += '<table class="detail-pricing-table">';
    html += '<thead><tr>';
    cell.noteTable.columns.forEach(col => { html += `<th>${col}</th>`; });
    html += '</tr></thead><tbody>';
    cell.noteTable.rows.forEach(row => {
      html += '<tr>';
      row.forEach((val, i) => {
        html += i === 0 ? `<td class="plan-name">${val}</td>` : `<td>${val}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    if (cell.noteTable.footnote) {
      html += `<p class="detail-pricing-footnote">${cell.noteTable.footnote}</p>`;
    }
  }
  
  html += '</div>';
  
  // Show screenshots if available
  if (cell.screenshots && cell.screenshots.length > 0) {
    html += '<div class="screenshot-section">';
    html += '<h4>📷 Screenshots</h4>';
    html += '<div class="screenshot-grid">';
    cell.screenshots.forEach((filename, index) => {
      html += `<img class="screenshot-thumb" src="screenshots/${filename}" alt="${filename}" data-index="${index}" data-screenshots='${JSON.stringify(cell.screenshots)}' onclick="openLightbox(this.dataset.screenshots, ${index})">`;
    });
    html += '</div>';
    html += '</div>';
  }
  
  // Show evidence if available
  if (cell.evidence && cell.evidence.length > 0) {
    html += '<div class="detail-section" style="margin-top: 1.5rem;">';
    html += '<h4 style="color: var(--primary); margin-bottom: 1rem;">📎 Evidence</h4>';
    
    cell.evidence.forEach((ev, index) => {
      html += '<div style="background: rgba(100, 137, 255, 0.1); border-left: 3px solid var(--primary); padding: 1rem; margin-bottom: 1rem; border-radius: 4px;">';
      
      // Evidence type badge
      const typeIcon = ev.type === 'video' ? '🎥' : '🌐';
      const typeBadge = `<span style="background: var(--surface); color: var(--primary); font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; font-weight: 600;">${typeIcon} ${ev.type}</span>`;
      
      // Source category badge
      const sourceColor = ev.sourceCategory === 'official' ? 'var(--uno-green)' : 'var(--uno-cyan)';
      const sourceBadge = `<span style="background: ${sourceColor}; color: var(--surface); font-size: 0.7rem; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; font-weight: 600; margin-left: 0.5rem;">${ev.sourceCategory}</span>`;
      
      html += `<div style="margin-bottom: 0.5rem;">${typeBadge}${sourceBadge}</div>`;
      if (ev.title) {
        html += `<h5 style="color: white; margin: 0.5rem 0;"><a href="${ev.url}" target="_blank" style="color: var(--primary); text-decoration: none;">${ev.title}</a></h5>`;
      }
      
      if (ev.snippet) {
        html += `<p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin: 0.5rem 0;">${ev.snippet}</p>`;
      }
      
      // Show timestamps for video evidence
      if (ev.type === 'video' && ev.timestamps && ev.timestamps.length > 0) {
        html += '<div style="margin-top: 0.5rem;">';
        html += '<span style="color: var(--text-muted); font-size: 0.85rem; margin-right: 0.5rem;">Timestamps:</span>';
        ev.timestamps.forEach(ts => {
          const videoUrl = ev.url.includes('?') ? `${ev.url}&t=${ts.replace(':', 'm')}s` : `${ev.url}?t=${ts.replace(':', 'm')}s`;
          html += `<a href="${videoUrl}" target="_blank" style="background: var(--surface); color: var(--primary); padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; text-decoration: none; margin-right: 0.5rem; display: inline-block;">${ts}</a>`;
        });
        html += '</div>';
      }
      
      html += '</div>';
    });
    
    html += '</div>';
  }
  
  openDetailPanel(html, event);
}

// ── Lightbox logic ──
let lightboxState = { screenshots: [], currentIndex: 0, basePath: 'screenshots/', toolGroups: null, currentGroupIndex: -1 };

function openReqLightbox(groupIndex, screenshotIndex) {
  var groups = window._reqToolGroups;
  if (!groups || !groups[groupIndex]) return;
  lightboxState.toolGroups = groups;
  lightboxState.currentGroupIndex = groupIndex;
  var g = groups[groupIndex];
  openLightbox(g.screenshots, screenshotIndex, g.basePath);
}

// ── Resource popup ──
const RESOURCE_DATA = {
  mintlify: {
    title: 'Mintlify',
    desc: 'Modern documentation platform that makes it easy to build beautiful, fast docs. Supports MDX, API references, and AI-powered search out of the box.',
    url: 'https://mintlify.com',
    screenshot: 'screenshots/mintlify.png'
  },
  gitbook: {
    title: 'GitBook',
    desc: 'Documentation platform with Git-backed editing, collaborative workflows, and AI-powered search. Popular for product and API documentation.',
    url: 'https://www.gitbook.com',
    screenshot: 'screenshots/gitbook.png'
  },
  docusaurus: {
    title: 'Docusaurus',
    desc: 'Open-source documentation framework by Meta. React-based, supports versioning, i18n, and plugin ecosystem. Great for developer docs.',
    url: 'https://docusaurus.io',
    screenshot: 'screenshots/docusaurus.png'
  },
  readme: {
    title: 'ReadMe',
    desc: 'Interactive API documentation platform with built-in API explorer, changelogs, and developer analytics.',
    url: 'https://readme.com',
    screenshot: 'screenshots/readme.png'
  },
  llmstxt: {
    title: 'llms.txt',
    desc: 'A proposed standard entry point that tells AI models what documentation is available and how to access it.',
    url: 'https://llmstxt.org',
    screenshot: 'screenshots/llmstxt.png',
    example: `# Uno Platform

> Cross-platform .NET UI framework for building
> native mobile, desktop, and web apps with C# and XAML.

## Docs

- [Getting Started](https://platform.uno/docs/getting-started.md)
- [Controls Reference](https://platform.uno/docs/controls.md)
- [XAML Overview](https://platform.uno/docs/xaml-overview.md)
- [Hot Reload](https://platform.uno/docs/hot-reload.md)

## API

- [REST API](https://platform.uno/api/rest.md)
- [Authentication](https://platform.uno/api/auth.md)

## Optional

- [Architecture Guide](https://platform.uno/docs/architecture.md)
- [Migration from WPF](https://platform.uno/docs/migration-wpf.md)
- [Troubleshooting](https://platform.uno/docs/troubleshooting.md)`
  },
  llmsfulltxt: {
    title: 'llms-full.txt',
    desc: 'The extended companion to llms.txt - a single file containing all documentation content concatenated together, designed for models with large context windows that can ingest everything at once.',
    url: 'https://llmstxt.org',
    example: `# Uno Platform - Full Documentation

> This file contains the complete documentation for Uno Platform,
> concatenated into a single document for LLM ingestion.

## Getting Started

Uno Platform allows you to build native mobile, desktop,
and web applications using C# and XAML from a single codebase.

### Installation
\`\`\`bash
dotnet new install Uno.Templates
dotnet new unoapp -o MyApp
\`\`\`

### Project Structure
- MyApp/           → Shared code
- MyApp.Mobile/    → iOS & Android
- MyApp.Desktop/   → Windows, macOS, Linux
- MyApp.Wasm/      → WebAssembly

## Controls Reference

### Button
A standard button control that responds to click events.
…

### TextBox
A text input control with support for validation.
…

(… full docs continue for all sections …)`
  },
  context7: {
    title: 'Context7',
    desc: 'MCP server that provides up-to-date, version-specific documentation directly into your AI coding prompts. Pulls from source docs so the model always has current context.',
    url: 'https://context7.com',
    screenshot: 'screenshots/context7.png'
  },
  mcp: {
    title: 'MCP (Model Context Protocol)',
    desc: 'An open protocol by Anthropic that standardizes how AI models connect to external tools and data sources. Think of it as a USB-C port for AI - one standard interface for any capability.',
    url: 'https://modelcontextprotocol.io',
    screenshot: 'screenshots/mcp.png'
  },
  openapi: {
    title: 'OpenAPI',
    desc: 'The industry standard for describing REST APIs. OpenAPI specs can be automatically converted into tool schemas that AI agents can call directly.',
    url: 'https://www.openapis.org',
    screenshot: 'screenshots/openapi.png'
  },
  tooljson: {
    title: 'Tool-use JSON Specs',
    desc: 'JSON schemas that describe callable tools for AI models - including function name, description, parameters, and expected outputs. Used by OpenAI, Anthropic, and others for function calling.',
    example: `{
  "name": "create_ticket",
  "description": "Create a support ticket in the system",
  "parameters": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Short summary of the issue"
      },
      "priority": {
        "type": "string",
        "enum": ["low", "medium", "high"]
      },
      "description": {
        "type": "string",
        "description": "Detailed description of the problem"
      }
    },
    "required": ["title", "priority"]
  }
}`
  },
  promptmd: {
    title: '.prompt.md',
    desc: 'A VS Code convention for reusable prompt files. Stored in your repo, they can be invoked by name in Copilot Chat to provide consistent guidance for specific tasks.',
    url: 'https://code.visualstudio.com/docs/copilot/copilot-customization',
    example: `---
mode: "agent"
tools: ["run_in_terminal", "read_file"]
description: "Run tests and fix failures"
---

Run the test suite. If any tests fail, read the failing
test file and the source file, then fix the issue.
Always run the tests again after making changes.`
  },
  copilotinstructions: {
    title: 'copilot-instructions.md',
    desc: 'A file placed in .github/ that provides persistent custom instructions to GitHub Copilot across your entire repository. Sets coding conventions, preferred patterns, and project-specific guidance.',
    url: 'https://code.visualstudio.com/docs/copilot/copilot-customization',
    example: `# Project conventions

- Use TypeScript strict mode
- Prefer functional components with hooks
- Use Tailwind CSS for styling, not CSS modules
- Always add error boundaries around async components
- Write tests using Vitest, not Jest
- Use pnpm, not npm or yarn`
  },
  cursorrules: {
    title: '.cursorrules',
    desc: 'A project-level configuration file for the Cursor editor that provides custom instructions to the AI assistant. Similar to copilot-instructions.md but for the Cursor ecosystem.',
    url: 'https://cursor.com',
    example: `You are an expert in TypeScript and Next.js 14.

Key conventions:
- Use server components by default
- Use 'use client' only when needed
- Prefer server actions over API routes
- Use Zod for validation
- Handle errors with Result types, not try/catch`
  },
  skillmd: {
    title: 'SKILL.md',
    desc: 'A VS Code convention for packaging domain-specific knowledge as a loadable skill. Skills are reusable playbooks that an agent can invoke when it encounters a matching task.',
    url: 'https://code.visualstudio.com/docs/copilot/copilot-customization',
    example: `---
name: "database-migration"
description: "Create and run database migrations"
tools: ["run_in_terminal", "create_file"]
---

# Database Migration Skill

## Steps
1. Generate a migration file with timestamp prefix
2. Write the up() and down() functions
3. Run the migration with \`npx prisma migrate dev\`
4. Verify the schema matches the models
5. Update seed data if needed

## Conventions
- Always add both up and down migrations
- Use descriptive migration names
- Test rollback before committing`
  },
  agentsmd: {
    title: 'AGENTS.md',
    desc: 'A convention for defining custom AI agent personas with specific tool access, expertise, and behavioral guidelines. Allows teams to create specialized agents for different workflows.',
    example: `---
name: "security-reviewer"
description: "Reviews code for security vulnerabilities"
tools: ["read_file", "grep_search", "semantic_search"]
---

You are a security-focused code reviewer.

## Focus Areas
- Check for SQL injection, XSS, CSRF
- Verify authentication and authorization
- Review secrets management
- Check dependency vulnerabilities

## Process
1. Scan for common vulnerability patterns
2. Review auth middleware and access controls
3. Check input validation at system boundaries
4. Report findings with severity ratings`
  },
  agentmodes: {
    title: 'Custom Agent Modes',
    desc: 'Pre-configured agent personalities in VS Code that combine specific tools, instructions, and constraints. Modes let you switch between specialized workflows like "code review", "debugging", or "documentation" with different tool access.',
    url: 'https://code.visualstudio.com/docs/copilot/copilot-customization',
    screenshot: 'screenshots/custom-prompts-vs-code.png'
  }
};

// ── Mapping diagram connectors ──
function drawMappingConnectors() {
  var svg = document.getElementById('doc-mapping-svg');
  if (!svg) return;
  var container = svg.parentElement;
  var mapping = container.parentElement;
  var leftCol = mapping.querySelector('.doc-mapping-col:first-child');
  var rightCol = mapping.querySelector('.doc-mapping-col:last-child');
  if (!leftCol || !rightCol) return;

  var leftItems = leftCol.querySelectorAll('.doc-mapping-item');
  var rightItems = rightCol.querySelectorAll('.doc-mapping-item');
  if (leftItems.length < 5 || rightItems.length < 3) return;

  var cRect = container.getBoundingClientRect();
  var w = cRect.width;
  var h = cRect.height;

  function midY(el) {
    var r = el.getBoundingClientRect();
    return r.top + r.height / 2 - cRect.top;
  }

  var left = [midY(leftItems[0]), midY(leftItems[1]), midY(leftItems[2]), midY(leftItems[3]), midY(leftItems[4])];
  var right = [midY(rightItems[0]), midY(rightItems[1]), midY(rightItems[2])];

  // connections: left index -> right index, color
  var connections = [
    [0, 0, 'var(--uno-blue)'],
    [1, 0, 'var(--uno-violet)'],
    [2, 1, 'var(--uno-green)'],
    [3, 2, 'var(--uno-rose)'],
    [4, 2, 'var(--uno-cyan)']
  ];

  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  var paths = '';
  for (var i = 0; i < connections.length; i++) {
    var c = connections[i];
    var y1 = left[c[0]];
    var y2 = right[c[1]];
    paths += '<path d="M0,' + y1 + ' C' + (w * 0.45) + ',' + y1 + ' ' + (w * 0.55) + ',' + y2 + ' ' + w + ',' + y2 + '" stroke="' + c[2] + '" stroke-width="2" fill="none" opacity="0.5"/>';
  }
  svg.innerHTML = paths;
}

function openResourcePopup(e, key) {
  e.preventDefault();
  const data = RESOURCE_DATA[key];
  if (!data) return;
  const popup = document.getElementById('resource-popup');
  document.getElementById('resource-popup-title').textContent = data.title;
  document.getElementById('resource-popup-desc').textContent = data.desc;

  const urlEl = document.getElementById('resource-popup-url');
  if (data.url) {
    urlEl.innerHTML = '<a href="' + data.url + '" target="_blank" rel="noopener" class="doc-resource-url">' + data.url + ' ↗</a>';
  } else {
    urlEl.innerHTML = '';
  }

  const ssEl = document.getElementById('resource-popup-screenshot');
  if (data.screenshot) {
    var ssHtml = '<img src="' + data.screenshot + '" alt="' + data.title + '" class="doc-resource-screenshot" onerror="this.parentNode.style.display=\'none\'">';
    if (data.url) {
      ssHtml = '<a href="' + data.url + '" target="_blank" rel="noopener">' + ssHtml + '</a>';
    }
    ssEl.style.display = '';
    ssEl.innerHTML = ssHtml;
  } else {
    ssEl.innerHTML = '';
  }

  const exEl = document.getElementById('resource-popup-example');
  if (data.example) {
    const escaped = data.example.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    exEl.innerHTML = '<div class="doc-popup-example-label">Example</div><pre class="doc-popup-code"><code>' + escaped + '</code></pre>';
  } else {
    exEl.innerHTML = '';
  }

  popup.classList.remove('hidden');
}

function closeResourcePopup() {
  document.getElementById('resource-popup').classList.add('hidden');
}

function openLightbox(screenshotsJson, index, basePath) {
  const screenshots = typeof screenshotsJson === 'string' ? JSON.parse(screenshotsJson) : screenshotsJson;
  lightboxState.screenshots = screenshots;
  lightboxState.currentIndex = index;
  lightboxState.basePath = (basePath !== undefined) ? basePath : 'screenshots/';
  if (!lightboxState.toolGroups) { lightboxState.currentGroupIndex = -1; }
  updateLightboxImage();
  const lb = document.getElementById('screenshot-lightbox');
  lb.classList.remove('hidden');
  document.addEventListener('keydown', lightboxKeyHandler);

  // Touch swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  let swiping = false;

  function onTouchStart(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    swiping = true;
  }
  function onTouchEnd(e) {
    if (!swiping) return;
    swiping = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // Only count as swipe if horizontal distance > 50px and more horizontal than vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) lightboxNext();
      else lightboxPrev();
    }
  }

  lb.addEventListener('touchstart', onTouchStart, { passive: true });
  lb.addEventListener('touchend', onTouchEnd, { passive: true });
  // Store refs so we can clean up on close
  lightboxState._touchCleanup = function () {
    lb.removeEventListener('touchstart', onTouchStart);
    lb.removeEventListener('touchend', onTouchEnd);
  };
}

function closeLightbox() {
  document.getElementById('screenshot-lightbox').classList.add('hidden');
  document.removeEventListener('keydown', lightboxKeyHandler);
  if (lightboxState._touchCleanup) {
    lightboxState._touchCleanup();
    lightboxState._touchCleanup = null;
  }
  lightboxState.toolGroups = null;
  lightboxState.currentGroupIndex = -1;
}

function updateLightboxImage() {
  const { screenshots, currentIndex, basePath } = lightboxState;
  const filename = screenshots[currentIndex];
  const prefix = (basePath !== undefined && basePath !== null) ? basePath : 'screenshots/';
  document.getElementById('lightbox-img').src = prefix ? `${prefix}${filename}` : filename;
  document.getElementById('lightbox-caption').textContent = `${currentIndex + 1} / ${screenshots.length}`;
  
  // Show/hide left/right nav arrows
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  prevBtn.classList.toggle('lightbox-btn-hidden', currentIndex === 0);
  nextBtn.classList.toggle('lightbox-btn-hidden', currentIndex === screenshots.length - 1);

  // Show/hide up/down tool nav arrows
  const upBtn = document.querySelector('.lightbox-up');
  const downBtn = document.querySelector('.lightbox-down');
  const toolLabel = document.getElementById('lightbox-tool-label');
  const groups = lightboxState.toolGroups;
  const gi = lightboxState.currentGroupIndex;
  if (groups && gi >= 0) {
    upBtn.classList.toggle('lightbox-btn-hidden', gi === 0);
    downBtn.classList.toggle('lightbox-btn-hidden', gi === groups.length - 1);
    toolLabel.textContent = groups[gi].name;
    toolLabel.classList.remove('hidden');
  } else {
    upBtn.classList.add('lightbox-btn-hidden');
    downBtn.classList.add('lightbox-btn-hidden');
    toolLabel.classList.add('hidden');
  }
}

function lightboxPrev() {
  if (lightboxState.currentIndex > 0) {
    lightboxState.currentIndex--;
    updateLightboxImage();
  }
}

function lightboxNext() {
  if (lightboxState.currentIndex < lightboxState.screenshots.length - 1) {
    lightboxState.currentIndex++;
    updateLightboxImage();
  }
}

function lightboxUp() {
  var groups = lightboxState.toolGroups;
  var gi = lightboxState.currentGroupIndex;
  if (!groups || gi <= 0) return;
  gi--;
  lightboxState.currentGroupIndex = gi;
  var g = groups[gi];
  lightboxState.screenshots = g.screenshots;
  lightboxState.currentIndex = 0;
  lightboxState.basePath = g.basePath;
  updateLightboxImage();
}

function lightboxDown() {
  var groups = lightboxState.toolGroups;
  var gi = lightboxState.currentGroupIndex;
  if (!groups || gi >= groups.length - 1) return;
  gi++;
  lightboxState.currentGroupIndex = gi;
  var g = groups[gi];
  lightboxState.screenshots = g.screenshots;
  lightboxState.currentIndex = 0;
  lightboxState.basePath = g.basePath;
  updateLightboxImage();
}

function lightboxKeyHandler(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'ArrowUp') { e.preventDefault(); lightboxUp(); }
  if (e.key === 'ArrowDown') { e.preventDefault(); lightboxDown(); }
}

// Find feature by ID
function findFeature(featureId) {
  const matrix = currentData.matrices.matrix3_featureCentric_v2;
  for (const section of matrix.sections) {
    const feature = section.features.find(f => f.id === featureId);
    if (feature) return feature;
  }
  return null;
}

// Open detail panel
function openDetailPanel(html, event) {
  const panel = document.getElementById('detail-panel');
  const content = document.getElementById('detail-content');
  content.innerHTML = html;
  panel.classList.remove('hidden');
  state.detailPanelOpen = true;

  // If there's an active search query, highlight matching terms in the panel
  if (typeof highlightQueryInElement === 'function') {
    setTimeout(function () { highlightQueryInElement(panel); }, 50);
  }
  
  // Remove previous selected cell highlight
  const previousSelected = document.querySelector('.cell.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }
  
  // Highlight the clicked cell
  if (event) {
    const clickedElement = event.currentTarget || event.target;
    if (clickedElement.classList.contains('cell')) {
      clickedElement.classList.add('selected');
    }
  }
  
  // Position the panel within the viewport
  // Always move panel to body to escape overflow/clip containers
  if (panel.parentElement !== document.body) {
    document.body.appendChild(panel);
  }
  
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // CSS !important handles full-screen (styles.css mobile media query).
    // Just clear any leftover inline styles and lock body scroll.
    panel.style.cssText = '';
    document.body.style.overflow = 'hidden';
  } else {
  // Desktop positioning
  panel.style.position = 'fixed';
  panel.style.width = '400px';
  panel.style.maxWidth = 'calc(100vw - 4rem)';
  
  // Default: right side. If panel would overlap the clicked cell, shift left
  // but never cover the feature names column.
  // Exception: feature-name clicks position panel adjacent to the feature column.
  panel.style.right = '2rem';
  panel.style.left = 'auto';
  
  if (event) {
    const clickedElement = event.currentTarget || event.target;
    const rect = clickedElement.getBoundingClientRect();
    const panelWidth = 400;
    const gap = 8;
    
    // If clicking a feature name, position panel right next to the feature column
    if (clickedElement.classList.contains('feature-name') || clickedElement.closest('.feature-name')) {
      const leftPos = rect.right + gap;
      panel.style.left = `${leftPos}px`;
      panel.style.right = 'auto';
    } else {
      const panelRight = window.innerWidth - 32; // right: 2rem = 32px from right edge
      const panelLeft = panelRight - panelWidth;
      
      // Check if the default right-side position overlaps the clicked cell
      if (panelLeft < rect.right) {
        // Position panel so its right edge is just left of the clicked cell
        const desiredRight = window.innerWidth - rect.left + gap;
        
        // Find the feature names column boundary so we don't cover it
        const featureCol = document.querySelector('.feature-name');
        const minLeft = featureCol ? featureCol.getBoundingClientRect().right + gap : 200;
        
        // Check if this position would cover features
        const resultingLeft = window.innerWidth - desiredRight - panelWidth;
        if (resultingLeft >= minLeft) {
          panel.style.right = `${desiredRight}px`;
          panel.style.left = 'auto';
        } else {
          // Clamp: place panel right at the feature column boundary
          panel.style.left = `${minLeft}px`;
          panel.style.right = 'auto';
        }
      }
    }
  }
  
  const viewportHeight = window.innerHeight;
  const margin = 20;
  
  // Set max-height to fit within viewport with margins
  panel.style.maxHeight = `${viewportHeight - margin * 2}px`;
  
  if (event) {
    const clickedElement = event.currentTarget || event.target;
    const rect = clickedElement.getBoundingClientRect();
    
    // Measure actual panel height after content is set
    const panelHeight = panel.offsetHeight;
    
    // Try to position at clicked element's vertical position
    let topPosition = rect.top;
    
    // Ensure panel doesn't go above viewport
    topPosition = Math.max(margin, topPosition);
    
    // Ensure panel doesn't extend below viewport
    if (topPosition + panelHeight > viewportHeight - margin) {
      topPosition = Math.max(margin, viewportHeight - panelHeight - margin);
    }
    
    panel.style.top = `${topPosition}px`;
  } else {
    panel.style.top = `${margin}px`;
  }
  } // end desktop
}

// Close detail panel
function closeDetailPanel() {
  const panel = document.getElementById('detail-panel');
  panel.classList.add('hidden');
  state.detailPanelOpen = false;
  
  // Restore body scroll if it was locked (mobile)
  document.body.style.overflow = '';
  
  // Clear inline styles set by mobile/desktop positioning
  panel.style.cssText = '';
  panel.classList.remove('req-fullscreen');
  
  // Remove requirements fullscreen backdrop
  const backdrop = document.querySelector('.req-fullscreen-backdrop');
  if (backdrop) backdrop.remove();
  
  // Move panel back into feature-map section if it was moved to body
  const section = document.getElementById('feature-map');
  if (section && panel.parentElement === document.body) {
    section.appendChild(panel);
  }
  
  // Remove selected cell highlight
  const selectedCell = document.querySelector('.cell.selected');
  if (selectedCell) {
    selectedCell.classList.remove('selected');
  }
}

// Render Tool Comparison
function renderToolComparison() {
  const sidebar = document.getElementById('tools-sidebar');
  sidebar.innerHTML = currentData.tools.map(tool => `
    <div class="tool-item" data-tool-id="${tool.id}">
      <h4>${tool.name}</h4>
      <p>${tool.typeHint}</p>
    </div>
  `).join('');
  
  sidebar.querySelectorAll('.tool-item').forEach(el => {
    el.addEventListener('click', (e) => {
      const toolId = e.currentTarget.dataset.toolId;
      showToolProfile(toolId);
      
      sidebar.querySelectorAll('.tool-item').forEach(item => {
        item.classList.toggle('active', item.dataset.toolId === toolId);
      });

      // Scroll the active item into view within the sticky sidebar
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Keep mobile dropdown in sync
      const dropdown = document.getElementById('tool-mobile-dropdown');
      if (dropdown) dropdown.value = toolId;
    });
  });

  // Populate mobile dropdown
  const dropdown = document.getElementById('tool-mobile-dropdown');
  if (dropdown) {
    dropdown.innerHTML = '<option value="" disabled selected>Select a tool…</option>' +
      currentData.tools.map(tool =>
        `<option value="${tool.id}">${tool.name} — ${tool.typeHint}</option>`
      ).join('');
    dropdown.addEventListener('change', () => {
      const toolId = dropdown.value;
      showToolProfile(toolId);
      // Sync sidebar active state
      sidebar.querySelectorAll('.tool-item').forEach(item => {
        item.classList.toggle('active', item.dataset.toolId === toolId);
      });
    });

    // Auto-select first tool on mobile so content is immediately visible
    if (window.innerWidth <= 768 && currentData.tools.length > 0) {
      const firstToolId = currentData.tools[0].id;
      dropdown.value = firstToolId;
      showToolProfile(firstToolId);
      sidebar.querySelectorAll('.tool-item').forEach(item => {
        item.classList.toggle('active', item.dataset.toolId === firstToolId);
      });
    }
  }
}

// Show tool profile
function showToolProfile(toolId) {
  const tool = currentData.tools.find(t => t.id === toolId);
  if (!tool) return;
  
  const profile = document.getElementById('tool-profile');
  
  // On mobile, inject the tool card (image + link) at the top of the profile
  const toolImages = {
    'dreamflow': 'dreamflow.png',
    'lovable': 'lovable.png',
    'vibecode': 'vibecode.png',
    'builder': 'builder.png',
    'bolt': 'bolt.png',
    'tempo': 'tempo.png'
  };
  let html = '';
  if (window.innerWidth <= 768 && toolImages[toolId]) {
    html += `<a href="${tool.website}" target="_blank" rel="noopener noreferrer" class="tool-profile-card-link">`;
    html += `<div class="tool-profile-card">`;
    html += `<div class="tool-profile-card-image"><img src="images/${toolImages[toolId]}" alt="${tool.name} screenshot"></div>`;
    html += `<div class="tool-profile-card-text">`;
    html += `<h3 style="margin:0;color:var(--text);">${tool.name}</h3>`;
    html += `<p style="margin:0.25rem 0 0;color:var(--text-muted);font-size:14px;">${tool.typeHint}</p>`;
    html += `</div></div></a>`;
  } else {
    html += `<h3><a href="${tool.website}" target="_blank" style="color: var(--primary); text-decoration: none;">${tool.name}</a></h3>`;
    html += `<p class="type-hint">${tool.typeHint}</p>`;
  }
  
  html += '<h4>Primary Documentation</h4>';
  html += '<div class="doc-links">';
  Object.entries(tool.primaryDocs).forEach(([key, url]) => {
    html += `<a href="${url}" target="_blank" class="doc-link">${key}: ${url}</a>`;
  });
  html += '</div>';
  
  html += '<div class="feature-summary">';
  
  // Collect features grouped by section
  const matrix = currentData.matrices.matrix3_featureCentric_v2;

  // Short bookmark labels for section nav
  const sectionShortLabels = {
    'A': 'GitHub',
    'B': 'Prompt',
    'C': 'Design',
    'D': 'Ecosystem',
    'E': 'Backend',
    'F': 'Safety',
    'G': 'Mobile',
    'H': 'Deploy',
    'I': 'Desktop',
    'J': 'Accessibility',
    'K': 'AI Config',
    'L': 'Misc'
  };

  // Build section nav bar
  html += '<nav class="tool-section-nav">';
  matrix.sections.forEach(section => {
    const sectionName = section.headline || section.name;
    const letter = sectionName.charAt(0);
    const shortLabel = sectionShortLabels[letter] || sectionName;
    const anchorId = 'tool-section-' + toolId + '-' + letter;
    html += `<a class="tool-section-nav-item" href="#${anchorId}">${letter}. ${shortLabel}</a>`;
  });
  html += '</nav>';
  
  matrix.sections.forEach(section => {
    const sectionTitle = section.headline || section.name;
    const letter = sectionTitle.charAt(0);
    const anchorId = 'tool-section-' + toolId + '-' + letter;
    
    // Add section header with anchor
    html += `<div class="tool-section-header" id="${anchorId}">${sectionTitle}</div>`;
    
    // Render features in this section
    section.features.forEach(feature => {
      const cell = feature.cells[toolId];
      html += '<div class="feature-summary-item">';
      html += `<h4><span class="status">${getStatusIcon(cell.status)}</span>${feature.name}</h4>`;
      html += `<p>${cell.note}</p>`;
      // Show pricing table if available
      if (cell.noteTable) {
        html += '<table class="detail-pricing-table">';
        html += '<thead><tr>';
        cell.noteTable.columns.forEach(col => { html += `<th>${col}</th>`; });
        html += '</tr></thead><tbody>';
        cell.noteTable.rows.forEach(row => {
          html += '<tr>';
          row.forEach((val, i) => {
            html += i === 0 ? `<td class="plan-name">${val}</td>` : `<td>${val}</td>`;
          });
          html += '</tr>';
        });
        html += '</tbody></table>';
        if (cell.noteTable.footnote) {
          html += `<p class="detail-pricing-footnote">${cell.noteTable.footnote}</p>`;
        }
      }
      if (cell.links && cell.links.length > 0) {
        html += '<div class="evidence-links">';
        html += '<span class="evidence-label">📎 Evidence:</span>';
        cell.links.forEach(link => {
          const linkUrl = typeof link === 'object' ? link.url : link;
          const linkLabel = typeof link === 'object' ? (link.label || link.url) : link;
          html += `<a href="${linkUrl}" target="_blank" class="evidence-link">${linkLabel}</a>`;
        });
        html += '</div>';
      }
      if (cell.screenshots && cell.screenshots.length > 0) {
        html += '<div class="screenshot-section"><div class="screenshot-grid">';
        cell.screenshots.forEach((filename, index) => {
          html += `<img class="screenshot-thumb" src="screenshots/${filename}" alt="${filename}" data-index="${index}" data-screenshots='${JSON.stringify(cell.screenshots)}' onclick="openLightbox(this.dataset.screenshots, ${index})">`;
        });
        html += '</div></div>';
      }
      html += '</div>';
    });
  });
  
  html += '</div>';
  
  profile.innerHTML = html;

  // Smooth-scroll nav links within the profile
  profile.querySelectorAll('.tool-section-nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Render Uno Opportunity in Overview
function renderUnoOpportunityInOverview() {
  const container = document.getElementById('opportunity-cards-overview');
  
  // Create wrapper for cards and panel
  container.innerHTML = `
    <div class="opportunity-section" id="opportunity-section">
      <div id="opportunity-cards-grid"></div>
      <div id="opportunity-detail-panel" class="opportunity-detail-panel hidden">
        <div id="opportunity-detail-content">
          <p style="text-align: center; font-size: 1rem;">→ Select an opportunity to view details</p>
        </div>
      </div>
    </div>
  `;
  
  const cardsGrid = document.getElementById('opportunity-cards-grid');
  cardsGrid.innerHTML = currentData.unoOpportunityCards.map((card, index) => `
    <div class="opportunity-card" data-card-id="${card.id}">
      <h3>${index + 1}. ${card.title}</h3>
      <p class="summary">${card.summary}</p>
      <p class="expand-indicator">Click to view details →</p>
    </div>
  `).join('');
  
  cardsGrid.querySelectorAll('.opportunity-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const cardId = card.dataset.cardId;
      showOpportunityDetail(cardId);
    });
  });
  
  // Add close panel listener
  const closeBtn = document.querySelector('#opportunity-detail-panel .close-panel');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOpportunityPanel);
  }
}

// Show opportunity detail in panel
function showOpportunityDetail(cardId) {
  const card = currentData.unoOpportunityCards.find(c => c.id === cardId);
  if (!card) return;
  
  // Remove selected class from all cards and add to clicked card
  document.querySelectorAll('.opportunity-card').forEach(c => c.classList.remove('selected'));
  const selectedCard = document.querySelector(`.opportunity-card[data-card-id="${cardId}"]`);
  if (selectedCard) {
    selectedCard.classList.add('selected');
  }
  
  const cardIndex = currentData.unoOpportunityCards.findIndex(c => c.id === cardId);
  
  let html = `<button class="close-panel">&times;</button>`;
  html += `<h3>${cardIndex + 1}. ${card.title}</h3>`;
  html += `<p style="color: var(--text-muted); margin-bottom: 1.5rem;">${card.summary}</p>`;
  
  html += '<div class="opportunity-details">';
  html += '<h4>Why Now</h4>';
  html += `<p>${card.whyNow}</p>`;
  
  if (card.whatCompetitorsDo) {
    html += '<h4>What Competitors Do</h4>';
    html += '<ul>';
    card.whatCompetitorsDo.forEach(item => {
      html += `<li>${item}</li>`;
    });
    html += '</ul>';
  }
  
  html += '<h4>How Uno Wins</h4>';
  html += '<ul>';
  card.howUnoWins.forEach(item => {
    html += `<li>${item}</li>`;
  });
  html += '</ul>';
  html += '</div>';
  
  const panel = document.getElementById('opportunity-detail-panel');
  const content = document.getElementById('opportunity-detail-content');
  content.innerHTML = html;
  
  // Add close button listener
  const closeBtn = content.querySelector('.close-panel');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeOpportunityPanel);
  }
  
  const section = document.getElementById('opportunity-section');
  section.classList.add('with-panel');
  
  // Calculate and set panel position to align with selected card
  if (selectedCard) {
    const cardsGrid = document.getElementById('opportunity-cards-grid');
    const cardRect = selectedCard.getBoundingClientRect();
    const gridRect = cardsGrid.getBoundingClientRect();
    const offset = cardRect.top - gridRect.top;
    panel.style.top = `${offset}px`;
  }
  
  panel.classList.remove('hidden');
}

// Close opportunity panel
function closeOpportunityPanel() {
  const panel = document.getElementById('opportunity-detail-panel');
  const content = document.getElementById('opportunity-detail-content');
  content.innerHTML = '<p style="text-align: center; font-size: 1rem;">→ Select an opportunity to view details</p>';
  panel.classList.add('hidden');
  panel.style.top = '0';
  
  const section = document.getElementById('opportunity-section');
  section.classList.remove('with-panel');
  
  // Remove selected class from all cards
  document.querySelectorAll('.opportunity-card').forEach(c => c.classList.remove('selected'));
}

// Start the app
init();
