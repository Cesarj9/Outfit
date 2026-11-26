// node goalroll.js N : reset N times, print each objective + description
require('./lib')(async p=>{ const N=+process.argv[2]||5;
 for(let i=0;i<N;i++){
  if(i>0){ await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click()); await p.waitForTimeout(1800); }
  const t=await p.evaluate(()=>[...document.querySelectorAll('.achx-goal')].map(g=>g.title).join(' | '));
  await p.click('.achx-goal'); await p.waitForTimeout(900);
  const d=(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/El mapa te avisa antes\. (.{0,250})/)?.[1];
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  console.log(i, t, '=>', d);
 }
});
