import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';

const testUrls = [
  'https://www.naani.in/projects-in-manikonda',
  'https://www.naani.in/projects-in-kukatpally',
  'https://www.naani.in/vessella-group-projects-hyderabad',
  'https://www.naani.in/projects-in-tukkuguda',
  'https://www.naani.in/candeur-constructions-projects-hyderabad',
  'https://www.naani.in/projects-in-nallagandla',
  'https://www.naani.in/projects-in-shaikpet',
  'https://www.naani.in/projects-in-bachupally',
  'https://www.naani.in/aparna-constructions-projects-hyderabad',
  'https://www.naani.in/projects-in-miyapur',
  'https://www.naani.in/my-home-group-projects-hyderabad',
  'https://www.naani.in/projects-in-tellapur'
];

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
let browserPath = [edgePath, chromePath].find(p => fs.existsSync(p));

console.log('Launching browser:', browserPath);

const browserProc = spawn(browserPath, [
  '--headless=new',
  '--disable-gpu',
  '--remote-debugging-port=9226',
  '--no-sandbox',
  '--user-agent=Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (Googlebot/2.1; +http://www.google.com/bot.html)'
]);

setTimeout(async () => {
  const WebSocket = globalThis.WebSocket;

  http.get('http://127.0.0.1:9226/json', (cdpRes) => {
    let data = '';
    cdpRes.on('data', c => data += c);
    cdpRes.on('end', async () => {
      const pages = JSON.parse(data);
      const page = pages.find(p => p.type === 'page');
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

        let failCount = 0;

        for (const targetUrl of testUrls) {
          console.log(`\n==================================================`);
          console.log(`TESTING HYDRATED DOM: ${targetUrl}`);
          console.log(`==================================================`);

          await send('Page.navigate', { url: targetUrl });
          await new Promise(r => setTimeout(r, 3500));

          const resHead = await send('Runtime.evaluate', {
            expression: 'document.head.innerHTML',
            returnByValue: true
          });

          const headHtml = resHead && resHead.result ? resHead.result.value : '';
          const containsNoIndex = headHtml.toLowerCase().includes('noindex');
          const titleMatch = headHtml.match(/<title[^>]*>(.*?)<\/title>/i);
          const robotsMatch = headHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);

          console.log('  Hydrated Title:', titleMatch ? titleMatch[1] : 'NONE');
          console.log('  Hydrated Meta Robots:', robotsMatch ? robotsMatch[1] : 'NONE FOUND');
          console.log('  Contains NoIndex:', containsNoIndex);

          if (containsNoIndex || (titleMatch && titleMatch[1].includes('Page Not Found'))) {
            console.error(`  ❌ FAIL: NOINDEX / NOT FOUND DETECTED IN HYDRATED DOM ON ${targetUrl}!`);
            failCount++;
          } else {
            console.log(`  ✅ PASS: INDEXABLE ON ${targetUrl}`);
          }
        }

        browserProc.kill();
        process.exit(failCount === 0 ? 0 : 1);
      });
    });
  });
}, 2000);
