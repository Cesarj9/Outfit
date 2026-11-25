// node step.js <nodeId|-> : click node then print status
require('./lib')(async p => {
  const id=process.argv[2];
  if (id && id!=='-') { const box = await p.evaluate(id=>{ const g=document.querySelector(`g.map-node[data-node-id="${id}"]`); if(!g) return null; const b=g.getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]; }, id); if(!box){console.log('NO NODE');return;} await p.mouse.click(box[0], box[1]); }
  for (let i=0;i<40;i++) { await p.waitForTimeout(700); const busy = await p.evaluate(()=>!!document.querySelector('.battle-screen:not([hidden]), #battle-screen.active') && ![...document.querySelectorAll('g.map-node--clickable')].length); if(!busy) break; }
  await p.waitForTimeout(800);
  const r = await p.evaluate(()=>{
    const team=[...document.querySelectorAll('*')].filter(e=>e.offsetParent && /^(TEAM|EQUIPO)\n/.test(e.innerText)).map(e=>e.innerText.replace(/\n/g,' '))[0]||'';
    const hp=[...document.querySelectorAll('[class*=team] [class*=hp], [class*=party] [class*=hp]')].filter(e=>e.offsetParent && e.style && e.style.width).map(e=>e.style.width).join(' ');
    const click=[...document.querySelectorAll('g.map-node--clickable')].map(g=>g.dataset.nodeId+':'+(g.querySelector('image.map-node-sprite')?.getAttribute('href')||'').replace(/^.*\//,'').replace('.png','')).join(' ');
    const overlays=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent && /fixed|absolute/.test(getComputedStyle(e).position) && e.innerText && e.innerText.length>30 && e.innerText.length<3000 && !/^TEAM|^TRAITS|^ITEMS|^HOME/.test(e.innerText) && parseInt(getComputedStyle(e).zIndex||0)>5).map(e=>e.innerText.replace(/\n+/g,' | ').slice(0,700));
    return {team, hp, click, overlays:[...new Set(overlays)].slice(0,3)};
  });
  console.log(JSON.stringify(r,null,0));
});
