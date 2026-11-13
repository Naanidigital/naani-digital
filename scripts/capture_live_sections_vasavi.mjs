import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
const targetUrl = 'https://www.naani.in/projects/vasavi-atlantis';
const CDP_PORT = 9272;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

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

async function getJsonWithRetry(endpoint, maxRetries = 20, delay = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await getJson(endpoint);
    } catch {
      await wait(delay);
    }
  }
  throw new Error(`Failed to connect to CDP endpoint ${endpoint} after ${maxRetries} attempts.`);
}

(async () => {
  let browserProc = null;
  try {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-live-vasavi-sections-'));
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
      console.log(`Saved: ${filename} (${(buffer.length / 1024).toFixed(1)} KB)`);
    }

    await new Promise((resolve) => ws.on('open', resolve));

    await send('Page.enable');
    await send('Runtime.enable');

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // Wait for hydration
    for (let i = 0; i < 20; i++) {
      const ready = await evalJs(`Boolean(document.querySelector('#configurations'))`);
      if (ready) break;
      await wait(500);
    }
    await wait(2000);

    // 1. Architecture section
    await evalJs(`window.scrollTo(0, 950)`);
    await wait(800);
    await captureScreenshot('vasavi-atlantis-live-architecture.png');

    // 2. Configurations section
    await evalJs(`document.querySelector('#configurations')?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await wait(800);
    await captureScreenshot('vasavi-atlantis-live-configurations.png');

    // 3. Amenities section
    await evalJs(`document.querySelector('#amenities')?.scrollIntoView({ behavior: 'instant', block: 'start' })`);
    await wait(800);
    await captureScreenshot('vasavi-atlantis-live-amenities.png');

    // 4. Advisory section
    await evalJs(`document.querySelector('#advisory')?.scrollIntoView({ behavior: 'instant', block: 'start' }); window.scrollBy(0, -60);`);
    await wait(800);
    await captureScreenshot('vasavi-atlantis-live-advisory.png');

    console.log('Section screenshots captured.');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browserProc) {
      try { browserProc.kill(); } catch {}
    }
    process.exit(0);
  }
})();
