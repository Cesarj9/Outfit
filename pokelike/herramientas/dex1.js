require('./lib')(async p => {
  const r = await p.evaluate(() => { const ms=[...document.querySelectorAll('.game-modal')].filter(e=>e.offsetParent).map(e=>e.id); const m=document.querySelector('#dex-modal')||[...document.querySelectorAll('.game-modal')].find(e=>e.offsetParent && /caught/i.test(e.innerText)); if(!m) return {ms}; const card=m.querySelectorAll('.dex-card')[3]; return {ms,id:m.id, head:m.innerText.slice(0,600), card: card?card.outerHTML.slice(0,1500):null, n:m.querySelectorAll('.dex-card').length}; });
  console.log(JSON.stringify(r,null,1));
});
