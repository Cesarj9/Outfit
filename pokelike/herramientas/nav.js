const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  for (const label of ['POKÉDEX','ITEMS','PC','PATCH NOTES']) {
    await p.evaluate(l => { const el=[...document.querySelectorAll('button,a')].find(e=>e.innerText.trim().toUpperCase()===l); el && el.click(); }, label);
    await p.waitForTimeout(2500);
    const t = await p.evaluate(() => document.body.innerText);
    console.log('=====',label, t.length); console.log(t.slice(0,1200));
    await p.screenshot({ path: label.replace(/\W/g,'')+'.png' });
    await p.keyboard.press('Escape'); await p.waitForTimeout(800);
    await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(4000);
  }
  await b.close();
})();
