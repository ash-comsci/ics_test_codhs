// Small development server: no package installation required.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = __dirname;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".md": "text/plain", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".mp3": "audio/mpeg", ".wav": "audio/wav", ".ogg": "audio/ogg", ".json": "application/json" };
const server = http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
    catch { res.writeHead(400); res.end("Invalid path"); return; }
    const relative = pathname.replace(/^\/+/, "") || "index.html";
    const target = path.resolve(root, relative);
    // Only serve project files; keep hidden configuration and parent paths private.
    if (!target.startsWith(root + path.sep) || relative.split(/[\\/]/).some(part => part.startsWith("."))) {
        res.writeHead(403); res.end("Not available"); return;
    }
    fs.readFile(target, (error, data) => {
        if (error) { res.writeHead(404); res.end("File not found"); return; }
        res.writeHead(200, { "Content-Type": (types[path.extname(target)] || "application/octet-stream") + (['.html','.css','.js','.md','.json'].includes(path.extname(target)) ? "; charset=utf-8" : ""), "Cache-Control": "no-store" });
        res.end(data);
    });
});
server.on("error", error => { console.error("Could not start the preview:", error.message); process.exitCode = 1; });
server.listen(8000, "0.0.0.0", () => console.log("Target Lab: http://localhost:8000\nCodespaces: open port 8000 from the Ports panel. Ctrl+C stops the preview."));
