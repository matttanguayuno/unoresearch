const fs = require('fs');
const vm = require('vm');

// Load data.js (browser global)
let dataCode = fs.readFileSync('./data.js', 'utf8');
// Replace const with var so it leaks into the context
dataCode = dataCode.replace(/^const /gm, 'var ');
const dataCtx = {};
vm.runInNewContext(dataCode, dataCtx);
const data = dataCtx.data;

// Load requirements-data.js
let reqCode = fs.readFileSync('./requirements-data.js', 'utf8');
reqCode = reqCode.replace(/^const /gm, 'var ');
const reqCtx = {};
vm.runInNewContext(reqCode, reqCtx);
const reqData = reqCtx.requirementsData;

console.log('data keys:', Object.keys(data || {}));
console.log('reqData keys:', Object.keys(reqData || {}));

const REQ_TO_FEATURE = {
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
  'local-self-hosted-ai': 'local_selfhosted_ai',
  'credits-token-pricing': 'credits',
  'sample-templates': 'templates',
  'in-app-feedback': 'feedback'
};

const matrix = data.matrices.matrix3_featureCentric_v2;
const tools = data.tools.map(t => t.id);

// Build lookup from feature id to feature
const featureLookup = {};
matrix.sections.forEach(s => {
  s.features.forEach(f => {
    featureLookup[f.id] = f;
  });
});

const mismatches = [];
reqData.categories.forEach(cat => {
  cat.features.forEach(req => {
    const dataFeatureId = REQ_TO_FEATURE[req.id];
    if (!dataFeatureId) return;
    
    const feature = featureLookup[dataFeatureId];
    if (!feature) {
      mismatches.push({ req: req.id, issue: 'Feature not found in data.js: ' + dataFeatureId });
      return;
    }
    
    // Count actual YES/LIMITED/NO
    let yes = 0, limited = 0, no = 0;
    const toolStatuses = {};
    tools.forEach(toolId => {
      const cell = feature.cells[toolId];
      if (!cell) return;
      toolStatuses[toolId] = cell.status;
      if (cell.status === 'YES') yes++;
      else if (cell.status === 'LIMITED') limited++;
      else no++;
    });
    
    const total = yes + limited;
    const expectedCoverage = total + '/6';
    
    // Build expected coverageDetail
    let parts = [];
    if (yes > 0) parts.push(yes + ' YES');
    if (limited > 0) parts.push(limited + ' LIMITED');
    const actualDetail = parts.join(' + ') || 'none';
    
    const issues = [];
    if (req.coverage !== expectedCoverage) {
      issues.push('coverage: claimed ' + req.coverage + ' actual ' + expectedCoverage);
    }
    
    // Parse claimed counts from coverageDetail
    const claimedYesMatch = req.coverageDetail.match(/(\d+)\s*YES/i);
    const claimedLimitedMatch = req.coverageDetail.match(/(\d+)\s*LIMITED/i);
    
    if (claimedYesMatch && parseInt(claimedYesMatch[1]) !== yes) {
      issues.push('YES count: claimed ' + claimedYesMatch[1] + ' actual ' + yes);
    }
    if (claimedLimitedMatch && parseInt(claimedLimitedMatch[1]) !== limited) {
      issues.push('LIMITED count: claimed ' + claimedLimitedMatch[1] + ' actual ' + limited);
    }
    
    // Check 'all YES' claims
    if (req.coverageDetail.includes('all YES') && (yes !== 6 || limited !== 0)) {
      issues.push('Claims "all YES" but actual: ' + yes + ' YES + ' + limited + ' LIMITED + ' + no + ' NO');
    }
    
    // Check 'all except' claims
    if (req.coverageDetail.includes('all except') && yes + limited !== 5) {
      issues.push('Claims "all except X" but actual support count: ' + (yes + limited));
    }
    
    // Check 'none' claims
    if (req.coverageDetail === 'none' && (yes > 0 || limited > 0)) {
      issues.push('Claims "none" but actual: ' + yes + ' YES + ' + limited + ' LIMITED');
    }
    
    if (issues.length > 0) {
      mismatches.push({
        req: req.id,
        name: req.name,
        claimed: { coverage: req.coverage, detail: req.coverageDetail },
        actual: { yes, limited, no, coverage: expectedCoverage, detail: actualDetail, toolStatuses },
        issues
      });
    }
  });
});

console.log('\n=== MISMATCHES FOUND: ' + mismatches.length + ' ===\n');
mismatches.forEach(m => {
  console.log('Feature: ' + (m.name || m.req));
  if (m.issue) { console.log('  ' + m.issue); return; }
  console.log('  Claimed: coverage=' + m.claimed.coverage + ', detail="' + m.claimed.detail + '"');
  console.log('  Actual:  ' + m.actual.yes + ' YES + ' + m.actual.limited + ' LIMITED + ' + m.actual.no + ' NO = ' + m.actual.coverage);
  console.log('  Tools: ' + JSON.stringify(m.actual.toolStatuses));
  m.issues.forEach(i => console.log('  -> ' + i));
  console.log('');
});
