const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  const before = await p.evaluate(()=>[...document.querySelectorAll('*')].filter(e=>e.offsetParent && e.children.length===0 && /^[\d,]+$/.test(e.innerText.trim())).map(e=>e.innerText.trim()).pop());
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(1500);
  await p.fill('input[placeholder="Username"]', process.env.PU);
  await p.fill('input[placeholder="Password"]', process.env.PP);
  await p.evaluate(() => { const bs=[...document.querySelectorAll('button')].filter(b=>b.offsetParent && /^(LOG IN|INICIAR SESIÓN|ENTRAR)$/i.test(b.innerText.trim())); bs[bs.length-1].click(); });
  await p.waitForTimeout(9000);
  const r = await p.evaluate(()=>({user: document.body.innerText.match(/RASECJ9/i)?.[0], nums: [...document.querySelectorAll('*')].filter(e=>e.offsetParent && e.children.length===0 && /^[\d,]+$/.test(e.innerText.trim())).map(e=>(e.id||e.className)+'='+e.innerText.trim())})); await p.screenshot({path:'money.png'});
  console.log('antes de iniciar sesión:', before, '| tras iniciar sesión:', JSON.stringify(r));
  await b.close();
})();
