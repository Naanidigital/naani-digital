import { spawn } from 'child_process';
import fs from 'fs';
import http, { createServer } from 'http';
import path from 'path';
import os from 'os';

const distDir = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\dist');
const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const PREVIEW_PORT = 4225;
const CDP_PORT = 9302;
const targetUrl = `http://127.0.0.1:${PREVIEW_PORT}/projects/urbanrise-on-cloud-33-bachupally`;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

// Static server serving dist/
const server = createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  let filePath = path.join(distDir, reqUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

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
      await wait(delay);
    }
  }
  throw new Error(`Failed to connect to CDP endpoint ${endpoint}`);
}

server.listen(PREVIEW_PORT, '127.0.0.1', async () => {
  console.log(`Production dist preview server running on http://127.0.0.1:${PREVIEW_PORT}`);

  let browserProc = null;
  try {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-urbanrise-cloud33-'));
    console.log(`Launching browser on CDP port ${CDP_PORT}...`);
    browserProc = spawn(browserBinary, [
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${tmpDir}`,
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      targetUrl
    ]);

    const pages = await getJsonWithRetry('/json/list');
    const page = pages.find(p => p.type === 'page' && !p.url.startsWith('chrome-extension://')) || pages[0];
    const wsUrl = page.webSocketDebuggerUrl;

    const { WebSocket } = await import('ws').catch(() => ({
      WebSocket: globalThis.WebSocket
    }));

    const ws = new WebSocket(wsUrl);
    let id = 1;
    const pending = new Map();

    ws.on('message', (msg) => {
      const res = JSON.parse(msg.toString());
      if (res.id && pending.has(res.id)) {
        pending.get(res.id)(res);
        pending.delete(res.id);
      }
    });

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        pending.set(curId, (res) => {
          if (res.error) reject(res.error);
          else resolve(res.result);
        });
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await new Promise(r => ws.on('open', r));
    console.log('Connected to CDP via WebSocket');

    await send('Page.enable');
    await send('DOM.enable');

    async function captureScreen(shotPath, width, height, dpr = 1) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: dpr,
        mobile: width <= 768
      });
      await wait(800);
      const { data } = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(shotPath, Buffer.from(data, 'base64'));
      console.log(`Captured screenshot: ${shotPath}`);
    }

    // 1. Desktop 1440px Hero Section
    console.log('Navigating to target URL on Desktop (1440x900)...');
    await send('Page.navigate', { url: targetUrl });
    
    // Poll for React DOM ready
    let loaded = false;
    for (let i = 0; i < 40; i++) {
      const res = await send('Runtime.evaluate', { expression: '!!document.getElementById("enquiry-section")' });
      if (res.result?.value) {
        loaded = true;
        break;
      }
      await wait(300);
    }
    console.log('React component loaded, #enquiry-section ready:', loaded);
    await wait(800);

    const titleRes = await send('Runtime.evaluate', { expression: 'document.title' });
    console.log('Document title:', titleRes.result?.value);

    // 1. Hero
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-hero-1440px.png'), 1440, 900);

    // 2. Moroccan Clubhouse
    await send('Runtime.evaluate', { expression: 'document.getElementById("moroccan-clubhouse")?.scrollIntoView({ block: "start", behavior: "instant" })' });
    await wait(700);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-moroccan-clubhouse.png'), 1440, 900);

    // 3. 70,000 Sft Rooftop Sky Lounges
    await send('Runtime.evaluate', { expression: 'document.getElementById("rooftop-amenities")?.scrollIntoView({ block: "start", behavior: "instant" })' });
    await wait(700);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-rooftop-sky-lounges.png'), 1440, 900);

    // 4. Urbanrise Genius Children Learning Hub
    await send('Runtime.evaluate', { expression: 'document.getElementById("urbanrise-genius")?.scrollIntoView({ block: "start", behavior: "instant" })' });
    await wait(700);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-urbanrise-genius.png'), 1440, 900);

    // 5. Sanctioned Master Plan & 37-Point Legend
    await send('Runtime.evaluate', { expression: 'document.getElementById("master-plan")?.scrollIntoView({ block: "start", behavior: "instant" })' });
    await wait(700);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-master-plan-legend.png'), 1440, 900);

    // 6. 3 & 4 BHK Configurations
    await send('Runtime.evaluate', { expression: 'document.getElementById("configurations")?.scrollIntoView({ block: "start", behavior: "instant" })' });
    await wait(700);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-configurations.png'), 1440, 900);

    // 7. Lightbox Modal Inspection (click expand button in hero)
    await send('Runtime.evaluate', { expression: '(() => { const btn = document.querySelector("button[title=\\"View Fullscreen\\"]"); if (btn) { btn.click(); return true; } return false; })()' });
    await wait(800);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-desktop-lightbox-open.png'), 1440, 900);

    // Close Lightbox
    await send('Runtime.evaluate', { expression: '(() => { const btn = document.querySelector("button[class*=\\"rounded-lg bg-slate-900\\"]"); if (btn) btn.click(); })()' });
    await wait(500);

    // 8. Mobile 390px Hero
    console.log('Switching to Mobile 390x844...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
    await wait(600);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-mobile-hero-390px.png'), 390, 844, 2);

    // 9. Mobile Sticky Bottom Navigation & Floating WhatsApp Clearance
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 600, behavior: "instant" })' });
    await wait(600);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-mobile-bottom-bar-clearance.png'), 390, 844, 2);

    // 10. Mobile 360px Android Viewport
    console.log('Switching to Mobile 360x800...');
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
    await wait(600);
    await captureScreen(path.join(screenshotDir, 'urbanrise-cloud33-mobile-android-360px.png'), 360, 800, 2);

    console.log('All Urbanrise On Cloud 33 verification screenshots captured successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    if (browserProc) {
      browserProc.kill();
    }
    server.close();
    process.exit(0);
  }
});
