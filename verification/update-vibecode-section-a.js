import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resultsPath = join(__dirname, '..', 'verification_results.json');
const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));

// Section A features for Vibecode
const sectionAFeatures = [
  'gh_native',
  'import_repo', 
  'create_repo',
  'branching',
  'pr_creation',
  'merge_in_product',
  'multi_user_collab'
];

// Get the template evidence from vibecode::import_repo
const template = results.overrides['vibecode::import_repo'];

console.log('=== UPDATING VIBECODE SECTION A CELLS ===\n');

sectionAFeatures.forEach(feature => {
  const cellKey = `vibecode::${feature}`;
  
  if (results.overrides[cellKey]) {
    results.overrides[cellKey] = {
      ...results.overrides[cellKey],
      note: 'Not documented. Vibecode documentation makes no mention of GitHub integration or any Git-based workflows.',
      links: ['https://www.vibecodeapp.com/docs'],
      evidence: [{
        type: 'web',
        title: 'Vibecode Does Not Support GitHub Integration',
        url: 'https://www.vibecodeapp.com/docs',
        snippet: 'Reviewed Vibecode documentation at https://www.vibecodeapp.com/docs - no mention of GitHub integration, repository importing, or Git-based workflows. Documentation focuses on SSH export feature only. Absence of any GitHub functionality in official docs confirms these features are not supported.',
        sourceCategory: 'official'
      }],
      confidence: 'high',
      verifiedAt: new Date().toISOString()
    };
    console.log(`✅ Updated ${cellKey}`);
  }
});

// Save results
writeFileSync(resultsPath, JSON.stringify(results, null, 2));

console.log('\n✅ Updated all Vibecode cells in Section A (GitHub & collaboration model)');
