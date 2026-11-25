// node go.js n3_2 : click node, wait until map clickable again or a non-battle screen appears; print status
require('./lib')(async p => {
  const id=process.argv[2];
  const box = await p.evaluate(id=>{ const g=document.querySelector(`g.map-node[data-node-id="${id}"]`); if(!g||!/clickable/.test(g.className.baseVal)) return null; const b=g.getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]; }, id);
  if(!box){ console.log('NOT CLICKABLE', id); return; }
  await p.mouse.click(box[0], box[1]);
  let scr='';
  for (let i=0;i<90;i++){ await p.waitForTimeout(1000);
    scr = await p.evaluate(()=>{ const clk=document.querySelectorAll('g.map-node--clickable').length; const vis=[...document.querySelectorAll('[class*=-screen],[id*=-screen]')].filter(e=>e.offsetParent).map(e=>(e.id||e.className.split(' ')[0])); return (clk && !vis.some(v=>/battle/.test(v)))?'MAP':vis.join(','); });
    if (scr==='MAP' || (scr && !/battle/.test(scr))) break; }
  await p.waitForTimeout(800);
  const team = await p.evaluate(()=>[...document.querySelectorAll('.team-slot')].filter(e=>e.offsetParent).map(e=>e.innerText.replace(/\n/g,' ')+' '+e.querySelector('.hp-bar-fill')?.style.width).join(' | '));
  const head = await p.evaluate(()=>{ const t=document.body.innerText; const i=t.indexOf('DISCORD'); return t.slice(i+7,i+400).replace(/\n+/g,' | '); });
  const clk = await p.evaluate(()=>[...document.querySelectorAll('g.map-node--clickable')].map(g=>g.dataset.nodeId+':'+(g.querySelector('image.map-node-sprite')?.getAttribute('href')||'').replace(/^.*\//,'').replace('.png','')).join(' '));
  console.log('SCREEN', scr, '\nTEAM', team, '\nNEXT', clk, '\nTEXT', head.slice(0,400));
});
