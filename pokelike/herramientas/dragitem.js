require('./lib')(async p => {
  const A=await p.locator('#item-bar .item-badge').first().boundingBox();
  const slots=p.locator('.team-slot:visible'); const names=await slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText));
  const B=await slots.nth(names.indexOf(process.argv[2])).boundingBox();
  await p.mouse.move(A.x+A.width/2,A.y+A.height/2); await p.mouse.down();
  for(let k=1;k<=12;k++){ await p.mouse.move(A.x+A.width/2+(B.x+B.width/2-A.x-A.width/2)*k/12, A.y+A.height/2+(B.y+B.height/2-A.y-A.height/2)*k/12); await p.waitForTimeout(30); }
  await p.mouse.up(); await p.waitForTimeout(1500);
  await p.screenshot({path:'x.png'});
  console.log((await p.evaluate(()=>document.body.innerText)).replace(/\n+/g,' ').replace(/.*DISCORD/,'').slice(0,400));
});
