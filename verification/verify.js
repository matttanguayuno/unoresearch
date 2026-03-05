/**
 * verify.js
 * 
 * Node.js script to generate verification_results.json
 * This creates a template with all cells from the feature matrix
 * 
 * Usage: node verification/verify.js
 * 
 * Future enhancements:
 * - Web search integration for automatic evidence gathering
 * - Video transcript analysis for timestamp extraction
 * - Confidence scoring based on evidence quality
 */

import { data } from '../data.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Generating verification template...\n');

const overrides = {};
let cellCount = 0;

// Walk matrix3_featureCentric_v2 (the primary matrix)
const matrix = data.matrices.matrix3_featureCentric_v2;

matrix.sections.forEach(section => {
  console.log(`  Processing section: ${section.name}`);
  
  section.features.forEach(feature => {
    Object.keys(feature.cells).forEach(toolId => {
      const cellKey = `${toolId}::${feature.id}`;
      const cell = feature.cells[toolId];
      
      // Create a baseline override entry for each cell
      overrides[cellKey] = {
        status: cell.status,
        note: cell.note,
        links: cell.links || [],
        evidence: [], // Empty evidence array to be filled manually or by automation
        confidence: "baseline",
        verifiedAt: null
      };
      
      cellCount++;
    });
  });
});

// Create the output object
const output = {
  generatedAt: new Date().toISOString(),
  version: "1.0",
  description: "Verification overrides for AI App Builders competitive analysis",
  stats: {
    totalCells: cellCount,
    overriddenCells: 0,
    cellsWithEvidence: 0
  },
  overrides
};

// Write to verification_results.json in the parent directory
const outputPath = path.join(__dirname, '..', 'verification_results.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`\n✅ Generated ${cellCount} baseline entries`);
console.log(`📄 Output: verification_results.json`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Edit verification_results.json to add evidence`);
console.log(`   2. Update status/note fields where verification differs from baseline`);
console.log(`   3. Add evidence objects with type, title, url, and optional timestamps`);
console.log(`   4. Refresh the site to see verification badge and overrides\n`);
console.log(`Example evidence format:`);
console.log(`{
  "type": "web",
  "title": "Official Documentation: Feature X",
  "url": "https://example.com/docs/feature-x",
  "snippet": "Confirms that Feature X is supported...",
  "sourceCategory": "official"
}`);
console.log(`\nFor video evidence, include timestamps:`);
console.log(`{
  "type": "video",
  "title": "Tutorial: Using Feature Y",
  "url": "https://youtube.com/watch?v=...",
  "timestamps": ["0:00", "2:35", "5:12"],
  "snippet": "Demonstrates Feature Y at 2:35...",
  "sourceCategory": "third_party"
}\n`);
