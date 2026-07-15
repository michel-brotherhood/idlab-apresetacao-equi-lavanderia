const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML_PATH = path.resolve(__dirname, 'index.html');
const OUT_DIR = path.resolve(__dirname, 'verify-screenshots');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'notebook', width: 1366, height: 768 },
];

const SLIDE_SECTIONS = [
  'INÍCIO', 'O PROBLEMA', 'A SOLUÇÃO', 'POR QUE O CACHORRÃO',
  'CREDIBILIDADE', 'TECNOLOGIA', 'PARA O CLUBE',
  'IMPACTO ESG', 'ESCOLA DE VIDA', 'O CONVITE', 'FECHAMENTO'
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const report = [];

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(`file:///${HTML_PATH}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800); // let video/particles load

    const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
    report.push(`\n=== ${vp.name.toUpperCase()} (${vp.width}x${vp.height}) — ${totalSlides} slides ===`);

    for (let i = 0; i < totalSlides; i++) {
      // Navigate to slide
      await page.evaluate((idx) => {
        window.goTo(idx);
      }, i);
      await page.waitForTimeout(700);

      // Screenshot
      const ss = path.join(OUT_DIR, `${vp.name}-slide-${String(i).padStart(2,'0')}.png`);
      await page.screenshot({ path: ss, fullPage: false });

      // Extract visible text of active slide
      const slideData = await page.evaluate((idx) => {
        const slide = document.querySelectorAll('.slide')[idx];
        const section = slide.dataset.section || '';
        const text = slide.innerText.replace(/\s+/g, ' ').trim().substring(0, 600);
        // Check for overflow
        const allEls = slide.querySelectorAll('*');
        let overflows = [];
        allEls.forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.right > window.innerWidth + 2 || r.bottom > window.innerHeight + 2)) {
            overflows.push(el.tagName + (el.className ? '.' + el.className.split(' ')[0] : '') + ` right=${Math.round(r.right)} bottom=${Math.round(r.bottom)}`);
          }
        });
        // Check font sizes
        const headline = slide.querySelector('.headline');
        const headlineFontSize = headline ? parseFloat(getComputedStyle(headline).fontSize) : null;
        return { section, text, overflows: overflows.slice(0, 5), headlineFontSize };
      }, i);

      const overflowNote = slideData.overflows.length > 0
        ? `  ⚠️  OVERFLOW: ${slideData.overflows.join(' | ')}`
        : '  ✅ No overflow';

      report.push(`\nSlide ${i+1} [${slideData.section}]`);
      report.push(`  Headline px: ${slideData.headlineFontSize ? Math.round(slideData.headlineFontSize) : 'N/A'}`);
      report.push(overflowNote);
      report.push(`  Text: ${slideData.text.substring(0, 250)}...`);
      report.push(`  Screenshot: ${ss}`);
    }
    await page.close();
  }

  // Save report
  const reportPath = path.join(OUT_DIR, 'report.txt');
  fs.writeFileSync(reportPath, report.join('\n'));
  console.log(report.join('\n'));
  console.log(`\nReport saved: ${reportPath}`);

  await browser.close();
})();
