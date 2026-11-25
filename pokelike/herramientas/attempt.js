// Revisa cartas, rerollea una a una y se detiene si aparece un aurora nuevo. Imprime log.
const readCards=require('./catch.js');
const isNewAurora = c => /aurora/i.test(c.cls+c.tags) && !/aurora/i.test(c.pc);
require('./lib')(async p => {
  const seen=[]; let cards=await readCards(p);
  if (cards.length!==3) { console.log('NOT_CATCH_SCREEN', JSON.stringify(cards)); return; }
  cards.forEach(c=>seen.push(c));
  let hit = cards.find(isNewAurora);
  for (let i=0;i<3 && !hit;i++) {
    if (cards[i].reroll!=='avail') continue;
    await p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/reroll|volver a tirar/i}).click({timeout:5000});
    await p.waitForTimeout(1600);
    cards = await readCards(p); seen.push(cards[i]);
    hit = cards.find(isNewAurora);
  }
  console.log(JSON.stringify({hit: hit||null, seen: seen.map(c=>c.name+(c.cls?'['+c.cls.replace('card-','')+']':'')+(/aurora|shiny/.test(c.pc)?'{'+c.pc.replace('Already in your PC as ','')+'}':'')), final: cards.map(c=>c.name+(c.cls?'['+c.cls+']':''))}));
});
