import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const distDir = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\dist');
const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
const PREVIEW_PORT = 4212;
const CDP_PORT = 9292;
const targetUrl = `http://127.0.0.1:${PREVIEW_PORT}/projects/pavani-felicity-nizampet`;
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const server = http.createServer((req, res) => {
  let p = path.join(distDir, req.url.split('?')[0]);
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) p = path.join(distDir, 'index.html');
  const ext = path.extname(p);
  const ct = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.png': 'image/png'
  };
  res.writeHead(200, { 'Content-Type': ct[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(p));
});

async function getJson(endpoint) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${CDP_PORT}${endpoint}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function getJsonWithRetry(endpoint, maxRetries = 25, delay = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getJson(endpoint);
    } catch {
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error(`Failed to connect to CDP endpoint ${endpoint}`);
}

server.listen(PREVIEW_PORT, '127.0.0.1', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-fp4-'));
  const proc = spawn(edgePath, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${tmp}`,
    '--headless=new',
    '--disable-gpu',
    targetUrl
  ]);

  const pages = await getJsonWithRetry('/json/list');
  const p = pages.find(x => x.type === 'page' && !x.url.startsWith('chrome-extension://')) || pages[0];
  const { WebSocket } = await import('ws').catch(() => ({ WebSocket: globalThis.WebSocket }));
  const ws = new WebSocket(p.webSocketDebuggerUrl);
  let id = 1;
  const map = new Map();
  ws.on('message', m => {
    const j = JSON.parse(m.toString());
    if (j.id && map.has(j.id)) {
      map.get(j.id)(j.result);
      map.delete(j.id);
    }
  });

  const send = (method, params = {}) => new Promise((resolve) => {
    const cid = id++;
    map.set(cid, resolve);
    ws.send(JSON.stringify({ id: cid, method, params }));
  });

  await new Promise(r => ws.on('open', r));
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: targetUrl });

  // Poll until #floorplans exists in DOM
  let loaded = false;
  for (let i = 0; i < 30; i++) {
    const res = await send('Runtime.evaluate', { expression: '!!document.getElementById("floorplans")' });
    if (res.result?.value) {
      loaded = true;
      break;
    }
    await new Promise(r => setTimeout(r, 400));
  }
  console.log('Page loaded, #floorplans available:', loaded);
  await new Promise(r => setTimeout(r, 800));

  // Scroll directly to floorplans section
  await send('Runtime.evaluate', { expression: 'document.getElementById("floorplans").scrollIntoView({ block: "start", behavior: "instant" })' });
  await new Promise(r => setTimeout(r, 1000));
  const s1 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotDir, 'pavani-felicity-updated-floorplate-blueprint.png'), Buffer.from(s1.data, 'base64'));
  console.log('Saved floor plate blueprint screenshot');

  // Open Lightbox by clicking the button on the blueprint
  await send('Runtime.evaluate', {
    expression: '(() => { const btn = document.querySelector("#floorplans button[type=\\"button\\"]"); if (btn) { btn.click(); return true; } return false; })()'
  });
  await new Promise(r => setTimeout(r, 1000));
  const s2 = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(screenshotDir, 'pavani-felicity-updated-lightbox-open.png'), Buffer.from(s2.data, 'base64'));
  console.log('Saved lightbox screenshot');

  ws.close();
  proc.kill();
  server.close();
  process.exit(0);
});
