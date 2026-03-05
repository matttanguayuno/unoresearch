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

console.log('=== VIBECODE CELL STATUSES ===\n');

const statusCounts = { LIMITED: 0, NO: 0, YES: 0, EMPTY: 0 };

matrix.sections.forEach(section => {
  section.features.forEach(feature => {
    const vibecodeCell = feature.cells.vibecode;
    if (vibecodeCell) {
      const status = vibecodeCell.status || 'EMPTY';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
      console.log(`${feature.id.padEnd(30)} : ${status}`);
    }
  });
});

console.log('\n=== SUMMARY ===');
Object.entries(statusCounts).forEach(([status, count]) => {
  console.log(`${status}: ${count}`);
});
