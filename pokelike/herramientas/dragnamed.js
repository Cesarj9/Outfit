// node dragnamed.js "Item title" "Pokemon name"  : drag a specific bag item onto a team slot (map panel or pre-battle)
require('./lib')(async p => {
  await p.mouse.move(1100,700); await p.waitForTimeout(300);
  const badges = p.locator('#item-bar .item-badge:visible');
  const titles = await badges.evaluateAll(els=>els.map(e=>e.querySelector('img')?.title));
  const ia = titles.indexOf(process.argv[2]); if (ia<0) { console.log('no item', titles); return; }
  const A = await badges.nth(ia).boundingBox();
  const target = p.locator('*:visible', { hasText: new RegExp('^'+process.argv[3]+'\\s*\\n?\\s*Lv') }).last();
  const B = await target.boundingBox();
  await p.mouse.move(A.x+A.width/2,A.y+A.height/2); await p.mouse.down(); await p.waitForTimeout(100);
  for(let k=1;k<=20;k++){ await p.mouse.move(A.x+A.width/2+(B.x+B.width/2-A.x-A.width/2)*k/20, A.y+A.height/2+(B.y+B.height/2-A.y-A.height/2)*k/20); await p.waitForTimeout(25); }
  await p.waitForTimeout(200); await p.mouse.up(); await p.waitForTimeout(2000);
  console.log('items now:', await badges.evaluateAll(els=>els.map(e=>e.querySelector('img')?.title)), '| text:', (await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/(Mega )?Heracross Lv\d+/g));
});
