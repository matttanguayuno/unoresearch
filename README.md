# Uno Studio Live - AI App Builders Research

Interactive competitive analysis briefing site with evidence-based verification system.

## Features

### 4 Primary Tabs
1. **Overview** - Tool cards and opportunity highlights
2. **By Feature** - Feature-centric matrix with search and filtering
3. **By Tool** - Tool profiles with feature summaries
4. **Uno vs Competitors** - Comparison cards and missed opportunities
5. **Verification** - Evidence tracking and verification status

### Verification System

The site includes a comprehensive verification system that allows you to override baseline data with evidence-backed findings.

#### Architecture

- **ESM Modules**: Uses modern JavaScript modules for better code organization
- **data.js**: Exported data module with all baseline research
- **mergeVerification.js**: Deep-clones and applies verification overrides
- **verification_results.json**: Contains overrides with evidence
- **cellKey Pattern**: Uses `${toolId}::${featureId}` for universal cell identity

#### Evidence Schema

Each cell can have multiple evidence objects:

```json
{
  "type": "web",
  "title": "Official Documentation: Feature X",
  "url": "https://example.com/docs/feature-x",
  "snippet": "Confirms that Feature X is supported with...",
  "sourceCategory": "official"
}
```

For video evidence with timestamps:

```json
{
  "type": "video",
  "title": "Tutorial: Using Feature Y",
  "url": "https://youtube.com/watch?v=...",
  "timestamps": ["0:00", "2:35", "5:12"],
  "snippet": "Demonstrates Feature Y at 2:35 showing...",
  "sourceCategory": "third_party"
}
```

## Getting Started

### 1. Serve the Site

The site uses ES modules which require an HTTP server (not file:// protocol):

**Using Node.js:**
```bash
npx http-server -p 8080
```

**Using Python:**
```bash
python -m http.server 8080
```

**Using PowerShell:**
```powershell
# See scripts/serve.ps1 for a full HTTP server implementation
```

Then open http://localhost:8080

### 2. Generate Verification Template

```bash
node verification/verify.js
```

This creates `verification_results.json` with baseline entries for all cells.

### 3. Add Evidence

Edit `verification_results.json` to:
- Update status/note fields where verification differs from baseline
- Add evidence objects with sources (web or video)
- Set confidence levels: `high`, `medium`, `low`, or `baseline`
- Add timestamps for video evidence

### 4. View Verification

Refresh the site. You'll see:
- 🔍 **Verified** badge in header (when verification data is loaded)
- Updated cell data across all tabs
- **Verification tab** with coverage stats and evidence tracking

## File Structure

```
├── index.html              # Main HTML with 5 tabs
├── styles.css              # Complete styling including verification UI
├── app.js                  # Main application logic
├── data.js                 # Exported baseline data module
├── mergeVerification.js    # Verification overlay system
├── verification_results.json # Override data (generated, then edited)
├── verification/
│   └── verify.js           # Node.js script to generate template
└── images/                 # Tool screenshots
```

## Verification Workflow

1. **Baseline Data**: All research starts in `data.js`
2. **Generate Template**: Run `node verification/verify.js`
3. **Add Evidence**: Edit `verification_results.json` manually or via automation
4. **Apply Overrides**: Site loads and merges verification data at runtime
5. **Track Coverage**: Use Verification tab to monitor progress

## Evidence Types

### Web Evidence
- Official documentation
- Third-party reviews
- Blog posts
- Community discussions

### Video Evidence
- Product demos
- Tutorial walkthroughs
- Conference talks
- Screen recordings

Include timestamps for video evidence to pinpoint specific features.

## Future Enhancements

The verification system is designed to support:
- Automated web search for evidence gathering
- Video transcript analysis for timestamp extraction
- Confidence scoring based on evidence quality
- Multi-source triangulation
- Automated re-verification on schedule

## Development

### Adding New Features to Matrix

1. Update `data.js` with new feature data
2. Regenerate verification template: `node verification/verify.js`
3. Add evidence for new features
4. Site automatically includes new features across all views

### Modifying Verification Logic

Edit `mergeVerification.js` to change how overrides are applied. The `applyVerification` function walks all matrices and applies cellKey-based overrides.

## Tools Reviewed

- **Dreamflow** - GitHub-native IDE for web apps
- **Lovable (GPT Engineer)** - Two-way GitHub sync builder
- **Vibecode** - Export/SSH workflow tool
- **Builder.io** - PR-based repo-connected builder
- **Bolt.new (StackBlitz)** - WebContainer-based instant environment

## Brand Colors

- Blue: `#6489FF`
- Violet: `#8C00B8`
- Green: `#8AE9A3`
- Rose: `#E15A7B`
- Cyan: `#C8E5E1`

## License

Internal research document for Uno Studio Live.
