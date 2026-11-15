import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import os from 'os';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserBinary = fs.existsSync(edgePath) ? edgePath : chromePath;

const outputJpg = path.resolve('C:\\Users\\PC\\Desktop\\naani-main\\naani-main\\public\\og-pavani-felicity.jpg');
const CDP_PORT = 9289;

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
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-og-felicity-'));
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
          const canvas = document.createElement('canvas');
          canvas.width = 1200;
          canvas.height = 630;
          const ctx = canvas.getContext('2d');

          // Dark luxury background gradient
          const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
          bgGrad.addColorStop(0, '#090D16');
          bgGrad.addColorStop(0.5, '#0B1120');
          bgGrad.addColorStop(1, '#080C14');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, 1200, 630);

          // Golden radial glow
          const radialGlow = ctx.createRadialGradient(950, 200, 20, 950, 200, 450);
          radialGlow.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
          radialGlow.addColorStop(0.6, 'rgba(245, 158, 11, 0.04)');
          radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = radialGlow;
          ctx.fillRect(0, 0, 1200, 630);

          // Grid decorative lines
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
          ctx.lineWidth = 1;
          for (let x = 60; x < 1200; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 630);
            ctx.stroke();
          }
          for (let y = 60; y < 630; y += 100) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(1200, y);
            ctx.stroke();
          }

          // Top pill badge: Sai Sravanthi Infra Projects · Nizampet
          ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(80, 70, 560, 42, 21);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#FBBF24';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('PAVANI INFRA · SAI SRAVANTHI · NIZAMPET, HYDERABAD', 105, 97);

          // Project Title: Pavani Felicity
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '900 68px sans-serif';
          ctx.fillText('Pavani Felicity', 80, 195);

          // Subtitle
          const textGrad = ctx.createLinearGradient(80, 0, 600, 0);
          textGrad.addColorStop(0, '#FCD34D');
          textGrad.addColorStop(1, '#F59E0B');
          ctx.fillStyle = textGrad;
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText('Premium 3 BHK High-Rise Residences', 80, 250);

          ctx.fillStyle = '#94A3B8';
          ctx.font = '22px sans-serif';
          ctx.fillText('Single 23-Floor Tower · Opposite Sapthapadi Convention · Adjacent to Hill County', 80, 295);

          // 4 Metric cards
          const metrics = [
            { label: 'LAND FOOTPRINT', val: '~2.5 Acres' },
            { label: 'TOWER HEIGHT', val: '2C + Stilt + 23 Floors' },
            { label: 'EXCLUSIVE FORMAT', val: 'Spacious 3 BHK' },
            { label: 'UNIT SIZES', val: '1,561 – 2,514 Sft' },
          ];

          metrics.forEach((m, i) => {
            const x = 80 + i * 260;
            const y = 350;
            ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(x, y, 240, 100, 14);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#94A3B8';
            ctx.font = 'bold 12px sans-serif';
            ctx.fillText(m.label, x + 18, y + 34);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(m.val, x + 18, y + 72);
          });

          // Bottom Bar
          ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(80, 490, 1040, 75, 16);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#10B981';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText('✓ TG RERA REGISTERED: P02200005477', 110, 535);

          ctx.fillStyle = '#F59E0B';
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText('Naani Projects · www.naani.in', 800, 535);

          const jpegData = canvas.toDataURL('image/jpeg', 0.92);
          resolve(jpegData.split(',')[1]);
        })
      `,
      awaitPromise: true,
      returnByValue: true
    });

    if (res.result && res.result.value) {
      fs.writeFileSync(outputJpg, Buffer.from(res.result.value, 'base64'));
      console.log('Successfully generated public/og-pavani-felicity.jpg!');
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
