import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
const targetUrl = 'https://www.naani.in/projects/candeur-arbora';
const CDP_PORT = 9228;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-live-profile-'));
const browserProc = spawn(browserBinary, [
  `--remote-debugging-port=${CDP_PORT}`,
  `--user-data-dir=${tmpDir}`,
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  targetUrl
]);

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

(async () => {
  try {
    await wait(3000);
    const pages = await getJson('/json/list');
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

    await new Promise((r) => ws.on('open', r));

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    async function evalJs(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      return res.result?.result?.value;
    }

    async function captureScreenshot(filename) {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      if (res.result?.data) {
        const buf = Buffer.from(res.result.data, 'base64');
        const outPath = path.join(screenshotDir, filename);
        fs.writeFileSync(outPath, buf);
        console.log(`Saved live screenshot: ${filename}`);
      }
    }

    await send('Page.enable');
    
    // Wait until React hydrates
    for (let i = 0; i < 20; i++) {
      const ready = await evalJs(`Boolean(document.querySelector('.naani-floating-whatsapp'))`);
      if (ready) break;
      await wait(500);
    }
    await wait(1000);

    const viewports = [
      { name: 'Mobile-360px', width: 360, height: 740, mobile: true },
      { name: 'Mobile-375px', width: 375, height: 812, mobile: true },
      { name: 'Mobile-390px', width: 390, height: 844, mobile: true },
      { name: 'Mobile-430px', width: 430, height: 932, mobile: true },
      { name: 'Desktop-1440px', width: 1440, height: 900, mobile: false }
    ];

    console.log('\nCapturing Live Production Screenshots from https://www.naani.in/projects/candeur-arbora...');

    for (const vp of viewports) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile
      });
      await wait(600);
      const filename = `candeur-arbora-live-${vp.name.toLowerCase()}.png`;
      await captureScreenshot(filename);
    }

    console.log('All live production screenshots captured successfully.');
    ws.close();
    browserProc.kill();
    process.exit(0);
  } catch (err) {
    console.error('Live screenshot error:', err);
    browserProc.kill();
    process.exit(1);
  }
})();
