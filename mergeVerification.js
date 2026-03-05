/**
 * mergeVerification.js
 * 
 * Applies verification results (overrides) to the base data object.
 * Uses cellKey pattern: ${toolId}::${featureId}
 * 
 * Evidence schema:
 * {
 *   type: "web" | "video",
 *   title: string,
 *   url: string,
 *   timestamps?: string[], // For video evidence: ["0:00", "2:35", "5:12"]
 *   snippet?: string,
 *   sourceCategory: "official" | "third_party"
 * }
 */

/**
 * Deep clone an object using structuredClone or fallback to JSON
 */
function deepClone(obj) {
  if (typeof structuredClone !== 'undefined') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Apply verification overrides to base data
 * @param {Object} baseData - The original data object from data.js
 * @param {Object} verificationResults - The verification_results.json content
 * @returns {Object} - Merged data with verification metadata
 */
function applyVerification(baseData, verificationResults) {
  // Deep clone the base data so we don't mutate the original
  const mergedData = deepClone(baseData);
  
  if (!verificationResults || !verificationResults.overrides) {
    console.warn('No verification overrides found');
    return mergedData;
  }
  
  const { overrides } = verificationResults;
  let appliedCount = 0;
  
  // Walk through all matrices and apply overrides
  const matrices = mergedData.matrices;
  
  // Matrix 3: Feature-centric (primary matrix)
  if (matrices.matrix3_featureCentric_v2) {
    matrices.matrix3_featureCentric_v2.sections.forEach(section => {
      section.features.forEach(feature => {
        Object.keys(feature.cells).forEach(toolId => {
          const cellKey = `${toolId}::${feature.id}`;
          const override = overrides[cellKey];
          
          // Only apply verification if there's actual evidence or meaningful changes
          if (override && override.evidence && override.evidence.length > 0) {
            const cell = feature.cells[toolId];
            
            // Apply overrides
            if (override.status !== undefined) cell.status = override.status;
            if (override.note !== undefined) cell.note = override.note;
            if (override.links !== undefined) cell.links = override.links;
            
            // Add verification metadata (only for cells with evidence)
            cell.verification = {
              state: 'verified',
              confidence: override.confidence || 'baseline',
              verifiedAt: override.verifiedAt || null
            };
            
            // Add evidence
            cell.evidence = override.evidence;
            
            appliedCount++;
          }
          // Skip cells without evidence (they remain baseline)
        });
      });
    });
  }
  
  // Matrix 1: GitHub features by tool (if it exists)
  if (matrices.matrix1_github_byTool && matrices.matrix1_github_byTool.tools) {
    matrices.matrix1_github_byTool.tools.forEach(tool => {
      if (tool.features) {
        tool.features.forEach(feature => {
          const cellKey = `${tool.id}::${feature.id}`;
          const override = overrides[cellKey];
          
          if (override) {
            if (override.status !== undefined) feature.status = override.status;
            if (override.note !== undefined) feature.note = override.note;
            if (override.links !== undefined) feature.links = override.links;
            
            feature.verification = {
              state: 'verified',
              confidence: override.confidence || 'baseline',
              verifiedAt: override.verifiedAt || null
            };
            
            if (override.evidence && override.evidence.length > 0) {
              feature.evidence = override.evidence;
            }
            
            appliedCount++;
          }
          // Don't add verification metadata to baseline cells
        });
      }
    });
  }
  
  // Matrix 2: Prompt input features by tool (if it exists)
  if (matrices.matrix2_promptInput_expanded_byTool && matrices.matrix2_promptInput_expanded_byTool.tools) {
    matrices.matrix2_promptInput_expanded_byTool.tools.forEach(tool => {
      if (tool.features) {
        tool.features.forEach(feature => {
          const cellKey = `${tool.id}::${feature.id}`;
          const override = overrides[cellKey];
          
          if (override) {
            if (override.status !== undefined) feature.status = override.status;
            if (override.note !== undefined) feature.note = override.note;
            if (override.links !== undefined) feature.links = override.links;
            
            feature.verification = {
              state: 'verified',
              confidence: override.confidence || 'baseline',
              verifiedAt: override.verifiedAt || null
            };
            
            if (override.evidence && override.evidence.length > 0) {
              feature.evidence = override.evidence;
            }
            
            appliedCount++;
          }
          // Don't add verification metadata to baseline cells
        });
      }
    });
  }
  
  console.log(`Applied ${appliedCount} verification overrides`);
  
  return mergedData;
}
