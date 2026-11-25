const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(2500);
  await p.screenshot({ path: 'login.png' });
  const t = await p.evaluate(() => [...document.querySelectorAll('div,section,form')].filter(e=>e.offsetParent && getComputedStyle(e).position==='fixed').map(e=>e.innerText).join('\n---\n'));
  console.log(t.slice(0,2000));
  const inputs = await p.$$eval('input', els => els.filter(e=>e.offsetParent).map(e => e.type+':'+e.placeholder));
  console.log('INPUTS', inputs);
  await b.close();
})();
