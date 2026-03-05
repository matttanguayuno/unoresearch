import { readFileSync, writeFileSync } from 'fs';
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

// Get all cells and reset confidence for WARNING/NOT DOCUMENTED
const allCells = getAllCells();
let resetCount = 0;

allCells.forEach(cell => {
  const override = results.overrides[cell.cellKey];
  
  // Check if cell is WARNING (LIMITED) or NOT DOCUMENTED (empty/undefined)
  const needsReset = 
    cell.status === 'LIMITED' || 
    cell.status === 'UNKNOWN' || 
    cell.status === '' || 
    !cell.status;
  
  if (needsReset && override && override.confidence === 'high') {
    console.log(`Resetting confidence for ${cell.cellKey} (${cell.status || 'NOT DOCUMENTED'})`);
    override.confidence = 'medium'; // Downgrade from high to medium for manual review
    override.verified = false; // Mark as unverified
    resetCount++;
  }
});

// Save updated results
writeFileSync(resultsPath, JSON.stringify(results, null, 2));
console.log(`\n✅ Reset confidence for ${resetCount} cells`);
console.log(`Updated verification_results.json`);
