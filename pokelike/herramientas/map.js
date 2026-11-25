require('./lib')(async p => {
  const r = await p.evaluate(() => {
    const gs=[...document.querySelectorAll('g.map-node')];
    const nodes=gs.map(g=>{ const b=g.getBoundingClientRect(); const img=g.querySelector('image.map-node-sprite'); return {id:g.dataset.nodeId, click:/clickable/.test(g.className.baseVal), done:/visited|done|completed|current/.test(g.className.baseVal)?g.className.baseVal:'', spr:img?(img.getAttribute('href')||'').replace(/^.*\//,'').replace('.png',''):'', cx:b.x+b.width/2, cy:b.y+b.height/2, sx:Math.round(b.x+b.width/2), sy:Math.round(b.y+b.height/2)}; });
    const svg=gs[0].ownerSVGElement; const E=[];
    for (const l of svg.querySelectorAll('line')) { const M=l.getScreenCTM(); const tp=(x,y)=>{const q=svg.createSVGPoint(); q.x=x; q.y=y; const t=q.matrixTransform(M); return [t.x,t.y];}; const a=tp(+l.getAttribute('x1'),+l.getAttribute('y1')), b=tp(+l.getAttribute('x2'),+l.getAttribute('y2'));
      const near=pt=>nodes.reduce((m,n)=>{const d=Math.hypot(n.cx-pt[0],n.cy-pt[1]); return d<m[0]?[d,n.id]:m},[1e9,null]);
      const A=near(a),B=near(b); E.push(A[1]+'>'+B[1]+(l.getAttribute('stroke-dasharray')?'':' (solid)')+(A[0]>15||B[0]>15?' ?':'')); }
    return {nodes,E};
  });
  const adj={}; r.E.forEach(e=>{const [a,b]=e.split(' ')[0].split('>'); (adj[a]=adj[a]||[]).push(b+(e.includes('solid')?'*':''));});
  r.nodes.forEach(n=>console.log(n.id.padEnd(5), (n.spr||'-').padEnd(16), n.click?'CLICK':'     ', n.done, '->', (adj[n.id]||[]).join(','), '@'+n.sx+','+n.sy));
});
