require('./lib')(async p => {
  const a=p.locator('*:visible',{hasText:process.argv[2]}).last(), b=p.locator('*:visible',{hasText:process.argv[3]}).last();
  await a.dragTo(b); await p.waitForTimeout(1000);
  console.log(await p.evaluate(()=>{ const t=document.body.innerText; const i=Math.max(t.indexOf('YOUR TEAM'),t.indexOf('TU EQUIPO')); return t.slice(i,i+200).replace(/\n/g,' '); }));
});
