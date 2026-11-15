import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const inputWebp = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\src\\assets\\pavani-starlit\\pavani-starlit-elevation.webp');
const outputJpg = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\public\\og-pavani-starlit.jpg');
const CDP_PORT = 9285;

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
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-img-convert-'));
  const browserProc = spawn(browserBinary, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${tmpDir}`,
    '--headless=new',
    '--disable-gpu',
    'about:blank'
  ]);

  try {
    const pages = await getJsonWithRetry('/json/list');
    const page = pages[0];
    const wsUrl = page.webSocketDebuggerUrl;

    const { WebSocket } = await import('ws').catch(() => ({ WebSocket: globalThis.WebSocket }));
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

    await new Promise((resolve) => ws.on('open', resolve));
    await send('Page.enable');
    await send('Runtime.enable');

    const fileBase64 = fs.readFileSync(inputWebp).toString('base64');
    const dataUri = `data:image/webp;base64,${fileBase64}`;

    const res = await send('Runtime.evaluate', {
      expression: `
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            const jpegData = canvas.toDataURL('image/jpeg', 0.92);
            resolve(jpegData.split(',')[1]);
          };
          img.src = "${dataUri}";
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    if (res.result && res.result.value) {
      fs.writeFileSync(outputJpg, Buffer.from(res.result.value, 'base64'));
      console.log('Successfully generated public/og-pavani-starlit.jpg from genuine elevation image!');
    } else {
      console.error('Failed to convert:', res);
    }
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    browserProc.kill();
  }
})();
