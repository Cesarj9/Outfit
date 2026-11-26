// node leaderloop.js N "Leader1,Leader2,..." : reset until objective = Elección Táctica and map-1 leader is in list
require('./lib')(async p=>{ const N=+process.argv[2]||40; const OK=(process.argv[3]||'').split(',').map(s=>s.trim().toLowerCase());
 for(let k=0;k<N;k++){
  const t=(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ');
  const leader=t.split(' INICIO ')[0].trim(); const goal=await p.evaluate(()=>[...document.querySelectorAll('.achx-goal')].map(g=>g.title).join(' | '));
  console.log(k,leader,'|',goal);
  if(/Elecci/.test(goal)&&(OK.includes('*')||OK.includes(leader.toLowerCase()))){console.log('HIT',leader);return;}
  await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click()); await p.waitForTimeout(1800);
 }
});
