import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load existing verification results
const existingPath = join(__dirname, '..', 'verification_results.json');
const existing = JSON.parse(readFileSync(existingPath, 'utf-8'));

// Load ChatGPT verification results
const chatgptPath = join(__dirname, '..', 'verification_results_chatgpt.json');
const chatgpt = JSON.parse(readFileSync(chatgptPath, 'utf-8'));

console.log('=== MERGING VERIFICATION RESULTS ===\n');
console.log(`Existing cells: ${Object.keys(existing.overrides).length}`);
console.log(`ChatGPT cells: ${Object.keys(chatgpt.overrides).length}`);

let updatedCount = 0;
let newCount = 0;
let skippedCount = 0;

// Merge ChatGPT results into existing
Object.entries(chatgpt.overrides).forEach(([cellKey, chatgptData]) => {
  const existingData = existing.overrides[cellKey];
  
  if (!existingData) {
    // New cell from ChatGPT
    existing.overrides[cellKey] = chatgptData;
    newCount++;
    console.log(`➕ NEW: ${cellKey}`);
  } else {
    // Cell exists - merge intelligently
    // Priority: ChatGPT's evidence if it's more detailed or has better confidence
    const chatgptHasEvidence = chatgptData.evidence && chatgptData.evidence.length > 0;
    const existingHasEvidence = existingData.evidence && existingData.evidence.length > 0;
    
    if (chatgptHasEvidence) {
      if (!existingHasEvidence || chatgptData.confidence === 'high') {
        // Use ChatGPT data if existing has no evidence OR ChatGPT has high confidence
        existing.overrides[cellKey] = {
          ...existingData,
          ...chatgptData,
          // Keep the most recent verification timestamp
          verifiedAt: chatgptData.verifiedAt || existingData.verifiedAt
        };
        updatedCount++;
        console.log(`🔄 UPDATED: ${cellKey} (${existingData.confidence || 'none'} → ${chatgptData.confidence})`);
      } else {
        // Keep existing but note that ChatGPT has alternate data
        skippedCount++;
      }
    } else {
      // ChatGPT has no evidence, keep existing
      skippedCount++;
    }
  }
});

// Update stats
existing.stats = {
  totalCells: chatgpt.stats.totalCells || 135,
  overriddenCells: Object.keys(existing.overrides).length,
  cellsWithEvidence: Object.values(existing.overrides).filter(
    cell => cell.evidence && cell.evidence.length > 0
  ).length
};

existing.generatedAt = new Date().toISOString();

// Save merged results
writeFileSync(existingPath, JSON.stringify(existing, null, 2));

console.log('\n=== MERGE COMPLETE ===');
console.log(`➕ New cells added: ${newCount}`);
console.log(`🔄 Cells updated: ${updatedCount}`);
console.log(`⏭️  Cells skipped: ${skippedCount}`);
console.log(`📊 Total cells with overrides: ${existing.stats.overriddenCells}`);
console.log(`📝 Total cells with evidence: ${existing.stats.cellsWithEvidence}`);
console.log('\n✅ Updated verification_results.json');
