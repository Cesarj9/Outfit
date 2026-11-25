require('./lib')(async p => {
  await p.mouse.move(1100,700); await p.waitForTimeout(400);
  const A=await (process.env.ITEM? p.locator('#item-bar .item-badge').filter({has:p.locator('img[title="'+process.env.ITEM+'"]')}).first() : p.locator('#item-bar .item-badge').first()).boundingBox();
  const slots=p.locator('.team-slot:visible'); const names=await slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText));
  const B=await slots.nth(names.indexOf(process.argv[2])).locator('img.team-sprite').boundingBox();
  await p.mouse.move(A.x+A.width/2,A.y+A.height/2); await p.mouse.down(); await p.waitForTimeout(100);
  for(let k=1;k<=20;k++){ await p.mouse.move(A.x+A.width/2+(B.x+B.width/2-A.x-A.width/2)*k/20, A.y+A.height/2+(B.y+B.height/2-A.y-A.height/2)*k/20); await p.waitForTimeout(25); }
  await p.waitForTimeout(200); await p.mouse.up(); await p.waitForTimeout(2000);
  await p.screenshot({path:'x.png'});
  console.log(await p.evaluate(()=>[...document.querySelectorAll('.evo-choice-card')].filter(x=>x.offsetParent).map(c=>c.innerText.replace(/\s+/g,' ')).join('|')+' || items:'+[...document.querySelectorAll('#item-bar img')].map(i=>i.title)));
});
