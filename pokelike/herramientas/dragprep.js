// node dragprep.js "Item" "Pokemon"  -- drag item from elite-prep bag onto team card
require('./lib')(async p => {
  const src = p.locator('.elite-prep-bag img[title="'+process.argv[2]+'"]').first();
  const A = await src.boundingBox(); if(!A){console.log('no item');return;}
  const B = await p.evaluate(n=>{ const el=[...document.querySelectorAll('*')].filter(e=>e.offsetParent && e.children.length<6 && new RegExp('^\\s*'+n+' Lv\\d+').test(e.innerText||'')).sort((a,b)=>a.innerText.length-b.innerText.length)[0]; if(!el) return null; let c=el; for(let i=0;i<3&&c.parentElement;i++){ if(c.querySelector('img')) break; c=c.parentElement;} const r=c.getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,cls:c.className}; }, process.argv[3]);
  console.log('target', B);
  const ax=A.x+A.width/2, ay=A.y+A.height/2, bx=B.x+B.width/2, by=B.y+B.height/2;
  await p.mouse.move(ax,ay); await p.mouse.down(); await p.waitForTimeout(100);
  for(let k=1;k<=20;k++){ await p.mouse.move(ax+(bx-ax)*k/20, ay+(by-ay)*k/20); await p.waitForTimeout(25);} 
  await p.waitForTimeout(200); await p.mouse.up(); await p.waitForTimeout(2000);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('.elite-prep-bag img')].map(e=>e.title)), (await p.evaluate(()=>document.body.innerText)).match(/(Mega )?Heracross Lv\d+/g));
});
