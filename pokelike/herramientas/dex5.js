const fs=require('fs');
require('./lib')(async p => {
  const out={};
  for (const tab of ['POKÉDEX','SHINY','AURORA']) {
    await p.evaluate(t=>{ const m=document.getElementById('pokedex-modal'); [...m.querySelectorAll('.dex-tab')].find(x=>x.innerText.trim().toUpperCase()===t).click(); }, tab);
    await p.waitForTimeout(2000);
    out[tab] = await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); return {desc:m.querySelector('.game-modal-desc')?.innerText, cards:[...m.querySelectorAll('.dex-card')].map(c=>({num:c.querySelector('.dex-num')?.innerText.trim(), name:c.querySelector('.dex-name')?.innerText.trim(), types:[...c.querySelectorAll('.type-badge')].map(t=>t.innerText.trim().toUpperCase()), cls:c.className, title:c.title, root:c.dataset.mvpRoot, sprite:c.querySelector('img')?.getAttribute('src')}))}; });
    console.log(tab, out[tab].desc, out[tab].cards.length, [...new Set(out[tab].cards.map(c=>c.cls))]);
  }
  await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); [...m.querySelectorAll('.dex-tab')].find(x=>x.innerText.trim().toUpperCase()==='POKÉDEX').click(); });
  fs.writeFileSync('dex_all.json', JSON.stringify(out));
});
