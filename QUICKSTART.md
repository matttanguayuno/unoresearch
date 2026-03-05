# Quick Reference - Verification System

## 🚀 Getting Started (3 Steps)

### 1. Start Server
```bash
# The site requires HTTP server (ES modules don't work with file://)
npx http-server -p 8080
# OR
python -m http.server 8080
```
Then open: http://localhost:8080

### 2. Generate Verification Template
```bash
node verification/verify.js
```
Creates `verification_results.json` with 135 baseline entries.

### 3. Add Evidence
Edit `verification_results.json`:
- Find cell by cellKey: `"toolId::featureId"`
- Add evidence objects
- Update confidence level
- Set verifiedAt timestamp

## 📋 Evidence Template

### Web Evidence
```json
{
  "type": "web",
  "title": "Feature Documentation",
  "url": "https://example.com/docs",
  "snippet": "Key finding from the page...",
  "sourceCategory": "official"
}
```

### Video Evidence
```json
{
  "type": "video",
  "title": "Feature Demo",
  "url": "https://youtube.com/watch?v=...",
  "timestamps": ["0:45", "2:30", "5:15"],
  "snippet": "Shows feature at 2:30...",
  "sourceCategory": "third_party"
}
```

## 🔧 Common Tasks

### Add Evidence to a Cell
1. Open `verification_results.json`
2. Find: `"dreamflow::gh_native"` (or your cellKey)
3. Add to `evidence` array:
```json
"evidence": [
  {
    "type": "web",
    "title": "...",
    "url": "...",
    "snippet": "...",
    "sourceCategory": "official"
  }
]
```
4. Update: `"confidence": "high"`
5. Update: `"verifiedAt": "2026-02-05T..."` 
6. Update stats at top: `"cellsWithEvidence": 1`

### Override a Cell Status
```json
"dreamflow::some_feature": {
  "status": "LIMITED",  // Changed from NO
  "note": "Updated finding...",
  "links": ["https://..."],
  "evidence": [{...}],
  "confidence": "high",
  "verifiedAt": "2026-02-05T..."
}
```

### Check Coverage
1. Open site: http://localhost:8080
2. Click **Verification** tab
3. View stats:
   - Total cells: 135
   - Verified cells
   - Cells with evidence
   - Baseline cells

## 🎯 CellKey Format

Pattern: `${toolId}::${featureId}`

**Tool IDs:**
- `dreamflow`
- `lovable`
- `vibecode`
- `builder`
- `bolt`

**Example Feature IDs:**
- `gh_native` - GitHub integration
- `prompt_plaintext` - Plain text prompts
- `visual_sketch` - Sketch/image input
- (See data.js for complete list)

**Example CellKeys:**
- `dreamflow::gh_native`
- `lovable::prompt_plaintext`
- `vibecode::visual_sketch`

## 📊 Confidence Levels

- `"high"` - Strong evidence, multiple sources
- `"medium"` - Good evidence, needs more validation
- `"low"` - Weak evidence, preliminary finding
- `"baseline"` - No additional verification

## 🎨 What You'll See

### With Verification Data:
- 🔍 **Verified** badge in header (green gradient)
- Updated cell data across all tabs
- Verification tab shows stats and evidence
- Console log: "✅ Verification data loaded and applied"

### Without Verification Data:
- No badge in header
- Baseline data shown
- Verification tab shows instructions
- Console log: "ℹ️ No verification data available"

## 📁 File Structure

```
Project Root/
├── index.html              # Main page (5 tabs)
├── styles.css              # All styles
├── app.js                  # Main logic (imports modules)
├── data.js                 # Baseline data (exported)
├── mergeVerification.js    # Override system
├── verification_results.json  # Your overrides
└── verification/
    └── verify.js           # Generator script
```

## 🔍 Debugging

### Check if verification loaded:
Open browser console:
- ✅ Success: "✅ Verification data loaded and applied"
- ⚠️ Not loaded: "ℹ️ No verification data available"

### Common Issues:

**"Module not found"**
→ Must use HTTP server, not file:// protocol

**"Verification data not loading"**
→ Check verification_results.json is valid JSON
→ Check browser console for fetch errors

**"Badge not appearing"**
→ Check if verification_results.json exists
→ Check if it has valid format
→ Refresh page (Ctrl+F5)

## ⚡ Quick Example

Generate and add one evidence entry:

```bash
# 1. Generate template
node verification/verify.js

# 2. Open verification_results.json
# 3. Find "dreamflow::gh_native"
# 4. Replace the evidence array with:
```
```json
"evidence": [
  {
    "type": "web",
    "title": "Git Integration Docs",
    "url": "https://docs.dreamflow.com/integrations/git",
    "snippet": "Full Git support with branching and conflict resolution",
    "sourceCategory": "official"
  }
]
```
```bash
# 5. Update confidence and verifiedAt
# 6. Save and refresh site
# 7. See verification badge ✅
```

## 📚 More Info

- Full documentation: `README.md`
- Implementation details: `IMPLEMENTATION_COMPLETE.md`
- Generator script: `verification/verify.js`
- Merge logic: `mergeVerification.js`

---

**Need help?** Check console logs for errors and refer to README.md for detailed explanations.
