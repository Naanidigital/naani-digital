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

const PREVIEW_PORT = 4182;
const CDP_PORT = 9265;
const targetUrl = `http://127.0.0.1:${PREVIEW_PORT}/projects/pavani-starlit-miyapur`;

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
  throw new Error(`Failed to connect to CDP endpoint ${endpoint} after ${maxRetries} attempts.`);
}

server.listen(PREVIEW_PORT, '127.0.0.1', async () => {
  console.log(`Production dist preview server running on http://127.0.0.1:${PREVIEW_PORT}`);

  let browserProc = null;
  try {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-pavani-images-'));
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

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', {
        expression: expr,
        returnByValue: true
      });
      return res.result ? res.result.value : undefined;
    }

    async function captureScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(res.data, 'base64');
      const fullPath = path.join(screenshotDir, filename);
      fs.writeFileSync(fullPath, buffer);
      console.log(`Screenshot saved: ${fullPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    }

    await new Promise((resolve) => ws.on('open', resolve));

    await send('Page.enable');
    await send('Runtime.enable');

    console.log(`Waiting for page hydration on ${targetUrl}...`);
    for (let i = 0; i < 20; i++) {
      const hydrated = await evalJs(`Boolean(document.querySelector('h1'))`);
      if (hydrated) break;
      await wait(500);
    }
    await wait(2000);

    const title = await evalJs(`document.title`);
    const h1 = await evalJs(`document.querySelector('h1')?.innerText`);
    const imgCount = await evalJs(`document.querySelectorAll('img[src*="pavani-starlit"]').length`);
    const imagesLoaded = await evalJs(`Array.from(document.querySelectorAll('img[src*="pavani-starlit"]')).map(i => ({ src: i.src.split('/').pop().slice(0, 35), complete: i.complete, naturalWidth: i.naturalWidth }))`);
    const floatingWa = await evalJs(`Boolean(document.querySelector('.naani-floating-whatsapp'))`);

    console.log('\n--- VERIFICATION RESULTS ---');
    console.log('Title:', title);
    console.log('H1:', h1);
    console.log('Pavani Starlit Image Elements Rendered:', imgCount);
    console.log('Images Loaded Status:', JSON.stringify(imagesLoaded, null, 2));
    console.log('Floating WhatsApp Present:', floatingWa);

    // 1. Desktop 1440px Hero with Interactive Visual Switcher
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await evalJs(`window.scrollTo(0, 0)`);
    await wait(1200);
    await captureScreenshot('pavani-starlit-preview-desktop-1440px.png');

    // 2. Overview with 3D Township Aerial View
    await evalJs(`document.querySelector('#overview')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -60);`);
    await wait(800);
    await captureScreenshot('pavani-starlit-desktop-overview.png');

    // 3. Configurations with Sanctioned Master Blueprint Feature
    await evalJs(`document.querySelector('#configurations')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -60);`);
    await wait(800);
    await captureScreenshot('pavani-starlit-desktop-blueprint.png');

    // 4. Amenities with Signature 45,000+ Sft Clubhouse Feature
    await evalJs(`document.querySelector('#amenities')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -60);`);
    await wait(800);
    await captureScreenshot('pavani-starlit-desktop-amenities.png');

    // 5. Project Gallery & Architectural Showcase
    await evalJs(`document.querySelector('#gallery')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -60);`);
    await wait(800);
    await captureScreenshot('pavani-starlit-desktop-gallery.png');

    // 6. Test Lightbox Open (Click on the first gallery card)
    await evalJs(`document.querySelectorAll('#gallery [class*="cursor-pointer"]')[0]?.click();`);
    await wait(1200);
    await captureScreenshot('pavani-starlit-desktop-lightbox.png');

    // Close Lightbox
    await evalJs(`document.querySelector('button[aria-label="Close image"]')?.click();`);
    await wait(500);

    // 7. Mobile 390px (iPhone 14/15)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(`window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;`);
    await wait(1500);
    await captureScreenshot('pavani-starlit-preview-mobile-390px.png');

    // Mobile bottom bar & floating button clearance
    await evalJs(`window.scrollTo(0, 700)`);
    await wait(800);
    await captureScreenshot('pavani-starlit-preview-mobile-bottom-bar.png');

    // 8. Mobile 360px (Compact Android)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 740,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(`window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;`);
    await wait(1500);
    await captureScreenshot('pavani-starlit-preview-mobile-360px.png');

    console.log('\nAll verification screenshots captured successfully.');
    ws.close();
  } catch (err) {
    console.error('Error during preview verification:', err);
  } finally {
    if (browserProc) {
      try { browserProc.kill(); } catch {}
    }
    server.close();
    process.exit(0);
  }
});
