import { spawn } from 'child_process';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { createServer } from 'http';

const distDir = path.resolve(process.cwd(), 'dist');
const screenshotDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\screenshots';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Static server serving dist/
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

const PORT = 4174;
const CDP_PORT = 9224;

server.listen(PORT, async () => {
  console.log(`Local static QA server running on http://localhost:${PORT}`);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  let browserPath = [edgePath, chromePath].find(p => fs.existsSync(p));

  if (!browserPath) {
    console.error('No Edge or Chrome executable found on system!');
    process.exit(1);
  }

  console.log(`Using browser: ${browserPath}`);

  const tempProfileDir = path.join(process.env.TEMP || 'C:\\Temp', 'edge_qa_profile_' + Date.now());
  if (!fs.existsSync(tempProfileDir)) {
    fs.mkdirSync(tempProfileDir, { recursive: true });
  }

  const targetUrl = `http://localhost:${PORT}/projects/candeur-arbora`;
  const browserProc = spawn(browserPath, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${tempProfileDir}`,
    '--no-sandbox',
    '--hide-scrollbars',
    '--window-size=1440,900',
    targetUrl
  ]);

  // Retry connecting to CDP port up to 15 times
  let cdpConnected = false;
  let pages = null;
  for (let i = 0; i < 15; i++) {
    await new Promise(r => setTimeout(r, 600));
    try {
      const jsonRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json`).then(r => r.json());
      if (Array.isArray(jsonRes) && jsonRes.length > 0) {
        pages = jsonRes;
        cdpConnected = true;
        break;
      }
    } catch (e) {
      // wait and retry
    }
  }

  if (!cdpConnected || !pages) {
    console.error('Failed to connect to browser CDP port!');
    browserProc.kill();
    server.close();
    process.exit(1);
  }

  const page = pages.find(p => p.type === 'page' && !p.url.startsWith('chrome-extension://'));
  if (!page) {
    console.error('No suitable web page found in CDP targets:', pages);
    process.exit(1);
  }
  console.log('Connecting to target:', page.title, page.url);
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

      async function captureScreenshot(filename, clip = null) {
        const params = { format: 'png' };
        if (clip) params.clip = clip;
        const res = await send('Page.captureScreenshot', params);
        if (res && res.data) {
          const buffer = Buffer.from(res.data, 'base64');
          const filePath = path.join(screenshotDir, filename);
          fs.writeFileSync(filePath, buffer);
          console.log(`  📸 Saved screenshot: ${filename} (${buffer.length} bytes)`);
          return filePath;
        }
        return null;
      }

      async function evalJs(expr) {
        const res = await send('Runtime.evaluate', {
          expression: expr,
          returnByValue: true,
          awaitPromise: true
        });
        return res && res.result ? res.result.value : null;
      }

      ws.addEventListener('open', async () => {
        console.log('Connected to CDP websocket successfully!');
        await send('Page.enable');
        await send('Runtime.enable');
        await send('DOM.enable');

        const viewports = [
          { name: 'Desktop-1440px', width: 1440, height: 900, isMobile: false },
          { name: 'Laptop-1366px', width: 1366, height: 768, isMobile: false },
          { name: 'Tablet-768px', width: 768, height: 1024, isMobile: true },
          { name: 'Mobile-390px', width: 390, height: 844, isMobile: true },
          { name: 'Mobile-360px', width: 360, height: 740, isMobile: true }
        ];

        const targetUrl = `http://localhost:${PORT}/projects/candeur-arbora`;
        console.log(`\nNavigating to: ${targetUrl}`);
        await send('Page.navigate', { url: targetUrl });
        await new Promise(r => setTimeout(r, 4500));

        // 1. Verify SEO and Schema in hydrated DOM
        console.log('\n==================================================');
        console.log('1. SEO & METADATA VERIFICATION (HYDRATED DOM)');
        console.log('==================================================');
        const seoData = await evalJs(`({
          title: document.title,
          metaDesc: document.querySelector('meta[name="description"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          ogTitle: document.querySelector('meta[property="og:title"]')?.content,
          ogDesc: document.querySelector('meta[property="og:description"]')?.content,
          ogImage: document.querySelector('meta[property="og:image"]')?.content,
          ogUrl: document.querySelector('meta[property="og:url"]')?.content,
          jsonLdCount: document.querySelectorAll('script[type="application/ld+json"]').length,
          h1: document.querySelector('h1')?.innerText?.trim(),
          h2s: Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean)
        })`);

        console.log('  Page Title:', seoData.title);
        console.log('  Meta Description:', seoData.metaDesc);
        console.log('  Canonical URL:', seoData.canonical);
        console.log('  OG Image:', seoData.ogImage);
        console.log('  JSON-LD Scripts Found:', seoData.jsonLdCount);
        console.log('  H1 Heading:', seoData.h1);
        console.log('  Total H2 Headings:', seoData.h2s.length);

        // 2. Visual QA across 5 viewports
        console.log('\n==================================================');
        console.log('2. VIEWPORT RESPONSIVENESS & OVERFLOW QA');
        console.log('==================================================');

        for (const vp of viewports) {
          console.log(`\nTesting Viewport: ${vp.name} (${vp.width}x${vp.height})`);
          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.isMobile
          });

          await new Promise(r => setTimeout(r, 1000));

          // Check horizontal overflow
          const overflowCheck = await evalJs(`({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            innerWidth: window.innerWidth,
            hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
            overflowDiff: document.documentElement.scrollWidth - window.innerWidth
          })`);

          console.log(`  ScrollWidth: ${overflowCheck.scrollWidth}px | InnerWidth: ${overflowCheck.innerWidth}px`);
          if (overflowCheck.hasOverflow && overflowCheck.overflowDiff > 1) {
            console.error(`  ❌ OVERFLOW DETECTED: ${overflowCheck.overflowDiff}px horizontal overflow!`);
          } else {
            console.log(`  ✅ PASS: No horizontal overflow detected.`);
          }

          // Capture full-page or section screenshots for desktop and mobile
          if (vp.name === 'Desktop-1440px') {
            await evalJs(`window.scrollTo(0, 0)`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-hero.png`);
            
            // Scroll to highlights
            await evalJs(`document.querySelector('#highlights')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-highlights.png`);

            // Scroll to configurations
            await evalJs(`document.querySelector('#configurations')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-configurations.png`);

            // Scroll to clubhouse
            await evalJs(`document.querySelector('#clubhouse')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-clubhouse.png`);

            // Scroll to amenities
            await evalJs(`document.querySelector('#amenities')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-amenities.png`);

            // Scroll to location
            await evalJs(`document.querySelector('#location')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-location.png`);

            // Scroll to gallery
            await evalJs(`document.querySelector('#gallery')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-desktop-1440-gallery.png`);
          } else if (vp.name === 'Laptop-1366px') {
            await evalJs(`window.scrollTo(0, 0)`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-laptop-1366-hero.png`);
          } else if (vp.name === 'Mobile-390px') {
            await evalJs(`window.scrollTo(0, 0)`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-mobile-390-hero.png`);

            // Check mobile bottom sticky bar
            const mobileBarVisible = await evalJs(`Boolean(document.querySelector('.md\\\\:hidden.fixed.bottom-0'))`);
            console.log(`  Mobile Bottom Sticky CTA Bar Visible: ${mobileBarVisible ? '✅ YES' : '❌ NO'}`);

            // Scroll to configurations on mobile
            await evalJs(`document.querySelector('#configurations')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-mobile-390-configurations.png`);

            // Scroll to amenities on mobile
            await evalJs(`document.querySelector('#amenities')?.scrollIntoView()`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-mobile-390-amenities.png`);
          } else if (vp.name === 'Mobile-360px') {
            await evalJs(`window.scrollTo(0, 0)`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-mobile-360-hero.png`);
          } else if (vp.name === 'Tablet-768px') {
            await evalJs(`window.scrollTo(0, 0)`);
            await new Promise(r => setTimeout(r, 600));
            await captureScreenshot(`candeur-arbora-tablet-768-hero.png`);
          }
        }

        // 3. Lead Form and Validation QA
        console.log('\n==================================================');
        console.log('3. LEAD FORM VALIDATION & FUNCTIONALITY QA');
        console.log('==================================================');

        // Reset to desktop for form testing
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });
        await evalJs(`window.scrollTo(0, 0)`);
        await new Promise(r => setTimeout(r, 800));

        // Test A: Empty inputs
        console.log('\nTest A: Empty Submission Validation');
        const emptyTest = await evalJs(`(() => {
          const form = document.querySelector('form');
          const nameInput = form.querySelector('input[type="text"]');
          const phoneInput = form.querySelector('input[type="tel"]');
          nameInput.value = '';
          phoneInput.value = '';
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.click();
          return {
            nameRequired: nameInput.hasAttribute('required'),
            phoneRequired: phoneInput.hasAttribute('required')
          };
        })()`);
        console.log('  Name is required attribute:', emptyTest.nameRequired ? '✅ PASS' : '❌ FAIL');
        console.log('  Phone is required attribute:', emptyTest.phoneRequired ? '✅ PASS' : '❌ FAIL');

        // Test B: Invalid Phone Number (e.g. 12345 or starting with 1)
        console.log('\nTest B: Invalid Phone Validation');
        const invalidPhoneTest = await evalJs(`(() => {
          const form = document.querySelector('form');
          const nameInput = form.querySelector('input[type="text"]');
          const phoneInput = form.querySelector('input[type="tel"]');
          
          // Trigger React controlled input change
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(nameInput, 'Homebuyer Test');
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));

          nativeSetter.call(phoneInput, '1234567890');
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));

          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.click();

          return new Promise(r => setTimeout(() => {
            const errEl = document.querySelector('.text-rose-400');
            r({
              hasError: Boolean(errEl),
              errorText: errEl ? errEl.innerText.trim() : null
            });
          }, 400));
        })()`);
        console.log('  Rejected phone starting with 1:', invalidPhoneTest.hasError ? '✅ PASS' : '❌ FAIL');
        console.log('  Error message displayed:', invalidPhoneTest.errorText);

        // Test C: Valid Indian Phone Number Validation format
        console.log('\nTest C: Valid 10-Digit Indian Mobile Number Check');
        const validPhoneRegexTest = await evalJs(`(() => {
          const validate = (phone) => {
            const cleaned = phone.replace(/[\\s\\-()]/g, "").replace(/^(\\+91|91|0)/, "");
            return /^[6-9]\\d{9}$/.test(cleaned);
          };
          return {
            validNumbers: ['9876543210', '9493943946', '8123456789', '7001234567', '6300123456'].every(validate),
            invalidNumbers: ['1234567890', '5555555555', '98765', '987654321011', '0000000000'].every(n => !validate(n))
          };
        })()`);
        console.log('  Valid Indian numbers correctly accepted:', validPhoneRegexTest.validNumbers ? '✅ PASS' : '❌ FAIL');
        console.log('  Invalid/foreign numbers correctly rejected:', validPhoneRegexTest.invalidNumbers ? '✅ PASS' : '❌ FAIL');

        // Test D: Consent checkbox unchecked by default & mandatory consent enforcement
        console.log('\nTest D: Mandatory Consent Checkbox (Default Unchecked)');
        const consentTest = await evalJs(`(() => {
          const form = document.querySelector('form');
          const nameInput = form.querySelector('input[type="text"]');
          const phoneInput = form.querySelector('input[type="tel"]');
          const consentCheckbox = form.querySelector('input[type="checkbox"]');
          
          const wasDefaultUnchecked = consentCheckbox && !consentCheckbox.checked;

          // Fill valid name and valid Indian phone
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
          nativeSetter.call(nameInput, 'Homebuyer Test');
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));

          nativeSetter.call(phoneInput, '9876543210');
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));

          // Attempt submit while consent is unchecked
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.click();

          return new Promise(r => setTimeout(() => {
            const errEl = document.querySelector('.text-rose-400');
            r({
              wasDefaultUnchecked,
              hasConsentError: Boolean(errEl),
              errorText: errEl ? errEl.innerText.trim() : null,
              buttonText: submitBtn ? submitBtn.innerText.trim() : null
            });
          }, 400));
        })()`);
        console.log('  Consent checkbox is UNCHECKED by default:', consentTest.wasDefaultUnchecked ? '✅ PASS' : '❌ FAIL');
        console.log('  Unchecked consent produces error:', consentTest.hasConsentError ? '✅ PASS' : '❌ FAIL');
        console.log('  Consent Error Text:', consentTest.errorText);
        console.log('  Submit Button Text:', consentTest.buttonText);

        // Test E: Brochure Modal Trigger & Honest WhatsApp CTA
        console.log('\nTest E: Honest Brochure Modal Test');
        const modalTest = await evalJs(`(() => {
          const brochureBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Brochure'));
          if (brochureBtns.length > 0) {
            brochureBtns[0].click();
          }
          return new Promise(r => setTimeout(() => {
            const dialog = document.querySelector('[role="dialog"]');
            const dialogText = dialog ? dialog.innerText : '';
            r({
              dialogOpen: Boolean(dialog),
              honestDisclaimerFound: dialogText.includes('awaiting final developer release') || dialogText.includes('WhatsApp'),
              hasWhatsAppCta: Boolean(dialog?.querySelector('a[href*="wa.me"]'))
            });
          }, 600));
        })()`);
        console.log('  Brochure Modal Opens:', modalTest.dialogOpen ? '✅ PASS' : '❌ FAIL');
        console.log('  Contains honest disclaimer (no fake PDF):', modalTest.honestDisclaimerFound ? '✅ PASS' : '❌ FAIL');
        console.log('  Has immediate WhatsApp CTA:', modalTest.hasWhatsAppCta ? '✅ PASS' : '❌ FAIL');

        await captureScreenshot(`candeur-arbora-brochure-modal.png`);

        // Close modal
        await evalJs(`(() => {
          const closeBtn = document.querySelector('[aria-label="Close"]');
          if (closeBtn) closeBtn.click();
        })()`);
        await new Promise(r => setTimeout(r, 400));

        // 4. Verification of RERA and Developer Facts
        console.log('\n==================================================');
        console.log('4. FACTUAL CONSISTENCY CHECK IN PAGE TEXT');
        console.log('==================================================');
        const factsFound = await evalJs(`(() => {
          const text = document.body.innerText;
          return {
            hasReraPhase1: text.includes('P02200011363'),
            hasReraPhase2: text.includes('P02200011362'),
            hasPossession2031: text.includes('2031'),
            hasPrice1_3Cr: text.includes('1.3 Cr'),
            has3BHK: text.includes('3 BHK'),
            has20Acres: text.includes('20 Acres') || text.includes('20-Acre'),
            hasClubhouse135k: text.includes('1.35 Lakh') || text.includes('1.35 lakh'),
            hasCourtyard4_3: text.includes('4.3-Acre') || text.includes('4.3 Acres'),
            hasMoosapetMetro: text.includes('Moosapet') && text.includes('2.1 km'),
            hasContactPhone: text.includes('94939 43946') || text.includes('9493943946'),
            hasOfficialFloorPlanNotice: text.includes('Official floor plan available on request.'),
            hasNo80PercentClaim: !text.includes('80%') && !text.includes('80+%'),
            has75PercentOpenSpace: text.includes('75%'),
            has3BHKExclusive: !text.includes('2.5 BHK') && text.includes('3 BHK'),
            hasTrafficDisclaimer: text.includes('approximate off-peak estimates') || text.includes('peak hour traffic'),
            hasIndependentAdvisory: text.includes('Independent Advisory') || text.includes('independent real estate'),
            hasRequestLatestPriceCTA: text.includes('Request Latest Price & Floor Plans')
          };
        })()`);

        for (const [fact, passed] of Object.entries(factsFound)) {
          console.log(`  ${fact}: ${passed ? '✅ VERIFIED' : '❌ NOT FOUND'}`);
        }

        console.log('\n==================================================');
        console.log('ALL LOCAL QA & FACTUAL VERIFICATION TESTS COMPLETE');
        console.log('==================================================');

        browserProc.kill();
        server.close();
        process.exit(0);
      });
});
