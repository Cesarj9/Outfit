const readCards=require('./catch.js');
require('./lib')(async p => {
  let cards=await readCards(p); const keep=(process.env.KEEP||'').split(',');
  for (let i=0;i<cards.length;i++) {
    if (cards[i].reroll!=='avail' || keep.includes(String(i))) continue;
    await p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/reroll|volver a tirar/i}).click({timeout:5000});
    await p.waitForTimeout(1500); cards=await readCards(p);
    if (require('./isna.js')(cards[i])) break;
  }
  cards.forEach(c=>console.log(c.i, c.name, c.lv, c.cls, c.types, '|', c.pc));
});
