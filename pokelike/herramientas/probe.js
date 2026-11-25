const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(8000);
  await p.screenshot({ path: 'home.png' });
  const t = await p.evaluate(() => document.body.innerText);
  console.log(t.slice(0, 3000));
  const btns = await p.$$eval('button, a', els => els.filter(e=>e.offsetParent).map(e => e.innerText.trim()).filter(Boolean));
  console.log('BUTTONS:', JSON.stringify(btns));
  await b.close();
})();
