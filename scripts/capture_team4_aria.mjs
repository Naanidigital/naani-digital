import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
const targetUrl = 'https://www.naani.in/projects/team4-aria-miyapur-luxury-apartments-hyderabad';
const CDP_PORT = 9229;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-team4-'));
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
        console.log(`Saved screenshot: ${filename}`);
      }
    }

    await send('Page.enable');
    await wait(2000);

    // Desktop 1440px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    // Scroll to where configurations is
    await evalJs(`document.querySelectorAll('section')[2]?.scrollIntoView()`);
    await wait(800);
    await captureScreenshot('team4-aria-live-desktop-configurations.png');

    // Mobile 390px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(`document.querySelectorAll('section')[2]?.scrollIntoView()`);
    await wait(800);
    await captureScreenshot('team4-aria-live-mobile-configurations.png');

    console.log('Team4 Aria screenshots captured successfully.');
    ws.close();
    browserProc.kill();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    browserProc.kill();
    process.exit(1);
  }
})();

