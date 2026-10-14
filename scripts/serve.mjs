import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const host = '127.0.0.1';
const port = Number(process.env.PORT ?? process.argv[2] ?? 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Porten skal være et heltal mellem 1 og 65535.');
  process.exit(1);
}

const distRoot = await realpath(fileURLToPath(new URL('../dist/', import.meta.url)));
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function insideRoot(path) {
  return path.startsWith(`${distRoot}${sep}`);
}

function reply(response, code, body) {
  response.writeHead(code, {
    'Content-Type': 'text/plain; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Cache-Control': 'no-store',
  });
  response.end(body);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    reply(response, 405, 'Metoden understøttes ikke.');
    return;
  }

  let pathname;
  try {
    const rawPath = request.url?.split(/[?#]/u)[0];
    if (!rawPath?.startsWith('/')) throw new Error('Ugyldig URL');
    pathname = decodeURIComponent(rawPath);
    if (pathname.includes('\\') || pathname.includes('\0') || pathname.includes(':')
      || pathname.split('/').some(segment => segment === '..' || segment === '.')) {
      reply(response, 403, 'Denne sti er ikke tilladt.');
      return;
    }
  } catch {
    reply(response, 400, 'Ugyldig URL.');
    return;
  }

  const requestedFile = resolve(distRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!insideRoot(requestedFile)) {
    reply(response, 403, 'Denne sti er ikke tilladt.');
    return;
  }

  try {
    const actualFile = await realpath(requestedFile);
    if (!insideRoot(actualFile)) {
      reply(response, 403, 'Denne sti er ikke tilladt.');
      return;
    }
    const fileInfo = await stat(actualFile);
    if (!fileInfo.isFile()) {
      reply(response, 404, 'Filen blev ikke fundet.');
      return;
    }
    const bytes = request.method === 'HEAD' ? null : await readFile(actualFile);
    response.writeHead(200, {
      'Content-Type': mimeTypes[extname(actualFile).toLowerCase()] ?? 'application/octet-stream',
      'Content-Length': fileInfo.size,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store',
    });
    response.end(bytes);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') {
      reply(response, 404, 'Filen blev ikke fundet.');
    } else if (error.code === 'EACCES' || error.code === 'EPERM' || error.code === 'ELOOP') {
      reply(response, 403, 'Filen kan ikke åbnes.');
    } else {
      console.error(error);
      reply(response, 500, 'Der opstod en serverfejl.');
    }
  }
});

server.on('error', error => {
  console.error(`Serveren kunne ikke starte: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, host, () => {
  console.log(`Hvad nu?\nLocal: http://${host}:${port}\nStop med Ctrl+C.`);
});

let closing = false;
function shutdown() {
  if (closing) return;
  closing = true;
  server.close(() => {
    process.exitCode = 0;
  });
  const timeout = setTimeout(() => {
    server.closeAllConnections();
  }, 2000);
  timeout.unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
