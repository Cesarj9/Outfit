// node dragxy.js "Item" x y
require('./lib')(async p => {
  const A = await p.locator('.elite-prep-bag img[title="'+process.argv[2]+'"]').first().boundingBox(); if(!A){console.log('no item');return;}
  const ax=A.x+A.width/2, ay=A.y+A.height/2, bx=+process.argv[3], by=+process.argv[4];
  await p.mouse.move(ax,ay); await p.mouse.down(); await p.waitForTimeout(100);
  for(let k=1;k<=20;k++){ await p.mouse.move(ax+(bx-ax)*k/20, ay+(by-ay)*k/20); await p.waitForTimeout(25);} 
  await p.waitForTimeout(200); await p.mouse.up(); await p.waitForTimeout(2000);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('.elite-prep-bag img')].map(e=>e.title)), await p.evaluate(()=>[...document.querySelectorAll('.elite-prep-player-side .battle-pokemon')].map(e=>e.querySelector('.battle-poke-name')?.innerText+':'+[...e.querySelectorAll('img')].map(i=>i.title).filter(Boolean).join(','))));
});
