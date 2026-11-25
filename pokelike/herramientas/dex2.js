require('./lib')(async p => {
  await p.evaluate(() => { const b=[...document.querySelectorAll('button,a')].filter(e=>/POKÉDEX|POKEDEX/i.test(e.innerText.trim()) && e.innerText.trim().length<12); b[0].click(); });
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => { const ms=[...document.querySelectorAll('.game-modal')].filter(e=>e.offsetParent); const m=ms[ms.length-1]; if(!m) return 'none'; const cards=m.querySelectorAll('.dex-card'); return {id:m.id, head:m.innerText.slice(0,500), n:cards.length, c:[...cards].slice(0,4).map(c=>c.outerHTML.slice(0,700))}; });
  console.log(JSON.stringify(r,null,1));
});
