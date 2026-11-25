require('./lib')(async p => {
  await p.evaluate(()=>{ const c=[...document.querySelectorAll('button,a,div')].filter(e=>e.offsetParent && /ACEPTAR DESAFÍO|TAKE CHALLENGE/i.test(e.innerText) && e.innerText.length<40); if(c.length && !document.querySelector('.chal-cta-short.type-ice')) c[c.length-1].click(); });
  await p.waitForTimeout(2500);
  const ok = await p.evaluate(()=>{ const b=document.querySelector('.chal-cta-short.type-ice'); b.click(); return 'daily ice'; });
  await p.waitForTimeout(3000);
  if(process.env.NOPICK) return; await p.evaluate(()=>[...document.querySelectorAll('.dex-card')].find(e=>e.offsetParent && /Snorunt/.test(e.innerText)).click());
  await p.waitForTimeout(3000);
  console.log(ok.replace(/\n/g,' '), '||', (await p.evaluate(()=>document.body.innerText)).replace(/\n+/g,' ').match(/Elige una reliquia.{0,500}/)?.[0]);
});
