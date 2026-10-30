import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const OUT_DIR = path.resolve(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer((req, res) => {
  // Normalize request URL
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Health check endpoints for container/PaaS orchestrators (HCODE, Docker, K8s)
  if (pathname === '/healthz' || pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    });
    const mem = process.memoryUsage();
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'mzansi-midnight',
        uptimeSeconds: Math.floor(process.uptime()),
        memoryRssMb: Math.round(mem.rss / 1024 / 1024),
      })
    );
    return;
  }

  // Security headers for web compliance
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Directory traversal prevention
  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(OUT_DIR, safePath);

  try {
    let stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    }

    // Clean URL check for Next.js exports (e.g. /about -> /about.html)
    if (!stat && !path.extname(filePath)) {
      const htmlCandidate = `${filePath}.html`;
      if (fs.existsSync(htmlCandidate)) {
        filePath = htmlCandidate;
        stat = fs.statSync(filePath);
      }
    }

    // Fallback handling for SPA routes or 404
    if (!stat) {
      const notFoundPath = path.join(OUT_DIR, '404.html');
      if (fs.existsSync(notFoundPath)) {
        filePath = notFoundPath;
        stat = fs.statSync(filePath);
        res.statusCode = 404;
      } else {
        filePath = path.join(OUT_DIR, 'index.html');
        stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
      }
    }

    if (!stat) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found - Build directory out/ is missing. Run npm run build first.');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    // Fine-grained Cache Control
    if (filePath.includes(`${path.sep}_next${path.sep}static`) || ext === '.woff2') {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      res.setHeader('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800');
    } else if (ext === '.html' || ext === '.json' || path.basename(filePath) === 'sw.js') {
      res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }

    // On-the-fly compression for text/code/svg payloads
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const shouldCompress = stat.size > 1024 && /text|javascript|json|xml|svg/i.test(contentType);

    if (shouldCompress && /\bgzip\b/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'gzip');
      res.writeHead(res.statusCode || 200);
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(zlib.createGzip()).pipe(res);
    } else if (shouldCompress && /\bdeflate\b/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'deflate');
      res.writeHead(res.statusCode || 200);
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(zlib.createDeflate()).pipe(res);
    } else {
      res.setHeader('Content-Length', stat.size);
      res.writeHead(res.statusCode || 200);
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (err) {
    console.error('[Mzansi Midnight] Server error handling request:', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('500 Internal Server Error');
    }
  }
});

server.listen(PORT, HOST, () => {
  const mem = Math.round(process.memoryUsage().rss / 1024 / 1024);
  console.log(`[Mzansi Midnight] Production server active on http://${HOST}:${PORT}`);
  console.log(`[Mzansi Midnight] Serving static export from: ${OUT_DIR}`);
  console.log(`[Mzansi Midnight] Active memory RSS: ${mem}MB (ultra-low footprint)`);
});

// Clean shutdown signal handling to prevent zombie processes and port/quota collisions
function handleShutdown(signal) {
  console.log(`[Mzansi Midnight] Received ${signal}, closing HTTP server gracefully...`);
  server.close(() => {
    console.log('[Mzansi Midnight] Server shutdown complete.');
    process.exit(0);
  });
  setTimeout(() => {
    console.warn('[Mzansi Midnight] Forcing process termination after timeout.');
    process.exit(0);
  }, 3000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

