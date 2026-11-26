// ITEM="Sacred Ash" node dragorder.js Pokemon : drag a bag item onto a Pokémon on the battle order screen
require('./lib')(async p=>{ const A=await p.locator('.item-badge:visible').filter({has:p.locator(`img[title="${process.env.ITEM}"]`)}).first().boundingBox();
 const B=await p.evaluate(n=>{const e=[...document.querySelectorAll('.battle-pokemon')].find(x=>x.offsetParent&&new RegExp('^'+n).test(x.innerText.trim()));const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}},process.argv[2]);
 await p.mouse.move(A.x+12,A.y+12); await p.mouse.down(); await p.waitForTimeout(100);
 for(let k=1;k<=20;k++){await p.mouse.move(A.x+12+(B.x+B.width/2-A.x-12)*k/20,A.y+12+(B.y+B.height/2-A.y-12)*k/20);await p.waitForTimeout(25);}
 await p.waitForTimeout(200); await p.mouse.up(); await p.waitForTimeout(1500);
 console.log((await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/TU EQUIPO.{0,250}/)?.[0]);
});
