require('./lib')(async p => {
  await p.evaluate(()=>[...document.querySelectorAll('button')].find(x=>x.offsetParent && /FIGHT!|LUCHAR!/i.test(x.innerText)).click());
  let t='';
  for (let i=0;i<120;i++){ await p.waitForTimeout(1000); t=await p.evaluate(()=>{ const vis=[...document.querySelectorAll('[class*=-screen],[id*=-screen]')].filter(e=>e.offsetParent).map(e=>e.id||e.className.split(' ')[0]); const cont=[...document.querySelectorAll('button')].some(b=>b.offsetParent && /CONTINU/i.test(b.innerText)); return vis.join(',')+(cont?' CONT':''); }); if (!/battle/.test(t) || /CONT/.test(t)) break; }
  await p.waitForTimeout(1500);
  const txt=await p.evaluate(()=>{ const t=document.body.innerText; const i=t.indexOf('DISCORD'); return t.slice(i+7,i+1200).replace(/\n+/g,' | '); });
  console.log('SCREENS', t, '\n', txt);
});
