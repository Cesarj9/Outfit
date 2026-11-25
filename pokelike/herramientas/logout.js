const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext(__dirname + '/profile', { viewport: { width: 1280, height: 900 } });
  const p = ctx.pages()[0] || await ctx.newPage();
  p.on('dialog', d => { console.log('dialog:', d.message()); d.accept(); });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click()); await p.waitForTimeout(1500);
  await p.evaluate(()=>[...document.querySelectorAll('button')].find(x=>x.offsetParent&&/CERRAR SESIÓN|LOG OUT/i.test(x.innerText)).click());
  await p.waitForTimeout(3000);
  console.log('after click:', (await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').slice(0,300));
  const btns = await p.evaluate(()=>[...document.querySelectorAll('button')].filter(x=>x.offsetParent).map(x=>x.innerText.trim()).filter(Boolean));
  console.log(btns.join(' | '));
  await p.waitForTimeout(3000);
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(6000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click()); await p.waitForTimeout(1500);
  console.log('estado:', (await p.evaluate(()=>[...document.querySelectorAll('.game-modal-box')].filter(e=>e.offsetParent).map(e=>e.innerText).join(' | '))).replace(/\s+/g,' ').slice(0,200));
  await ctx.close();
})();
