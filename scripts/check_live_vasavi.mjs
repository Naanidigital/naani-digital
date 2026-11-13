import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import os from 'os';

const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const targetUrl = 'https://www.naani.in/projects/vasavi-atlantis';
const CDP_PORT = 9270;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function fetchLiveHtml() {
  return new Promise((resolve) => {
    https.get(targetUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', (err) => resolve({ status: 500, error: err.message }));
  });
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
  console.log(`Polling production URL: ${targetUrl} for deployment update...`);
  
  let deployed = false;
  for (let attempt = 1; attempt <= 30; attempt++) {
    const res = await fetchLiveHtml();
    if (res.status === 200 && res.data && res.data.includes('Vasavi Atlantis') && res.data.includes('P02400003398')) {
      console.log(`Deployment detected on attempt ${attempt}! Production is live.`);
      deployed = true;
      break;
    }
    console.log(`Attempt ${attempt}: Status ${res.status}. Waiting 5s for Vercel deployment...`);
    await wait(5000);
  }

  if (!deployed) {
    console.log('Timeout waiting for deployment marker in HTML. Proceeding to inspect with live browser...');
  }

  let browserProc = null;
  try {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-live-vasavi-'));
    console.log(`Launching browser for live production verification on CDP port ${CDP_PORT}...`);
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

    console.log(`Waiting for live page hydration on ${targetUrl}...`);
    for (let i = 0; i < 20; i++) {
      const hydrated = await evalJs(`Boolean(document.querySelector('h1'))`);
      if (hydrated) break;
      await wait(500);
    }
    await wait(2000);

    const title = await evalJs(`document.title`);
    const h1 = await evalJs(`document.querySelector('h1')?.innerText`);
    const waButton = await evalJs(`Boolean(document.querySelector('.naani-floating-whatsapp'))`);
    const phoneLinks = await evalJs(`Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => a.href)`);

    console.log('\n--- LIVE PRODUCTION VERIFICATION RESULTS ---');
    console.log('Title:', title);
    console.log('H1:', h1);
    console.log('Floating WhatsApp Present:', waButton);
    console.log('Phone Links:', phoneLinks);

    // Desktop 1440px
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await evalJs(`window.scrollTo(0, 0)`);
    await wait(1200);
    await captureScreenshot('vasavi-atlantis-live-desktop-1440px.png');

    // Mobile 390px (iPhone 14/15)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(`window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;`);
    await wait(1500);
    await captureScreenshot('vasavi-atlantis-live-mobile-390px.png');

    // Mobile 360px (Android)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 740,
      deviceScaleFactor: 2,
      mobile: true
    });
    await evalJs(`window.scrollTo(0, 0); document.documentElement.scrollTop = 0; document.body.scrollTop = 0;`);
    await wait(1500);
    await captureScreenshot('vasavi-atlantis-live-mobile-360px.png');

    console.log('\nLive production screenshots captured successfully.');
    ws.close();
  } catch (err) {
    console.error('Error during live production check:', err);
  } finally {
    if (browserProc) {
      try { browserProc.kill(); } catch {}
    }
    process.exit(0);
  }
})();

