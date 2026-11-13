import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, relative, resolve, sep, isAbsolute } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT_DIR = resolve(fileURLToPath(new URL(".", import.meta.url)));
const PORT = Number(process.env.PORT || 8001);
// Bind to loopback by default. Set HOST explicitly only when remote access is intended.
const HOST = process.env.HOST || "127.0.0.1";
const SRC_DIR = resolve(ROOT_DIR, "src");
const DATA_DIR = resolve(ROOT_DIR, "data");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
  "Cache-Control": "no-store"
};

/**
 * Resolve a URL path beneath an explicitly allowed public root.
 * Returns null for malformed encodings and paths that escape the root.
 */
export function resolvePublicPath(root, requestPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(String(requestPath).split("?")[0]);
  } catch {
    return null;
  }

  const target = resolve(root, `.${decoded.startsWith("/") ? decoded : `/${decoded}`}`);
  const relativePath = relative(resolve(root), target);
  if (
    relativePath === ".." ||
    relativePath.startsWith(`..${sep}`) ||
    isAbsolute(relativePath)
  ) {
    return null;
  }
  return target;
}

function send(res, status, contentType, body = "") {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(res.req?.method === "HEAD" ? undefined : body);
}

async function serveFile(req, res, filePath) {
  try {
    const body = await readFile(filePath);
    const type = MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
    send(res, 200, type, body);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") return false;
    throw error;
  }
}

export function createServer() {
  return http.createServer(async (req, res) => {
    res.req = req;
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      res.setHeader(name, value);
    }

    try {
      if (req.method !== "GET" && req.method !== "HEAD") {
        res.setHeader("Allow", "GET, HEAD");
        send(res, 405, "application/json; charset=utf-8", JSON.stringify({ error: "Method not allowed" }));
        return;
      }

      const url = new URL(req.url || "/", "http://localhost");

      if (url.pathname === "/health") {
        send(res, 200, "application/json; charset=utf-8", JSON.stringify({
          status: "ok",
          service: "sitepilot-ai"
        }));
        return;
      }

      if (url.pathname.startsWith("/data/")) {
        const filePath = resolvePublicPath(DATA_DIR, url.pathname.slice("/data/".length));
        if (filePath && await serveFile(req, res, filePath)) return;
        send(res, 404, "application/json; charset=utf-8", JSON.stringify({ error: "Data file not found" }));
        return;
      }

      const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
      const filePath = resolvePublicPath(SRC_DIR, requestedPath);
      if (filePath && await serveFile(req, res, filePath)) return;

      send(res, 404, "text/plain; charset=utf-8", "Not found");
    } catch (error) {
      // Do not return internal paths or stack traces to clients.
      console.error("Request failed:", error);
      if (!res.headersSent) {
        send(res, 500, "text/plain; charset=utf-8", "Internal server error");
      } else {
        res.destroy();
      }
    }
  });
}

const isDirectExecution = process.argv[1]
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectExecution) {
  const server = createServer();
  server.listen(PORT, HOST, () => {
    console.log(`SitePilot AI listening on http://${HOST}:${PORT}`);
  });
}
