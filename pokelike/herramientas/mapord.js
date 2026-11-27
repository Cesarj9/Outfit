// mapord.js A [B C ...]: drag the named team slots so they occupy positions 0,1,2... in that order
require('./lib')(async p=>{
  const want=process.argv.slice(2);
  const slots=p.locator('.team-slot:visible');
  const getNames=()=>slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText));
  for(let i=0;i<want.length;i++){
    const names=await getNames();
    const from=names.indexOf(want[i]);
    if(from<0||from===i) continue;
    const A=await slots.nth(from).boundingBox(), B=await slots.nth(i).boundingBox();
    await p.mouse.move(A.x+A.width/2,A.y+A.height/2);await p.mouse.down();
    for(let k=1;k<=20;k++){await p.mouse.move(A.x+A.width/2+(B.x-A.x)*k/20,A.y+A.height/2+(B.y-A.y)*k/20);await p.waitForTimeout(25)}
    await p.mouse.up();await p.waitForTimeout(1200);
  }
  console.log((await getNames()).join(','));
})
