#!/usr/bin/env node
// ── generate-zips.js ──
// Pre-generates static ZIP files of screenshots.
// Run: node generate-zips.js
// Output: downloads/*.zip

import { createWriteStream, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOWNLOADS_DIR = join(__dirname, 'downloads');
const SCREENSHOTS_DIR = join(__dirname, 'screenshots');
const AGENT_UI_DIR = join(__dirname, 'AI Agent UI');

// ── Load data (eval since they're browser globals, not ESM) ──
import { readFileSync } from 'fs';

function loadGlobal(file) {
  const code = readFileSync(join(__dirname, file), 'utf-8');
  // We'll eval it and extract the variable
  return code;
}

// Parse data.js
const dataCode = loadGlobal('data.js');
const dataFn = new Function(dataCode + '\nreturn data;');
const data = dataFn();

// Parse agent-ux-data.js
const uxCode = loadGlobal('agent-ux-data.js');
const uxFn = new Function(uxCode + '\nreturn { AGENT_UX_TOOLS, AGENT_UX_FEATURES, AGENT_UX_MATRIX };');
const { AGENT_UX_TOOLS, AGENT_UX_FEATURES, AGENT_UX_MATRIX } = uxFn();

// ── Helpers ──

function sanitize(name) {
  return name.replace(/[<>:"/\\|?*]+/g, '-').replace(/\s+/g, ' ').trim();
}

function createZip(outputPath) {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 5 } });

    output.on('close', () => resolve(archive.pointer()));
    archive.on('error', reject);
    archive.on('warning', (err) => {
      if (err.code !== 'ENOENT') throw err;
      console.warn('  ⚠️ ', err.message);
    });
    archive.pipe(output);

    return { archive, done: () => { archive.finalize(); return new Promise((res, rej) => { output.on('close', () => res(archive.pointer())); archive.on('error', rej); }); } };
  });
}

// ── Collectors ──

function collectFeatureMapBySection() {
  const items = [];
  const matrix = data.matrices.matrix3_featureCentric_v2;
  for (const section of matrix.sections) {
    const sectionName = sanitize(section.name);
    for (const feature of section.features) {
      const featureName = sanitize(feature.name);
      for (const tool of data.tools) {
        const cell = feature.cells[tool.id];
        if (!cell || !cell.screenshots || !cell.screenshots.length) continue;
        for (const filename of cell.screenshots) {
          const filePath = join(SCREENSHOTS_DIR, filename);
          if (existsSync(filePath)) {
            items.push({
              zipPath: sectionName + '/' + featureName + '/' + sanitize(tool.name) + ' - ' + filename,
              filePath
            });
          } else {
            console.warn(`  ⚠️ Missing: ${filePath}`);
          }
        }
      }
    }
  }
  return items;
}

function collectFeatureMapByTool() {
  const items = [];
  const matrix = data.matrices.matrix3_featureCentric_v2;
  for (const section of matrix.sections) {
    for (const feature of section.features) {
      const featureName = sanitize(feature.name);
      for (const tool of data.tools) {
        const cell = feature.cells[tool.id];
        if (!cell || !cell.screenshots || !cell.screenshots.length) continue;
        const toolName = sanitize(tool.name);
        for (const filename of cell.screenshots) {
          const filePath = join(SCREENSHOTS_DIR, filename);
          if (existsSync(filePath)) {
            items.push({
              zipPath: toolName + '/' + featureName + ' - ' + filename,
              filePath
            });
          }
        }
      }
    }
  }
  return items;
}

function collectAgentUxByTool() {
  const items = [];
  for (const tool of AGENT_UX_TOOLS) {
    const toolData = AGENT_UX_MATRIX[tool.id];
    if (!toolData) continue;
    const toolName = sanitize(tool.name);
    for (const feature of AGENT_UX_FEATURES) {
      const cell = toolData[feature.id];
      if (!cell || !cell.screenshots || !cell.screenshots.length) continue;
      const featureName = sanitize(feature.name);
      for (const filename of cell.screenshots) {
        const filePath = join(AGENT_UI_DIR, tool.id, filename);
        if (existsSync(filePath)) {
          items.push({
            zipPath: toolName + '/' + featureName + '/' + filename,
            filePath
          });
        } else {
          console.warn(`  ⚠️ Missing: ${filePath}`);
        }
      }
    }
  }
  return items;
}

function collectAgentUxByFeature() {
  const items = [];
  for (const feature of AGENT_UX_FEATURES) {
    const featureName = sanitize(feature.name);
    for (const tool of AGENT_UX_TOOLS) {
      const toolData = AGENT_UX_MATRIX[tool.id];
      if (!toolData) continue;
      const cell = toolData[feature.id];
      if (!cell || !cell.screenshots || !cell.screenshots.length) continue;
      const toolName = sanitize(tool.name);
      for (const filename of cell.screenshots) {
        const filePath = join(AGENT_UI_DIR, tool.id, filename);
        if (existsSync(filePath)) {
          items.push({
            zipPath: featureName + '/' + toolName + '/' + filename,
            filePath
          });
        }
      }
    }
  }
  return items;
}

// ── Build ZIPs ──

async function buildZip(name, items) {
  const outPath = join(DOWNLOADS_DIR, name);
  console.log(`\n📦 ${name} — ${items.length} files`);

  if (!items.length) {
    console.log('  (no files, skipping)');
    return;
  }

  const output = createWriteStream(outPath);
  const archive = archiver('zip', { zlib: { level: 5 } });

  const done = new Promise((res, rej) => {
    output.on('close', () => res(archive.pointer()));
    archive.on('error', rej);
    archive.on('warning', (err) => {
      if (err.code !== 'ENOENT') throw err;
      console.warn('  ⚠️ ', err.message);
    });
  });

  archive.pipe(output);

  for (const item of items) {
    archive.file(item.filePath, { name: item.zipPath });
  }

  archive.finalize();
  const bytes = await done;
  const mb = (bytes / 1024 / 1024).toFixed(1);
  console.log(`  ✅ ${mb} MB`);
}

async function main() {
  console.log('=== Generating screenshot ZIPs ===\n');

  // Ensure output dir exists
  if (!existsSync(DOWNLOADS_DIR)) mkdirSync(DOWNLOADS_DIR);

  // 1. Feature Map — by section
  const fmBySection = collectFeatureMapBySection();
  await buildZip('feature-map-screenshots.zip', fmBySection);

  // 2. Feature Map — by tool
  const fmByTool = collectFeatureMapByTool();
  await buildZip('by-tool-screenshots.zip', fmByTool);

  // 3. Agent UX — by tool
  const uxByTool = collectAgentUxByTool();
  await buildZip('agent-ux-by-tool-screenshots.zip', uxByTool);

  // 4. Agent UX — by feature
  const uxByFeature = collectAgentUxByFeature();
  await buildZip('agent-ux-by-feature-screenshots.zip', uxByFeature);

  // 5. All combined
  const allItems = [
    ...fmBySection.map(i => ({ ...i, zipPath: 'Feature Map/' + i.zipPath })),
    ...uxByTool.map(i => ({ ...i, zipPath: 'Agent UX/' + i.zipPath })),
  ];
  await buildZip('all-screenshots.zip', allItems);

  console.log('\n✅ All ZIPs generated in downloads/');
}

main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
