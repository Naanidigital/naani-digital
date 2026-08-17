import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { createServer } from 'http';

const distDir = path.resolve(process.cwd(), 'dist');

// Simple static server serving dist/ with SPA fallback for test
const server = createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  let filePath = path.join(distDir, reqUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };

  res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
  res.end(fs.readFileSync(filePath));
});

server.listen(4173, async () => {
  console.log('Local test server running on http://localhost:4173');

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  let browserPath = [edgePath, chromePath].find(p => fs.existsSync(p));

  const testPaths = [
    '/projects-in-tellapur',
    '/projects-in-kokapet',
    '/projects-in-gachibowli',
    '/projects-in-kukatpally',
    '/projects-in-manikonda',
    '/projects-in-narsingi',
    '/projects-in-miyapur',
    '/projects-in-bachupally',
    '/prestige-group-projects-hyderabad',
    '/projects/prestige-golden-grove-hyderabad',
    '/'
  ];

  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9223',
    '--no-sandbox',
    '--user-agent=Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (Googlebot/2.1; +http://www.google.com/bot.html)'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const WebSocket = globalThis.WebSocket;

  http.get('http://127.0.0.1:9223/json', (cdpRes) => {
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
        console.log('Connected to local CDP!');
        await send('Page.enable');
        await send('Runtime.enable');

        let failCount = 0;

        for (const p of testPaths) {
          const targetUrl = `http://localhost:4173${p}`;
          console.log(`\n--------------------------------------------------`);
          console.log(`TESTING LOCAL HYDRATED DOM: ${targetUrl}`);
          console.log(`--------------------------------------------------`);

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
            console.error(`  ❌ FAIL: HYDRATED DOM CONTAINS NOINDEX OR NOT FOUND ON ${p}`);
            failCount++;
          } else {
            console.log(`  ✅ PASS: HYDRATED DOM IS INDEXABLE (${robotsMatch ? robotsMatch[1] : 'index,follow'})`);
          }
        }

        browserProc.kill();
        server.close();
        console.log(`\nLOCAL HYDRATION AUDIT COMPLETE: ${failCount === 0 ? 'ALL PASSED' : failCount + ' FAILED'}`);
        process.exit(failCount === 0 ? 0 : 1);
      });
    });
  });
});
