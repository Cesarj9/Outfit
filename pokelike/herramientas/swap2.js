require('./lib')(async p => {
  const slots = p.locator('.team-slot:visible');
  const names = await slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText));
  const ia=names.indexOf(process.argv[2]), ib=names.indexOf(process.argv[3]);
  if (ia<0||ib<0) { console.log('not found', names); return; }
  const A=await slots.nth(ia).boundingBox(), B=await slots.nth(ib).boundingBox();
  await p.mouse.move(A.x+A.width/2, A.y+A.height/2); await p.mouse.down();
  for (let k=1;k<=10;k++) { await p.mouse.move(A.x+A.width/2+(B.x-A.x)*k/10, A.y+A.height/2+(B.y-A.y)*k/10); await p.waitForTimeout(30); }
  await p.mouse.up(); await p.waitForTimeout(800);
  console.log(await slots.evaluateAll(els=>els.map(e=>e.innerText.replace(/\n/g,' ')).join(' | ')));
});
