/**
 * Autonomous Verification Agent
 * 
 * This script uses an LLM API to automatically verify cells by:
 * 1. Reading cell data and documentation links
 * 2. Fetching the actual documentation
 * 3. Using AI to extract evidence and quotes
 * 4. Updating verification_results.json
 * 
 * Usage:
 *   node verification/autonomous-verify.js --feature gh_native
 *   node verification/autonomous-verify.js --all
 *   node verification/autonomous-verify.js --cell dreamflow::gh_native
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Set your API key via environment variable: OPENAI_API_KEY or ANTHROPIC_API_KEY
  apiProvider: process.env.AI_PROVIDER || 'anthropic', // 'openai' or 'anthropic'
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY,
  model: process.env.AI_MODEL || 'claude-3-5-sonnet-20241022',
  maxConcurrent: 3, // Process 3 cells at a time
  retryAttempts: 2,
  delayBetweenRequests: 1000 // 1 second
};

// Load data
function loadData() {
  const dataPath = path.join(__dirname, '..', 'data.js');
  const dataContent = fs.readFileSync(dataPath, 'utf8');
  
  // Extract the data object (hacky but works for ESM export)
  const dataMatch = dataContent.match(/export const data = ({[\s\S]+});/);
  if (!dataMatch) throw new Error('Could not parse data.js');
  
  // Use eval to parse (note: only safe because this is our own code)
  const data = eval('(' + dataMatch[1] + ')');
  return data;
}

// Load verification results
function loadVerificationResults() {
  const verificationPath = path.join(__dirname, '..', 'verification_results.json');
  return JSON.parse(fs.readFileSync(verificationPath, 'utf8'));
}

// Save verification results
function saveVerificationResults(results) {
  const verificationPath = path.join(__dirname, '..', 'verification_results.json');
  fs.writeFileSync(verificationPath, JSON.stringify(results, null, 4), 'utf8');
}

// Fetch webpage content (simplified - in production use a proper library)
async function fetchWebpage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(`     ⚠️  HTTP ${response.status} for ${url}`);
      return null;
    }
    const html = await response.text();
    
    // Strip HTML tags for simple text extraction
    const text = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return text.substring(0, 50000); // Limit to 50k chars
  } catch (error) {
    console.error(`     ❌ Failed to fetch ${url}:`, error.message);
    return null;
  }
}

// Try to find alternative documentation when primary link fails
async function searchForAlternativeDocs(toolName, featureName, toolInfo) {
  console.log(`     🔎 Searching for alternative documentation...`);
  
  // Try common doc page patterns
  const alternativeUrls = [];
  
  if (toolInfo.primaryDocs) {
    // Add all primary doc URLs
    Object.values(toolInfo.primaryDocs).forEach(url => {
      if (url && !alternativeUrls.includes(url)) {
        alternativeUrls.push(url);
      }
    });
  }
  
  // Try tool's main website + /docs
  if (toolInfo.website) {
    const baseUrl = toolInfo.website.replace(/\/$/, '');
    alternativeUrls.push(`${baseUrl}/docs`);
    alternativeUrls.push(`${baseUrl}/documentation`);
  }
  
  console.log(`     📚 Trying ${alternativeUrls.length} alternative URLs...`);
  
  const texts = [];
  for (const url of alternativeUrls) {
    const text = await fetchWebpage(url);
    if (text) {
      texts.push({ url, text });
      console.log(`     ✅ Found docs at: ${url}`);
    }
    await new Promise(resolve => setTimeout(resolve, 300)); // Small delay
  }
  
  return texts;
}

// Call LLM API to analyze documentation and extract evidence
async function analyzeWithAI(cellKey, toolName, featureName, status, note, links, documentationText) {
  const prompt = `You are a research verification assistant. Analyze documentation to verify a claim about a software feature.

CELL TO VERIFY:
- Tool: ${toolName}
- Feature: ${featureName}
- Claimed Status: ${status}
- Claimed Note: ${note}
- Documentation URLs: ${links.join(', ')}

DOCUMENTATION TEXT:
${documentationText}

TASK:
1. Determine if the documentation SUPPORTS the claimed status and note
2. Extract EXACT QUOTES from the documentation that prove/disprove the claim
3. Rate your confidence: high, medium, or low
4. For negative findings (status: NO), confirm the feature is truly absent

RESPONSE FORMAT (JSON only):
{
  "verified": true/false,
  "confidence": "high/medium/low",
  "title": "Short descriptive title for this evidence",
  "snippet": "Include direct quotes in quotation marks, then explain what they prove. Should be 2-4 sentences.",
  "sourceCategory": "official",
  "reasoning": "Brief explanation of why you reached this conclusion"
}

Return ONLY valid JSON, no other text.`;

  try {
    let response;
    
    if (config.apiProvider === 'anthropic') {
      response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: config.model,
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      });
    } else if (config.apiProvider === 'openai') {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.3
        })
      });
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    let content;
    
    if (config.apiProvider === 'anthropic') {
      content = result.content[0].text;
    } else {
      content = result.choices[0].message.content;
    }
    
    // Extract JSON from response
    const jsonMatch = content.match(/\{[\s\S]+\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from AI response');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error(`AI analysis failed for ${cellKey}:`, error.message);
    return null;
  }
}

// Verify a single cell
async function verifyCell(cellKey, cellData, toolInfo) {
  console.log(`\n🔍 Verifying: ${cellKey}`);
  console.log(`   Tool: ${toolInfo.name}`);
  console.log(`   Status: ${cellData.status}`);
  console.log(`   Links: ${cellData.links.join(', ')}`);
  
  // Fetch documentation
  const documentationTexts = [];
  let anySuccessfulFetch = false;
  
  for (const link of cellData.links) {
    const text = await fetchWebpage(link);
    if (text) {
      documentationTexts.push(text);
      anySuccessfulFetch = true;
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay between fetches
  }
  
  // If all primary links failed, search for alternatives
  if (!anySuccessfulFetch) {
    console.log(`     ⚠️  All primary links failed, searching alternatives...`);
    const alternatives = await searchForAlternativeDocs(
      toolInfo.name,
      cellData.featureName || 'Unknown Feature',
      toolInfo
    );
    
    if (alternatives.length > 0) {
      alternatives.forEach(alt => {
        documentationTexts.push(alt.text);
        // Update links to include the working URL
        if (!cellData.links.includes(alt.url)) {
          cellData.links.push(alt.url);
        }
      });
      anySuccessfulFetch = true;
    }
  }
  
  if (documentationTexts.length === 0) {
    console.log(`   ⚠️  Could not fetch any documentation (including alternatives)`);
    
    // For negative findings (NO status), this might be expected
    if (cellData.status === 'NO') {
      console.log(`   ℹ️  Status is NO - absence of docs may support the claim`);
      // Still analyze with AI but note the limitation
      const analysis = await analyzeWithAI(
        cellKey,
        toolInfo.name,
        cellData.featureName || 'Unknown Feature',
        cellData.status,
        cellData.note,
        cellData.links,
        'No documentation found at provided URLs or common documentation locations. This may indicate the feature is not documented or not supported.'
      );
      
      if (analysis) {
        // Downgrade confidence since we couldn't verify with actual docs
        analysis.confidence = 'medium';
        analysis.snippet = `Documentation not found at provided URLs (${cellData.links.join(', ')}). ${analysis.snippet}`;
        
        const evidence = {
          type: 'web',
          title: analysis.title,
          url: cellData.links[0],
          snippet: analysis.snippet,
          sourceCategory: 'inference' // Not official since we couldn't fetch
        };
        
        return {
          evidence: [evidence],
          confidence: analysis.confidence,
          verifiedAt: new Date().toISOString()
        };
      }
    }
    
    return null;
  }
  
  const combinedDocs = documentationTexts.join('\n\n---\n\n');
  
  // Analyze with AI
  const analysis = await analyzeWithAI(
    cellKey,
    toolInfo.name,
    cellData.featureName || 'Unknown Feature',
    cellData.status,
    cellData.note,
    cellData.links,
    combinedDocs
  );
  
  if (!analysis) {
    console.log(`   ⚠️  AI analysis failed`);
    return null;
  }
  
  console.log(`   ✅ Verified: ${analysis.verified}`);
  console.log(`   📊 Confidence: ${analysis.confidence}`);
  console.log(`   💡 Reasoning: ${analysis.reasoning}`);
  
  // Create evidence object
  const evidence = {
    type: 'web',
    title: analysis.title,
    url: cellData.links[0], // Primary link
    snippet: analysis.snippet,
    sourceCategory: analysis.sourceCategory
  };
  
  return {
    evidence: [evidence],
    confidence: analysis.confidence,
    verifiedAt: new Date().toISOString()
  };
}

// Build list of all cells from data
function getAllCells(data) {
  const cells = [];
  
  // Find all feature matrices in data
  if (data.matrices && data.matrices.matrix3_featureCentric_v2) {
    const matrix = data.matrices.matrix3_featureCentric_v2;
    
    matrix.sections.forEach(section => {
      section.features.forEach(feature => {
        // For each tool, create a cell key
        data.tools.forEach(tool => {
          const cellKey = `${tool.id}::${feature.id}`;
          cells.push({
            cellKey,
            toolId: tool.id,
            toolName: tool.name,
            featureId: feature.id,
            featureName: feature.name,
            sectionName: section.name
          });
        });
      });
    });
  }
  
  return cells;
}

// Build list of cells for a specific feature
function getFeatureCells(data, featureId) {
  const cells = [];
  
  if (data.matrices && data.matrices.matrix3_featureCentric_v2) {
    const matrix = data.matrices.matrix3_featureCentric_v2;
    
    // Find the feature
    let featureName = '';
    let sectionName = '';
    
    matrix.sections.forEach(section => {
      const feature = section.features.find(f => f.id === featureId);
      if (feature) {
        featureName = feature.name;
        sectionName = section.name;
        
        // For each tool, create a cell key
        data.tools.forEach(tool => {
          const cellKey = `${tool.id}::${feature.id}`;
          cells.push({
            cellKey,
            toolId: tool.id,
            toolName: tool.name,
            featureId: feature.id,
            featureName: feature.name,
            sectionName: section.name
          });
        });
      }
    });
  }
  
  return cells;
}

// Batch verify cells with progress tracking
async function batchVerify(cellsList, data, verificationResults) {
  let successCount = 0;
  let failureCount = 0;
  let skippedCount = 0;
  
  console.log(`\n🚀 Starting batch verification of ${cellsList.length} cells...`);
  console.log(`   Rate: ${config.maxConcurrent} concurrent, ${config.delayBetweenRequests}ms delay\n`);
  
  for (let i = 0; i < cellsList.length; i++) {
    const cellInfo = cellsList[i];
    const cellKey = cellInfo.cellKey;
    
    console.log(`\n[${i + 1}/${cellsList.length}] Processing: ${cellKey}`);
    
    // Check if already verified with evidence
    const existingCell = verificationResults.overrides[cellKey];
    if (existingCell && existingCell.evidence && existingCell.evidence.length > 0) {
      console.log(`   ⏭️  Already verified, skipping...`);
      skippedCount++;
      continue;
    }
    
    if (!existingCell) {
      console.log(`   ⚠️  Cell not found in verification results, skipping...`);
      skippedCount++;
      continue;
    }
    
    const tool = data.tools.find(t => t.id === cellInfo.toolId);
    if (!tool) {
      console.log(`   ⚠️  Tool not found, skipping...`);
      skippedCount++;
      continue;
    }
    
    try {
      const result = await verifyCell(cellKey, existingCell, tool);
      
      if (result) {
        // Update verification results
        verificationResults.overrides[cellKey].evidence = result.evidence;
        verificationResults.overrides[cellKey].confidence = result.confidence;
        verificationResults.overrides[cellKey].verifiedAt = result.verifiedAt;
        
        successCount++;
        
        // Save progress every 5 cells
        if ((i + 1) % 5 === 0) {
          updateAndSaveStats(verificationResults);
          console.log(`   💾 Progress saved (${successCount} verified so far)`);
        }
      } else {
        failureCount++;
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
      failureCount++;
    }
    
    // Delay between requests
    if (i < cellsList.length - 1) {
      await new Promise(resolve => setTimeout(resolve, config.delayBetweenRequests));
    }
  }
  
  // Final save
  updateAndSaveStats(verificationResults);
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 BATCH VERIFICATION COMPLETE`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ Verified: ${successCount}`);
  console.log(`⏭️  Skipped (already verified): ${skippedCount}`);
  console.log(`❌ Failed: ${failureCount}`);
  console.log(`📝 Total: ${cellsList.length}`);
  console.log(`${'='.repeat(60)}\n`);
}

// Update and save stats
function updateAndSaveStats(verificationResults) {
  const cellsWithEvidence = Object.values(verificationResults.overrides)
    .filter(cell => cell.evidence && cell.evidence.length > 0).length;
  verificationResults.stats.cellsWithEvidence = cellsWithEvidence;
  verificationResults.stats.overriddenCells = cellsWithEvidence;
  saveVerificationResults(verificationResults);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (!config.apiKey) {
    console.error('❌ Error: No API key found. Set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable.');
    process.exit(1);
  }
  
  console.log('🤖 Autonomous Verification Agent Starting...');
  console.log(`   Provider: ${config.apiProvider}`);
  console.log(`   Model: ${config.model}`);
  
  // Load data
  const data = loadData();
  const verificationResults = loadVerificationResults();
  
  // Parse command line arguments
  let cellsToVerify = [];
  let batchMode = false;
  
  if (args.includes('--all')) {
    // Verify all cells
    cellsToVerify = getAllCells(data);
    console.log(`\n📋 Mode: Verify ALL cells (${cellsToVerify.length} total)`);
    batchMode = true;
  } else if (args.includes('--feature')) {
    const featureIndex = args.indexOf('--feature');
    const featureId = args[featureIndex + 1];
    cellsToVerify = getFeatureCells(data, featureId);
    console.log(`\n📋 Mode: Verify feature "${featureId}" (${cellsToVerify.length} cells)`);
    batchMode = true;
  } else if (args.includes('--cell')) {
    const cellIndex = args.indexOf('--cell');
    const cellKey = args[cellIndex + 1];
    console.log(`\n📋 Mode: Verify single cell "${cellKey}"`);
    
    const [toolId, featureId] = cellKey.split('::');
    const tool = data.tools.find(t => t.id === toolId);
    
    if (!tool) {
      console.error(`❌ Tool "${toolId}" not found`);
      process.exit(1);
    }
    
    const cellData = verificationResults.overrides[cellKey];
    if (!cellData) {
      console.error(`❌ Cell "${cellKey}" not found in verification results`);
      process.exit(1);
    }
    
    const result = await verifyCell(cellKey, cellData, tool);
    
    if (result) {
      verificationResults.overrides[cellKey].evidence = result.evidence;
      verificationResults.overrides[cellKey].confidence = result.confidence;
      verificationResults.overrides[cellKey].verifiedAt = result.verifiedAt;
      
      updateAndSaveStats(verificationResults);
      console.log('\n✅ Verification complete and saved!');
    } else {
      console.log('\n❌ Verification failed');
      process.exit(1);
    }
    return;
  } else {
    console.log('\nUsage:');
    console.log('  node verification/autonomous-verify.js --cell dreamflow::gh_native');
    console.log('  node verification/autonomous-verify.js --feature gh_native');
    console.log('  node verification/autonomous-verify.js --all');
    process.exit(1);
  }
  
  // Batch mode
  if (batchMode && cellsToVerify.length > 0) {
    await batchVerify(cellsToVerify, data, verificationResults);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { verifyCell, analyzeWithAI };
