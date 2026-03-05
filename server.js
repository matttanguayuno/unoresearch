import { createServer } from 'http';
import { readFile, writeFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const COLLAB_FILE = process.env.COLLAB_DATA_PATH || join(__dirname, 'collab-data.json');

// ---- Collab data persistence ----
const EMPTY_COLLAB = { votes: {}, comments: {}, suggestions: [] };

function loadCollab() {
  try {
    if (existsSync(COLLAB_FILE)) {
      return JSON.parse(readFileSync(COLLAB_FILE, 'utf8'));
    }
  } catch { /* ignore corrupt file */ }
  return structuredClone(EMPTY_COLLAB);
}

let collabData = loadCollab();

async function saveCollab() {
  await writeFile(COLLAB_FILE, JSON.stringify(collabData, null, 2), 'utf8');
}

// ---- Helpers ----
function jsonResponse(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e6) reject(new Error('too large')); });
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(new Error('invalid json')); } });
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ---- MIME types ----
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip'
};

// ---- Server ----
const server = createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // ---- API routes ----
  if (url === '/api/collab' && req.method === 'GET') {
    return jsonResponse(res, 200, collabData);
  }

  if (url === '/api/vote' && req.method === 'POST') {
    try {
      const { featureId, author, direction } = await parseBody(req);
      if (!featureId || !author || !['up', 'down'].includes(direction)) {
        return jsonResponse(res, 400, { error: 'featureId, author, direction (up|down) required' });
      }
      if (!collabData.votes[featureId]) collabData.votes[featureId] = { up: [], down: [] };
      const bucket = collabData.votes[featureId];
      const opposite = direction === 'up' ? 'down' : 'up';

      // Remove from opposite if present
      bucket[opposite] = bucket[opposite].filter(n => n !== author);

      // Toggle in current direction
      const idx = bucket[direction].indexOf(author);
      if (idx >= 0) {
        bucket[direction].splice(idx, 1); // un-vote
      } else {
        bucket[direction].push(author);
      }

      await saveCollab();
      return jsonResponse(res, 200, { votes: collabData.votes[featureId] });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  if (url === '/api/comment' && req.method === 'POST') {
    try {
      const { featureId, author, text } = await parseBody(req);
      if (!featureId || !author || !text) {
        return jsonResponse(res, 400, { error: 'featureId, author, text required' });
      }
      if (!collabData.comments[featureId]) collabData.comments[featureId] = [];
      const comment = { id: generateId(), author, text, timestamp: new Date().toISOString() };
      collabData.comments[featureId].push(comment);
      await saveCollab();
      return jsonResponse(res, 200, { comment });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  if (url === '/api/comment' && req.method === 'DELETE') {
    try {
      const { featureId, commentId } = await parseBody(req);
      if (!featureId || !commentId) {
        return jsonResponse(res, 400, { error: 'featureId, commentId required' });
      }
      if (collabData.comments[featureId]) {
        collabData.comments[featureId] = collabData.comments[featureId].filter(c => c.id !== commentId);
      }
      await saveCollab();
      return jsonResponse(res, 200, { ok: true });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  if (url === '/api/reset' && req.method === 'POST') {
    collabData = structuredClone(EMPTY_COLLAB);
    await saveCollab();
    return jsonResponse(res, 200, { ok: true });
  }

  if (url === '/api/suggest' && req.method === 'POST') {
    try {
      const { categoryId, name, note, author } = await parseBody(req);
      if (!categoryId || !name || !author) {
        return jsonResponse(res, 400, { error: 'categoryId, name, author required' });
      }
      const suggestion = { id: generateId(), categoryId, name, note: note || '', author, timestamp: new Date().toISOString() };
      collabData.suggestions.push(suggestion);
      await saveCollab();
      return jsonResponse(res, 200, { suggestion });
    } catch (e) {
      return jsonResponse(res, 400, { error: e.message });
    }
  }

  // ---- Static file serving ----
  let filePath = url === '/' ? '/index.html' : url;
  filePath = decodeURIComponent(filePath);
  const ext = extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  try {
    const content = await readFile(join(__dirname, filePath));
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
