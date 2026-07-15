const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const HTML_PATH = path.resolve(__dirname, "index.html");
const OUT_DIR = path.resolve(__dirname, "verify-screenshots");

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of [{ name: "desktop", w: 1920, h: 1080 }, { name: "notebook", w: 1366, h: 768 }]) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto("file:///" + HTML_PATH.replace(/\\/g, "/"), { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // Slide 4 = idx 3 (POR QUE O CACHORRÃO), Slide 5 = idx 4 (CREDIBILIDADE), Slide 8 = idx 7 (ESG)
    for (const idx of [3, 4, 7]) {
      await page.evaluate((i) => window.goTo(i), idx);
      await page.waitForTimeout(2000); // wait for full animation (1400ms counter + buffer)
      const ss = path.join(OUT_DIR, `RECHECK-${vp.name}-slide-${String(idx).padStart(2,"0")}.png`);
      await page.screenshot({ path: ss });
      const info = await page.evaluate((i) => {
        const slide = document.querySelectorAll(".slide")[i];
        const h = slide.querySelector(".headline");
        const hSize = h ? parseFloat(getComputedStyle(h).fontSize) : "N/A";
        const statNums = [...slide.querySelectorAll(".stat-num-wrap")].map(el => el.innerText.trim());
        return { section: slide.dataset.section, hSize, statNums };
      }, idx);
      console.log(`[${vp.name}] Slide ${idx+1} [${info.section}]`);
      console.log(`  Headline: ${info.hSize}px | Stats: ${JSON.stringify(info.statNums)}`);
      console.log(`  Screenshot: ${ss}`);
    }
    await page.close();
  }
  await browser.close();
  console.log("\nDone.");
})();
