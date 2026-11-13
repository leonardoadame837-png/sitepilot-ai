import test from "node:test";
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, resolvePublicPath } from "../server.js";

test("public path resolver rejects traversal and malformed encodings", () => {
  const root = fileURLToPath(new URL("../src/", import.meta.url));
  assert.equal(resolvePublicPath(root, "/index.html"), resolve(root, "index.html"));
  assert.equal(resolvePublicPath(root, "/%2e%2e/server.js"), null);
  assert.equal(resolvePublicPath(root, "/%E0%A4%A"), null);
});

test("HTTP server exposes health and static content with security headers", async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const base = `http://127.0.0.1:${server.address().port}`;

  const health = await fetch(`${base}/health`);
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok", service: "sitepilot-ai" });
  assert.equal(health.headers.get("x-content-type-options"), "nosniff");
  assert.equal(health.headers.get("x-frame-options"), "DENY");
  assert.match(health.headers.get("content-security-policy"), /default-src 'self'/);

  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(home.headers.get("content-type"), /text\/html/);

  const data = await fetch(`${base}/data/sample-project.json`);
  assert.equal(data.status, 200);
  assert.equal((await data.json()).project.id, "SP-DEMO-001");
});

test("HTTP server rejects unsupported methods and does not serve files outside public roots", async (t) => {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const base = `http://127.0.0.1:${server.address().port}`;
  const post = await fetch(`${base}/health`, { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("allow"), "GET, HEAD");

  const missing = await fetch(`${base}/data/%2e%2e/server.js`);
  assert.equal(missing.status, 404);
});
