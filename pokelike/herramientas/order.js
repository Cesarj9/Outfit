// node order.js Name1 Name2 ... : reorder player cards by mouse drags
require('./lib')(async p => {
  const want=process.argv.slice(2);
  await p.evaluate(()=>{ const c=[...document.querySelectorAll('.battle-side .battle-pokemon[data-idx]')].find(e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).position!=='fixed'); if(c) window.scrollBy(0, c.getBoundingClientRect().y-120); }); await p.waitForTimeout(400);
  const cards=async()=>p.evaluate(()=>[...document.querySelectorAll('.battle-side .battle-pokemon[data-idx]')].filter(e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).position!=='fixed'&&e.getBoundingClientRect().x<660).map(e=>{const r=e.getBoundingClientRect();return {n:e.querySelector('.battle-poke-name').innerText.replace(/ (Lv|Nv)\d+/,''),x:r.x+r.width/2,y:r.y+r.height/2};}));
  for(let i=0;i<want.length;i++){
    let c=await cards(); if(c[i].n===want[i]) continue; const j=c.findIndex(x=>x.n===want[i]); if(j<0){console.log('missing',want[i]);continue;}
    const a=c[j], b=c[i];
    if (b.y<0||a.y>window_h) {}
    await p.mouse.move(a.x,a.y); await p.mouse.down(); await p.waitForTimeout(150);
    for(let k=1;k<=25;k++){ await p.mouse.move(a.x+(b.x-a.x)*k/25, a.y+(b.y-a.y)*k/25); await p.waitForTimeout(30);} 
    await p.waitForTimeout(250); await p.mouse.up(); await p.waitForTimeout(1000);
  }
  console.log((await cards()).map(x=>x.n+'@'+Math.round(x.y)).join(', '));
});
const window_h=900;
