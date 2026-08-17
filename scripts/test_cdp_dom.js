const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');

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
  console.log('Launching browser:', browserPath);
  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--no-sandbox',
    '--user-agent=Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (Googlebot/2.1; +http://www.google.com/bot.html)'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  // Get WebSocket module from node_modules if present or load native WebSocket
  let WebSocket;
  try {
    WebSocket = require('ws');
  } catch (e) {
    // If ws is not in root node_modules, global WebSocket in Node 22+ works
    WebSocket = globalThis.WebSocket;
  }

  if (!WebSocket) {
    console.error('No WebSocket available');
    browserProc.kill();
    return;
  }

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
              if (ws.removeEventListener) ws.removeEventListener('message', handler);
              else if (ws.removeListener) ws.removeListener('message', handler);
              resolve(msg.result);
            }
          };
          if (ws.addEventListener) ws.addEventListener('message', handler);
          else if (ws.on) ws.on('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      }

      const onOpen = async () => {
        console.log('Connected to CDP via WebSocket!');
        await send('Page.enable');
        await send('Runtime.enable');

        for (const targetUrl of testUrls) {
          console.log(`\n==================================================`);
          console.log(`TESTING HYDRATED DOM: ${targetUrl}`);
          console.log(`==================================================`);

          await send('Page.navigate', { url: targetUrl });
          // Wait 5 seconds for React JS hydration and Supabase async calls
          await new Promise(r => setTimeout(r, 5000));

          const evalRes = await send('Runtime.evaluate', {
            expression: `
              (() => {
                const robotsMetas = Array.from(document.querySelectorAll('meta[name="robots"]')).map(m => m.outerHTML);
                const allMetas = Array.from(document.querySelectorAll('meta')).map(m => ({ name: m.getAttribute('name'), property: m.getAttribute('property'), content: m.getAttribute('content') }));
                const containsNoIndex = document.head.innerHTML.toLowerCase().includes('noindex');
                return {
                  url: window.location.href,
                  title: document.title,
                  robotsMetas,
                  containsNoIndex,
                  headHtmlLength: document.head.innerHTML.length
                };
              })()
            `,
            returnByValue: true
          });

          console.log('HYDRATED DOM RESULT:', JSON.stringify(evalRes ? evalRes.value : null, null, 2));
        }

        browserProc.kill();
        process.exit(0);
      };

      if (ws.addEventListener) ws.addEventListener('open', onOpen);
      else if (ws.on) ws.on('open', onOpen);
    });
  });
}

main();
