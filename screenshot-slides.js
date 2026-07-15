const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FILE = 'file:///' + path.resolve('index.html').replace(/\\/g, '/');
const OUT = path.resolve('screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'notebook', width: 1366, height: 768 },
];

(async () => {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    await page.goto(FILE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800); // let animations settle

    const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
    console.log(`[${vp.name} ${vp.width}x${vp.height}] Total slides: ${total}`);

    for (let i = 0; i < total; i++) {
      await page.screenshot({ path: path.join(OUT, `${vp.name}-slide-${String(i).padStart(2,'0')}.png`) });
      if (i < total - 1) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(1200);
      }
    }
    await ctx.close();
    console.log(`[${vp.name}] Screenshots saved.`);
  }

  await browser.close();
})();
