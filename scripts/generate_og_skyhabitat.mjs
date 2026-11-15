import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const outputJpg = path.resolve('public/og-urbanrise-sky-habitat.jpg');
const photoPath = path.resolve('public/assets/urbanrise-sky-habitat/urbanrise-skyhabitat-elevation-day.webp');
const photoBase64 = fs.readFileSync(photoPath).toString('base64');
const photoDataUrl = `data:image/webp;base64,${photoBase64}`;

const CDP_PORT = 9320;

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
  throw new Error(`Failed to connect to CDP endpoint ${endpoint}`);
}

(async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-og-skyhabitat-'));
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
            ctx.fillStyle = '#080C15';
            ctx.fillRect(0, 0, 1200, 630);

            // 2. Draw authentic project render on right side
            const drawW = 760;
            const drawH = 630;
            ctx.save();
            ctx.drawImage(img, 440, 0, drawW, drawH);
            ctx.restore();

            // 3. Seamless gradient overlay from left dark to right transparent
            const grad = ctx.createLinearGradient(0, 0, 1200, 0);
            grad.addColorStop(0, '#080C15');
            grad.addColorStop(0.40, '#080C15');
            grad.addColorStop(0.55, 'rgba(8, 12, 21, 0.88)');
            grad.addColorStop(0.72, 'rgba(8, 12, 21, 0.42)');
            grad.addColorStop(1, 'rgba(8, 12, 21, 0.1)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 1200, 630);

            // Subtle vertical vignettes
            const vTop = ctx.createLinearGradient(0, 0, 0, 140);
            vTop.addColorStop(0, 'rgba(8, 12, 21, 0.7)');
            vTop.addColorStop(1, 'rgba(8, 12, 21, 0)');
            ctx.fillStyle = vTop;
            ctx.fillRect(0, 0, 1200, 140);

            const vBot = ctx.createLinearGradient(0, 480, 0, 630);
            vBot.addColorStop(0, 'rgba(8, 12, 21, 0)');
            vBot.addColorStop(1, 'rgba(8, 12, 21, 0.9)');
            ctx.fillStyle = vBot;
            ctx.fillRect(0, 480, 1200, 150);

            // 4. Amber/Gold Glow on left
            const radialGlow = ctx.createRadialGradient(250, 180, 10, 250, 180, 420);
            radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.15)');
            radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = radialGlow;
            ctx.fillRect(0, 0, 700, 630);

            // 5. Top pill badge
            ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(70, 55, 520, 36, 18);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#FBBF24';
            ctx.font = 'bold 13px sans-serif';
            ctx.fillText('URBANRISE · MIYAPUR – AMEENPUR, HYDERABAD', 90, 78);

            // 6. Project Title: Urbanrise Sky Habitat
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '900 58px sans-serif';
            ctx.fillText('Urbanrise Sky Habitat', 70, 165);

            // 7. Subtitle with amber gradient
            const textGrad = ctx.createLinearGradient(70, 0, 600, 0);
            textGrad.addColorStop(0, '#FCD34D');
            textGrad.addColorStop(1, '#F59E0B');
            ctx.fillStyle = textGrad;
            ctx.font = 'bold 26px sans-serif';
            ctx.fillText('Rise Above the Ordinary. 42 Floors.', 70, 210);

            ctx.fillStyle = '#94A3B8';
            ctx.font = '18px sans-serif';
            ctx.fillText('Luxury 3 & 4 BHK Apartments · 500m Skywalk · Lake Views', 70, 250);

            // 8. Spec Metric Cards
            const metrics = [
              { label: 'TOWERS & HEIGHT', val: '5 Towers · 42 Floors' },
              { label: 'CONFIGURATIONS', val: '3 & 4 BHK (1,333–2,309 Sft)' },
              { label: '500M SKYWALK', val: '15 Sky Lounges & Terraces' },
              { label: 'LIFESTYLE INFRA', val: '~1.7 Lakh Sft Club & Roof' },
            ];

            metrics.forEach((m, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = 70 + col * 260;
              const y = 295 + row * 92;

              ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
              ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.roundRect(x, y, 245, 78, 12);
              ctx.fill();
              ctx.stroke();

              ctx.fillStyle = '#D97706';
              ctx.font = 'bold 11px sans-serif';
              ctx.fillText(m.label, x + 16, y + 26);

              ctx.fillStyle = '#F8FAFC';
              ctx.font = 'bold 17px sans-serif';
              ctx.fillText(m.val, x + 16, y + 54);
            });

            // 9. Bottom Footer Bar
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.fillRect(70, 520, 505, 52);
            ctx.strokeStyle = 'rgba(51, 65, 85, 0.9)';
            ctx.lineWidth = 1;
            ctx.strokeRect(70, 520, 505, 52);

            ctx.fillStyle = '#10B981';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('TG RERA: P01100006655', 88, 552);

            ctx.fillStyle = '#64748B';
            ctx.fillText('|', 260, 552);

            ctx.fillStyle = '#E2E8F0';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('naani.in', 280, 552);

            ctx.fillStyle = '#64748B';
            ctx.fillText('|', 345, 552);

            ctx.fillStyle = '#F59E0B';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText('+91 94939 43946', 365, 552);

            resolve(canvas.toDataURL('image/jpeg', 0.92));
          };
          img.src = '${photoDataUrl}';
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    const dataUrl = res.result?.value;
    if (dataUrl) {
      const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
      fs.writeFileSync(outputJpg, Buffer.from(base64Data, 'base64'));
      console.log('Successfully generated og-urbanrise-sky-habitat.jpg at', outputJpg);
    } else {
      console.error('Failed to get dataUrl from canvas evaluate:', res);
    }

    ws.close();
  } catch (err) {
    console.error('Error generating OG image:', err);
  } finally {
    browserProc.kill();
    process.exit(0);
  }
})();
