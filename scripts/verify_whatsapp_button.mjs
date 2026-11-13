import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';

const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';
const targetUrl = 'http://localhost:8080/projects/candeur-arbora';
const CDP_PORT = 9227;

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

import os from 'os';

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-profile-'));
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
    // Wait until React hydrates and mounts the button
    let hydrated = false;
    for (let i = 0; i < 20; i++) {
      hydrated = await evalJs(`Boolean(document.querySelector('.naani-floating-whatsapp'))`);
      if (hydrated) break;
      await wait(500);
    }
    console.log('React Hydration Status:', hydrated ? '✅ Hydrated' : '⏳ Waiting');
    await wait(500);

    const viewports = [
      { name: 'Mobile-360px', width: 360, height: 740, mobile: true },
      { name: 'Mobile-375px', width: 375, height: 812, mobile: true },
      { name: 'Mobile-390px', width: 390, height: 844, mobile: true },
      { name: 'Mobile-430px', width: 430, height: 932, mobile: true },
      { name: 'Desktop-1440px', width: 1440, height: 900, mobile: false }
    ];

    console.log('\n======================================================');
    console.log('FLOATING WHATSAPP BUTTON QA & POSITIONING AUDIT');
    console.log('======================================================\n');

    for (const vp of viewports) {
      console.log(`--- Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: vp.mobile ? 2 : 1,
        mobile: vp.mobile
      });
      await wait(600);

      const audit = await evalJs(`(() => {
        const btn = document.querySelector('.naani-floating-whatsapp');
        const icon = btn ? btn.querySelector('.naani-whatsapp-icon') : null;
        const bottomBar = document.querySelector('.md\\\\:hidden.fixed.bottom-0');
        
        const scrollWidth = document.documentElement.scrollWidth;
        const clientWidth = document.documentElement.clientWidth;
        const overflow = Math.max(0, scrollWidth - clientWidth);

        if (!btn) {
          return { found: false, overflow };
        }

        const btnRect = btn.getBoundingClientRect();
        const barRect = bottomBar ? bottomBar.getBoundingClientRect() : null;

        // Check if there is overlap with the bottom CTA bar
        let overlapsBar = false;
        let gapAboveBar = null;
        if (barRect) {
          // Bottom bar is at the bottom of the screen
          // The floating button should be above barRect.top
          overlapsBar = btnRect.bottom > barRect.top;
          gapAboveBar = barRect.top - btnRect.bottom;
        }

        const computed = window.getComputedStyle(btn);

        return {
          found: true,
          href: btn.getAttribute('href'),
          target: btn.getAttribute('target'),
          zIndex: computed.zIndex,
          backgroundColor: computed.backgroundColor,
          width: Math.round(btnRect.width),
          height: Math.round(btnRect.height),
          right: Math.round(window.innerWidth - btnRect.right),
          bottom: Math.round(window.innerHeight - btnRect.bottom),
          hasIcon: Boolean(icon),
          iconTagName: icon ? icon.tagName : null,
          hasBottomBar: Boolean(bottomBar),
          barHeight: barRect ? Math.round(barRect.height) : null,
          overlapsBar,
          gapAboveBar: gapAboveBar !== null ? Math.round(gapAboveBar) : null,
          overflow
        };
      })()`);

      console.log('  Button Found:', audit.found ? '✅ YES' : '❌ NO');
      console.log('  Target Href:', audit.href);
      console.log('  Button Size:', `${audit.width}x${audit.height}px`);
      console.log('  Position (right/bottom):', `${audit.right}px / ${audit.bottom}px`);
      console.log('  z-index:', audit.zIndex);
      console.log('  Official Brand Icon Present:', audit.hasIcon ? `✅ YES (${audit.iconTagName})` : '❌ NO');
      if (vp.mobile) {
        console.log('  Bottom Sticky CTA Bar Present:', audit.hasBottomBar ? '✅ YES' : '❌ NO');
        console.log('  Bottom Bar Height:', `${audit.barHeight}px`);
        console.log('  Overlap with Bottom Bar:', audit.overlapsBar ? '❌ OVERLAPS!' : '✅ NONE');
        console.log('  Safety Gap Above Bottom Bar:', `${audit.gapAboveBar}px`);
      }
      console.log('  Horizontal Page Overflow:', `${audit.overflow}px ${audit.overflow === 0 ? '✅ NONE' : '❌ HAS OVERFLOW'}`);

      // Capture screenshot
      const filename = `candeur-arbora-whatsapp-${vp.name.toLowerCase()}.png`;
      await captureScreenshot(filename);
      console.log('');
    }

    ws.close();
    browserProc.kill();
    process.exit(0);
  } catch (err) {
    console.error('QA Error:', err);
    browserProc.kill();
    process.exit(1);
  }
})();
