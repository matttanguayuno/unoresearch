import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data
const dataPath = join(__dirname, '..', 'data.js');
const dataContent = readFileSync(dataPath, 'utf-8');
// Remove comments, export statement, and trailing semicolon
const dataModule = dataContent
  .replace(/^\/\/.*$/gm, '') // Remove comment lines
  .replace('export const data = ', '')
  .replace(/;[\s]*$/, '');
const data = JSON.parse(dataModule);

// Load verification results
const resultsPath = join(__dirname, '..', 'verification_results.json');
const results = JSON.parse(readFileSync(resultsPath, 'utf-8'));

// Helper to get all cells
function getAllCells() {
  const cells = [];
  const matrix = data.matrices.matrix3_featureCentric_v2;
  
  matrix.sections.forEach(section => {
    section.features.forEach(feature => {
      Object.entries(feature.cells).forEach(([toolName, cell]) => {
        cells.push({
          cellKey: `${toolName}::${feature.id}`,
          toolName: toolName,
          featureId: feature.id,
          featureName: feature.name,
          status: cell.status,
          links: cell.links || []
        });
      });
    });
  });
  
  return cells;
}

// Get cells needing review
const allCells = getAllCells();
const uncertainCells = [];

allCells.forEach(cell => {
  const override = results.overrides[cell.cellKey];
  
  // Check if cell needs review:
  // 1. WARNING status (LIMITED ⚠️) - yellow warning icon
  // 2. NO status (❌) - red X icon, need to double-check agent's "doesn't exist" finding
  // 3. No verification yet
  // 4. No evidence
  // 5. Medium or low confidence
  const needsReview = 
    cell.status === 'LIMITED' || // WARNING - yellow icon
    cell.status === 'NO' || // RED X - agent says feature doesn't exist
    !override || // No verification yet
    !override.evidence || // No evidence
    override.evidence.length === 0 || // Empty evidence
    override.confidence === 'medium' || // Medium confidence
    override.confidence === 'low'; // Low confidence
  
  if (needsReview) {
    const confidence = override?.confidence || 'none';
    const evidenceCount = override?.evidence?.length || 0;
    
    uncertainCells.push({
      cellKey: cell.cellKey,
      tool: cell.toolName,
      feature: cell.featureName,
      status: cell.status,
      confidence: confidence,
      evidenceCount: evidenceCount,
      links: cell.links
    });
  }
});

// Sort by confidence (none first, then low, then medium)
const confidenceOrder = { 'none': 0, 'low': 1, 'medium': 2 };
uncertainCells.sort((a, b) => {
  const orderDiff = confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
  if (orderDiff !== 0) return orderDiff;
  return a.cellKey.localeCompare(b.cellKey);
});

// Output results
console.log('\n=== CELLS NEEDING MANUAL REVIEW ===\n');
console.log(`Total: ${uncertainCells.length} cells\n`);

// Group by confidence level
const byConfidence = {
  none: uncertainCells.filter(c => c.confidence === 'none'),
  low: uncertainCells.filter(c => c.confidence === 'low'),
  medium: uncertainCells.filter(c => c.confidence === 'medium')
};

console.log(`No verification: ${byConfidence.none.length}`);
console.log(`Low confidence: ${byConfidence.low.length}`);
console.log(`Medium confidence: ${byConfidence.medium.length}\n`);

// Output for ChatGPT
console.log('=== FORMATTED FOR CHATGPT ===\n');
console.log('Please search for documentation on these features:\n');

uncertainCells.forEach(cell => {
  console.log(`${cell.tool} - ${cell.feature}`);
  console.log(`  Status: ${cell.status}, Confidence: ${cell.confidence}`);
  if (cell.links.length > 0) {
    console.log(`  Links: ${cell.links.join(', ')}`);
  }
  console.log('');
});

// Output as JSON for programmatic use
console.log('\n=== JSON FORMAT ===\n');
console.log(JSON.stringify(uncertainCells, null, 2));
