const readCards=require('./catch.js');
const isShiny = c => /shiny|aurora/i.test(c.cls+c.tags);
require('./lib')(async p => {
  let cards=await readCards(p); const seen=[...cards];
  for (let i=0;i<cards.length;i++) {
    if (cards.some(c=>/aurora/.test(c.cls) && !/aurora/.test(c.pc))) break;
    if (cards[i].reroll!=='avail' || isShiny(cards[i]) || (process.env.KEEP||'').split(',').includes(String(i))) continue;
    await p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/reroll|volver a tirar/i}).click({timeout:5000});
    await p.waitForTimeout(1500); cards=await readCards(p); seen.push(cards[i]);
  }
  console.log('seen:', seen.map(c=>c.name+(c.cls?'['+c.cls+']':'')).join(', '));
  cards.forEach(c=>console.log(c.i, c.name, c.lv, c.cls, c.types, '|', c.move, '|', c.pc));
});
