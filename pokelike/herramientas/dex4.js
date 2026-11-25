require('./lib')(async p => {
  const st = await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); return [...m.querySelectorAll('button')].filter(b=>/active|on|pressed/.test(b.className)||b.getAttribute('aria-pressed')).map(b=>b.innerText.trim()+':'+b.className+':'+b.getAttribute('aria-pressed')); });
  console.log(st);
  await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); const b=m.querySelector('#dex-hide-caught-btn'); if (/active/.test(b.className)) b.click(); [...m.querySelectorAll('.dex-gen-filter-btn')].find(x=>x.innerText.trim().toUpperCase()==='ALL').click(); });
  await p.waitForTimeout(2000);
  const r = await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); const cs=m.querySelectorAll('.dex-card'); return {n:cs.length, head:m.querySelector('.game-modal-desc')?.innerText, ex:[...cs].filter((c,i)=>[0,3,6,130].includes(i)).map(c=>c.outerHTML.slice(0,900))}; });
  console.log(JSON.stringify(r,null,1));
});
