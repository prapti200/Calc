/* ==========================================================================
   CALC• MODERN CALCULATOR - SPA HTTP SERVER (Browser Router Support)
   Provides static file serving and SPA fallback to index.html for all routes.
   ========================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(reqUrl.pathname);

    // Default to index.html for root
    if (pathname === '/') {
      pathname = '/index.html';
    }

    const safePath = path.normalize(path.join(ROOT, pathname));

    // Security check: prevent directory traversal
    if (!safePath.startsWith(ROOT)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      return res.end('403 Forbidden');
    }

    fs.stat(safePath, (err, stats) => {
      if (!err && stats.isFile()) {
        // Physical file exists -> serve directly with correct MIME
        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': 'no-cache'
        });
        fs.createReadStream(safePath).pipe(res);
      } else {
        // SPA Fallback: Any route without a physical file is rewritten to index.html
        const indexPath = path.join(ROOT, 'index.html');
        fs.readFile(indexPath, (readErr, content) => {
          if (readErr) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('500 Internal Server Error: index.html not found');
          }
          res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'no-cache'
          });
          res.end(content);
        });
      }
    });
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`[CALC• Modern Calculator SPA Server] Running on http://localhost:${PORT}/ with full Browser Router support`);
});
