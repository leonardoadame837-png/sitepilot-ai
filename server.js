import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = resolve(fileURLToPath(new URL(".", import.meta.url)));
const PORT = Number(process.env.PORT || 8001);
const HOST = process.env.HOST || "0.0.0.0";
const SRC_DIR = join(__dirname, "src");
const DATA_DIR = join(__dirname, "data");

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

function safePath(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split("?")[0]);
  const relative = decoded.replace(/^\/+/, "");
  const target = normalize(join(root, relative));
  return target.startsWith(root) ? target : null;
}

async function serveFile(res, filePath) {
  try {
    const body = await readFile(filePath);
    const type = MIME_TYPES[extname(filePath).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
    res.end(body);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/health") {
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ status: "ok", service: "sitepilot-ai", timestamp: new Date().toISOString() }));
      return;
    }

    if (url.pathname.startsWith("/data/")) {
      const filePath = safePath(DATA_DIR, url.pathname.slice("/data/".length));
      if (filePath && await serveFile(res, filePath)) return;
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "Data file not found" }));
      return;
    }

    const requested = url.pathname === "/" ? "/index.html" : url.pathname;
    const filePath = safePath(SRC_DIR, requested);

    if (filePath && await serveFile(res, filePath)) return;

    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal server error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`SitePilot AI running on http://${HOST}:${PORT}`);
});
