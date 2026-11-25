const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext(__dirname + '/profile', { viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click()); await p.waitForTimeout(1500);
  console.log((await p.evaluate(()=>[...document.querySelectorAll('.game-modal-box')].filter(e=>e.offsetParent).map(e=>e.innerText).join(' | '))).replace(/\s+/g,' ').slice(0,250));
  await ctx.close();
})();
