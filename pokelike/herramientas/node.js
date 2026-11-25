// node node.js n1_0 [wait]
require('./lib')(async p => {
  const box = await p.evaluate(id=>{ const g=document.querySelector(`g.map-node[data-node-id="${id}"]`); const b=g.getBoundingClientRect(); return [b.x+b.width/2,b.y+b.height/2]; }, process.argv[2]);
  await p.mouse.click(box[0], box[1]);
  await p.waitForTimeout(+process.argv[3]||2500);
  console.log('clicked', process.argv[2]);
});
