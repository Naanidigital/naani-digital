import { spawn } from 'child_process';
import fs from 'fs';
import http, { createServer } from 'http';
import path from 'path';
import os from 'os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const avifPath = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded/media_1794762728876_40b85879.avif';
const outWebp = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded/media_1794762728876_40b85879.webp';

const server = createServer((req, res) => {
  if (req.url === '/img.avif') {
    res.writeHead(200, { 'Content-Type': 'image/avif' });
    res.end(fs.readFileSync(avifPath));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body style="margin:0;background:#000;">
          <img id="myimg" src="/img.avif" style="display:block;max-width:100%;" />
          <canvas id="cvs" style="display:none;"></canvas>
        </body>
      </html>
    `);
  }
});

server.listen(4230, '127.0.0.1', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-avif-'));
  const browserProc = spawn(browserBinary, [
    '--remote-debugging-port=9310',
    `--user-data-dir=${tmpDir}`,
    '--headless=new',
    'http://127.0.0.1:4230'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const pageList = await fetch('http://127.0.0.1:9310/json/list').then(r => r.json());
  const page = pageList.find(p => p.type === 'page' && !p.url.startsWith('chrome-extension://')) || pageList[0];
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

  await new Promise(r => ws.on('open', r));
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://127.0.0.1:4230' });
  await new Promise(r => setTimeout(r, 1500));

  const evalRes = await send('Runtime.evaluate', {
    expression: `new Promise((resolve) => {
      const img = document.getElementById('myimg');
      const finish = () => {
        const cvs = document.getElementById('cvs');
        cvs.width = img.naturalWidth || 800;
        cvs.height = img.naturalHeight || 600;
        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          dataUrl: cvs.toDataURL('image/webp', 0.92)
        });
      };
      if (img.complete && img.naturalWidth) finish();
      else {
        img.onload = finish;
        img.onerror = (e) => resolve({ error: 'load failed' });
      }
    })`,
    awaitPromise: true,
    returnByValue: true
  });

  console.log('evalRes:', JSON.stringify(evalRes));
  console.log('Image dimensions:', evalRes.result?.value?.width, 'x', evalRes.result?.value?.height);
  const dataUrl = evalRes.result?.value?.dataUrl;
  if (dataUrl) {
    const base64 = dataUrl.split(',')[1];
    fs.writeFileSync(outWebp, Buffer.from(base64, 'base64'));
    console.log('Saved converted WebP to:', outWebp);
  }

  browserProc.kill();
  server.close();
  process.exit(0);
});
