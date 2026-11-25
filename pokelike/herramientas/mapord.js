// drag team-slot named A onto first slot
require('./lib')(async p=>{const n=process.argv[2];
const slots=p.locator('.team-slot:visible');const names=await slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText));
const A=await slots.nth(names.indexOf(n)).boundingBox(), B=await slots.nth(0).boundingBox();
await p.mouse.move(A.x+A.width/2,A.y+A.height/2);await p.mouse.down();for(let k=1;k<=20;k++){await p.mouse.move(A.x+A.width/2+(B.x-A.x)*k/20,A.y+A.height/2+(B.y-A.y)*k/20);await p.waitForTimeout(25)}await p.mouse.up();await p.waitForTimeout(1500);
console.log(await slots.evaluateAll(els=>els.map(e=>e.querySelector('.team-slot-name')?.innerText).join(',')))})
