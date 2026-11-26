// on a catch screen: reroll non-Bug cards (once each) looking for Bug types; print cards
const readCards=require('./catch.js');
require('./lib')(async p=>{ let cards=await readCards(p);
 for(let i=0;i<cards.length;i++){ if(/BICHO/.test(cards[i].types)||/shiny|aurora/.test(cards[i].cls)||cards[i].reroll!=='avail') continue;
  const b=p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/volver a tirar/i}); if(await b.count()){await b.click();await p.waitForTimeout(1200);cards=await readCards(p);} }
 console.log(cards.map(c=>c.i+' '+c.name+':'+c.cls+':'+c.types).join(' | '));
});
