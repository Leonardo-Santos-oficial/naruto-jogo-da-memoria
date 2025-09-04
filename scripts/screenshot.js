import puppeteer from 'puppeteer';
import { setTimeout as wait } from 'node:timers/promises';

const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:4173/';
const OUTPUT = new URL('../public/screenshot.png', import.meta.url).pathname;

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    // Retry logic in case preview isn't ready yet
    let attempts = 0;
  while (true) {
      try {
    await page.goto(PREVIEW_URL, { waitUntil: 'networkidle2', timeout: 15000 });
        break;
      } catch (e) {
        attempts += 1;
        if (attempts > 10) throw e;
        await wait(1000);
      }
    }

    // Wait for game board to render
    await page.waitForSelector('.game-board', { timeout: 15000 });

    // Optional: click two cards to show flip state in screenshot
    const cards = await page.$$('.card');
    if (cards.length >= 2) {
      await cards[0].click();
      await wait(200);
      await cards[1].click();
      await wait(300);
    }

    await page.screenshot({ path: OUTPUT, fullPage: false });
    console.log(`Screenshot saved to ${OUTPUT}`);
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('screenshot failed:', err);
  process.exit(1);
});
