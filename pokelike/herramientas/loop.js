const fs=require('fs'); const readCards=require('./catch.js');
const isNewAurora = require('./isna.js');
const isShiny = c => /shiny|aurora/i.test(c.cls+c.tags);
const N=+process.argv[2]||5; const STOP_ANY_SHINY = process.argv[3]==='any';
require('./lib')(async p => {
  const st=JSON.parse(fs.readFileSync('attempts2.json'));
  for (let k=0;k<N;k++) {
    // state check
    const s = await p.evaluate(()=>{ const team=[...document.querySelectorAll('*')].filter(e=>e.offsetParent && /^(TEAM|EQUIPO)\n/.test(e.innerText)).map(e=>e.innerText)[0]||''; const nodes=[...document.querySelectorAll('g.map-node.map-node--clickable')].map(g=>({id:g.dataset.nodeId, spr:(g.querySelector('image.map-node-sprite')?.getAttribute('href')||'').replace(/^.*\//,'')})); const modal=[...document.querySelectorAll('.poke-choice-wrap')].filter(e=>e.offsetParent).length; return {team:team.replace(/\s+/g,' ').trim(), nodes, modal}; });
    if (!new RegExp(process.env.TEAMRE||'Swinub Lv5$').test(s.team) || s.modal) { console.log('STATE_UNEXPECTED', JSON.stringify(s)); break; }
    const pb = s.nodes.find(n=>/^n1_/.test(n.id) && /pokeball/.test(n.spr));
    if (!pb) { await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click()); await p.waitForTimeout(1500); k--; continue; }
    const box = await p.evaluate(id=>{ const b=document.querySelector(`g.map-node[data-node-id="${id}"]`).getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]; }, pb.id);
    await p.mouse.click(box[0], box[1]); await p.waitForTimeout(2200);
    let cards = await readCards(p);
    if (cards.length!==3) { console.log('NOT_CATCH_SCREEN', JSON.stringify(cards)); break; }
    const seen=[...cards]; let hit=cards.find(isNewAurora);
    for (let i=0;i<3 && !hit;i++) {
      if (cards[i].reroll!=='avail') continue;
      if (STOP_ANY_SHINY && isShiny(cards[i])) continue;
      await p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/reroll|volver a tirar/i}).click({timeout:5000});
      await p.waitForTimeout(1500);
      cards = await readCards(p); seen.push(cards[i]);
      hit = cards.find(isNewAurora);
    }
    if (!hit && STOP_ANY_SHINY) hit = cards.find(isShiny);
    st.confirmados++; const entry={n:st.confirmados, seen:seen.map(c=>c.name+(c.cls?'['+c.cls.replace(/card-/g,'')+']':'')+(/as an? |como /.test(c.pc)?'{'+c.pc.replace(/Already in your PC as |Ya está en tu PC como /,'')+'}':'')+(!c.pc?'{NEW}':''))};
    st.log.push(entry); fs.writeFileSync('attempts2.json', JSON.stringify(st));
    console.log(entry.n, entry.seen.join(', '));
    if (hit) { console.log('HIT', JSON.stringify(hit), 'FINAL', JSON.stringify(cards)); break; }
    await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click()); await p.waitForTimeout(1500);
  }
});
