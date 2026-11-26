// node elect.js N GOALRE PARTNERRE : reset until goal matches GOALRE and first pokeball node offers an aurora whose types match PARTNERRE (after rerolls). Stays on catch screen on hit.
const readCards=require('./catch.js');
require('./lib')(async p=>{
 const N=+process.argv[2]||50, G=new RegExp(process.argv[3]||'Elecci'), T=new RegExp(process.argv[4]||'PSÍQUICO');
 const F={NORMAL:2,'HIELO':2,ROCA:2,SINIESTRO:2,ACERO:2,VENENO:.5,VOLADOR:.5,'PSÍQUICO':.5,BICHO:.5,HADA:.5,FANTASMA:0};
 const P={LUCHA:2,VENENO:2,'PSÍQUICO':.5,ACERO:.5,SINIESTRO:0};
 const eff=(tab,types)=>types.split('/').reduce((m,t)=>m*(tab[t.trim()]??1),1);
 const fs=require('fs'); let att=0; try{att=JSON.parse(fs.readFileSync('elect_count.json')).n}catch(e){}
 const resists=c=>(eff(F,c.types)<1||eff(P,c.types)<1);
 const ok=c=>resists(c)&&(/aurora/.test(c.cls)||(att>=50&&/shiny/.test(c.cls)));
 for(let k=0;k<N;k++){
  const goal=await p.evaluate(()=>[...document.querySelectorAll('.achx-goal')].map(g=>g.title).join(' | '));
  if(G.test(goal)){
   const nodes=await p.evaluate(()=>[...document.querySelectorAll('g.map-node')].map(g=>({id:g.dataset.nodeId,spr:(g.querySelector('image.map-node-sprite')?.getAttribute('href')||'')})));
   const pb=nodes.find(n=>/^n1_/.test(n.id)&&/pokeball/.test(n.spr));
   if(pb){
    const box=await p.evaluate(id=>{const b=document.querySelector(`g.map-node[data-node-id="${id}"]`).getBoundingClientRect();return [b.x+b.width/2,b.y+b.height/2]},pb.id);
    await p.mouse.click(box[0],box[1]); await p.waitForTimeout(2200);
    let cards=await readCards(p); const seen=cards.map(c=>c.name+(c.cls?'['+c.cls+']':''));
    for(let i=0;i<cards.length&&!cards.some(ok);i++){ if(cards[i].reroll!=='avail'||/aurora|shiny/.test(cards[i].cls)) continue;
      const b=p.locator('.poke-choice-wrap').nth(i).getByRole('button',{name:/volver a tirar/i}); if(await b.count()){await b.click();await p.waitForTimeout(1200);cards=await readCards(p);seen.push(cards[i].name+(cards[i].cls?'['+cards[i].cls+']':''));} }
    att++; fs.writeFileSync('elect_count.json',JSON.stringify({n:att})); console.log(k,'att',att,goal,'|',seen.join(', '));
    const hit=cards.find(ok); if(hit){console.log('HIT',JSON.stringify(hit));return;}
   } else console.log(k,goal,'| no pokeball');
  }
  await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click()); await p.waitForTimeout(1800);
 }
});
