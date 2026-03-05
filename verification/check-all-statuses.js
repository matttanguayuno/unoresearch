import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load data
const dataPath = join(__dirname, '..', 'data.js');
const dataContent = readFileSync(dataPath, 'utf-8');
const dataModule = dataContent
  .replace(/^\/\/.*$/gm, '')
  .replace('export const data = ', '')
  .replace(/;[\s]*$/, '');
const data = JSON.parse(dataModule);

const matrix = data.matrices.matrix3_featureCentric_v2;

console.log('=== ALL CELL STATUSES ===\n');

const statusCounts = {};
const undocumentedCells = [];

matrix.sections.forEach(section => {
  section.features.forEach(feature => {
    Object.entries(feature.cells).forEach(([toolName, cell]) => {
      const status = cell.status || 'UNDOCUMENTED';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      
      if (!cell.status || cell.status === '' || cell.status === 'UNDOCUMENTED') {
        undocumentedCells.push({
          tool: toolName,
          feature: feature.id,
          featureName: feature.name,
          status: cell.status
        });
      }
    });
  });
});

console.log('=== STATUS SUMMARY ===');
Object.entries(statusCounts).sort().forEach(([status, count]) => {
  console.log(`${status.padEnd(20)}: ${count}`);
});

console.log('\n=== UNDOCUMENTED CELLS (Red X) ===');
console.log(`Total: ${undocumentedCells.length}`);
if (undocumentedCells.length > 0) {
  console.log('\nFirst 10:');
  undocumentedCells.slice(0, 10).forEach(cell => {
    console.log(`  ${cell.tool} - ${cell.featureName} (status: '${cell.status || 'EMPTY'}')`);
  });
}
