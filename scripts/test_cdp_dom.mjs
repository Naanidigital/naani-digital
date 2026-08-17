import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let browserPath = [edgePath, chromePath].find(p => fs.existsSync(p));

const testUrls = [
  'https://www.naani.in/projects-in-tellapur',
  'https://www.naani.in/projects-in-kokapet',
  'https://www.naani.in/projects-in-gachibowli',
  'https://www.naani.in/projects/prestige-golden-grove-hyderabad',
  'https://www.naani.in/prestige-group-projects-hyderabad',
  'https://www.naani.in/'
];

async function main() {
  // Kill any hanging headless Edge browser processes
  try {
    const { execSync } = await import('child_process');
    execSync('taskkill /F /IM msedge.exe /T 2>NUL');
  } catch (e) {}

  console.log('Launching browser:', browserPath);
  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--user-agent=Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (Googlebot/2.1; +http://www.google.com/bot.html)'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const WebSocket = globalThis.WebSocket;

  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', async () => {
      const pages = JSON.parse(data);
      const page = pages.find(p => p.type === 'page');
      if (!page) {
        console.error('No page tab found in CDP');
        browserProc.kill();
        return;
      }

      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let msgId = 1;

      function send(method, params = {}) {
        return new Promise((resolve) => {
          const id = msgId++;
          const handler = (event) => {
            const rawData = typeof event === 'string' ? event : (event.data || event);
            const msg = JSON.parse(rawData);
            if (msg.id === id) {
              ws.removeEventListener('message', handler);
              resolve(msg.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      }

      ws.addEventListener('open', async () => {
        console.log('Connected to CDP via WebSocket!');
        await send('Page.enable');
        await send('Runtime.enable');

        for (const targetUrl of testUrls) {
          console.log(`\n==================================================`);
          console.log(`TESTING HYDRATED DOM: ${targetUrl}`);
          console.log(`==================================================`);

          await send('Page.navigate', { url: targetUrl });
          await new Promise(r => setTimeout(r, 4000));

          const resHead = await send('Runtime.evaluate', {
            expression: 'document.head.innerHTML',
            returnByValue: true
          });

          const headHtml = resHead && resHead.result ? resHead.result.value : '';
          const containsNoIndex = headHtml.toLowerCase().includes('noindex');
          const robotsMatch = headHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);

          console.log('  Hydrated Title:', headHtml.match(/<title[^>]*>(.*?)<\/title>/i)?.[1]);
          console.log('  Hydrated Meta Robots:', robotsMatch ? robotsMatch[1] : 'NONE FOUND');
          console.log('  Contains NoIndex:', containsNoIndex);
          if (containsNoIndex) {
            console.log('  [WARNING] NOINDEX DETECTED IN HYDRATED DOM!');
            const snippet = headHtml.slice(Math.max(0, headHtml.toLowerCase().indexOf('noindex') - 100), headHtml.toLowerCase().indexOf('noindex') + 100);
            console.log('  Snippet:', snippet);
          }
        }

        browserProc.kill();
        process.exit(0);
      });
    });
  });
}

main();
