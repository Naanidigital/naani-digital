import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const outputJpg = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\public\\og-pavani-felicity.jpg');
const photoPath = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\public\\assets\\pavani-felicity\\pavani-felicity-elevation-day.webp');
const photoBase64 = fs.readFileSync(photoPath).toString('base64');
const photoDataUrl = `data:image/webp;base64,${photoBase64}`;

const CDP_PORT = 9292;

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
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-og-photo-'));
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

    const res = await send('Runtime.evaluate', {
      expression: `
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 630;
            const ctx = canvas.getContext('2d');

            // 1. Dark luxury background
            ctx.fillStyle = '#090D16';
            ctx.fillRect(0, 0, 1200, 630);

            // 2. Draw authentic project render on right side (with cover-like crop)
            // Render width: 680, height: 630 on right side
            const imgAspect = img.width / img.height;
            const drawW = 720;
            const drawH = 630;
            ctx.save();
            ctx.drawImage(img, 480, 0, drawW, drawH);
            ctx.restore();

            // 3. Seamless gradient overlay from left dark to right transparent
            const grad = ctx.createLinearGradient(0, 0, 1200, 0);
            grad.addColorStop(0, '#090D16');
            grad.addColorStop(0.42, '#090D16');
            grad.addColorStop(0.55, 'rgba(9, 13, 22, 0.88)');
            grad.addColorStop(0.72, 'rgba(9, 13, 22, 0.45)');
            grad.addColorStop(1, 'rgba(9, 13, 22, 0.15)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1200, 630);

            // Subtle vertical top/bottom vignettes
            const vTop = ctx.createLinearGradient(0, 0, 0, 140);
            vTop.addColorStop(0, 'rgba(9, 13, 22, 0.7)');
            vTop.addColorStop(1, 'rgba(9, 13, 22, 0)');
            ctx.fillStyle = vTop;
            ctx.fillRect(0, 0, 1200, 140);

            const vBot = ctx.createLinearGradient(0, 480, 0, 630);
            vBot.addColorStop(0, 'rgba(9, 13, 22, 0)');
            vBot.addColorStop(1, 'rgba(9, 13, 22, 0.85)');
            ctx.fillStyle = vBot;
            ctx.fillRect(0, 480, 1200, 150);

            // 4. Amber Glow on left
            const radialGlow = ctx.createRadialGradient(250, 180, 10, 250, 180, 400);
            radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
            radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = radialGlow;
            ctx.fillRect(0, 0, 700, 630);

            // 5. Top pill badge: Sai Sravanthi Infra Projects · Nizampet
            ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(70, 60, 520, 38, 19);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#FBBF24';
            ctx.font = 'bold 14px sans-serif';
            ctx.fillText('PAVANI INFRA · SAI SRAVANTHI · NIZAMPET, HYDERABAD', 92, 84);

            // 6. Project Title: Pavani Felicity
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '900 64px sans-serif';
            ctx.fillText('Pavani Felicity', 70, 175);

            // 7. Subtitle with amber gradient
            const textGrad = ctx.createLinearGradient(70, 0, 550, 0);
            textGrad.addColorStop(0, '#FCD34D');
            textGrad.addColorStop(1, '#F59E0B');
            ctx.fillStyle = textGrad;
            ctx.font = 'bold 30px sans-serif';
            ctx.fillText('Premium 3 BHK High-Rise Residences', 70, 225);

            ctx.fillStyle = '#94A3B8';
            ctx.font = '19px sans-serif';
            ctx.fillText('Opposite Sapthapadi Convention · Adjacent to Hill County', 70, 265);

            // 8. Spec Metric Cards
            const metrics = [
              { label: 'TOWER HEIGHT', val: '23 Storeys' },
              { label: 'EXCLUSIVE FORMAT', val: '3 BHK Only' },
              { label: 'SIZE SPECTRUM', val: '1,561 – 2,514 Sft' },
              { label: 'LAND FOOTPRINT', val: '~2.5 Acres' },
            ];

            metrics.forEach((m, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = 70 + col * 230;
              const y = 305 + row * 95;

              ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
              ctx.strokeStyle = 'rgba(51, 65, 85, 0.85)';
              ctx.lineWidth = 1.5;
              ctx.beginPath();
              ctx.roundRect(x, y, 215, 80, 12);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = '#94A3B8';
              ctx.font = 'bold 11px sans-serif';
              ctx.fillText(m.label, x + 16, y + 28);

              ctx.fillStyle = '#FFFFFF';
              ctx.font = 'bold 18px sans-serif';
              ctx.fillText(m.val, x + 16, y + 58);
            });

            // 9. Bottom Bar
            ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(70, 510, 1060, 68, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#10B981';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText('✓ TG RERA REGISTERED: P02200005477', 95, 551);

            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText('Naani Projects · www.naani.in', 840, 551);

            const jpegData = canvas.toDataURL('image/jpeg', 0.94);
            resolve(jpegData.split(',')[1]);
          };
          img.src = '${photoDataUrl}';
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    if (res.result && res.result.value) {
      fs.writeFileSync(outputJpg, Buffer.from(res.result.value, 'base64'));
      console.log('Successfully generated public/og-pavani-felicity.jpg with authentic project photo! Size:', (fs.statSync(outputJpg).size / 1024).toFixed(1) + ' KB');
    } else {
      console.error('Failed to generate:', res);
    }
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    browserProc.kill();
  }
})();
