// visit catch node: reroll all; if any new aurora -> report & stay; else flee
const readCards=require('./catch.js');
require('./lib')(async p => {
  const id=process.argv[2];
  const box = await p.evaluate(id=>{ const g=document.querySelector(`g.map-node[data-node-id="${id}"]`); const b=g.getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]; }, id);
  await p.mouse.click(box[0], box[1]); await p.waitForTimeout(2500);
  let cards=await readCards(p); const seen=[...cards];
  const isNA = require('./isna.js');
  for (let i=0;i<cards.length && !cards.some(isNA);i++){ if(cards[i].reroll!=='avail') continue; if(/shiny|aurora/i.test(cards[i].cls)) continue; if((process.env.KEEP||'').split(',').includes(cards[i].name)) continue; await p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/reroll|volver a tirar/i}).click({timeout:5000}); await p.waitForTimeout(1500); cards=await readCards(p); seen.push(cards[i]); }
  const hit=cards.find(isNA);
  console.log('seen:', seen.map(c=>c.name+(c.cls?'['+c.cls.replace('card-','')+']':'')).join(', '));
  if (hit) { console.log('NEW AURORA', hit.i, hit.name, hit.pc); return; }
  if (process.env.STAY) { cards.forEach(c=>console.log(c.i,c.name,c.lv,c.cls,c.types,'|',c.pc)); return; }
  await p.evaluate(()=>{ const b=[...document.querySelectorAll('button')].find(x=>x.offsetParent && /SKIP|FLEE|SALTAR|HUIR/i.test(x.innerText)); b&&b.click(); }); await p.waitForTimeout(1500); console.log('fled');
});
