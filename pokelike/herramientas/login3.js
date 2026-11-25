require('./lib')(async p => {
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(1500);
  const u=p.locator('input[type=text]:visible, input[placeholder*=suario]:visible, input[placeholder*=sername]:visible').first();
  const w=p.locator('input[type=password]:visible').first();
  await u.fill(process.env.PU); await w.fill(process.env.PP);
  await p.evaluate(() => { const bs=[...document.querySelectorAll('button')].filter(b=>b.offsetParent && /^(LOG IN|INICIAR SESIÓN)$/i.test(b.innerText.trim())); bs[bs.length-1].click(); });
  await p.waitForTimeout(7000);
  const t = await p.evaluate(() => document.body.innerText);
  console.log(t.replace(/\s+/g,' ').match(/RASECJ9.{0,60}|Rasecj9.{0,60}/i)?.[0], (t.match(/[\d,]{6,}/g)||[]).slice(-2));
});
