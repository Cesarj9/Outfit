require('./lib')(async p=>{
 for(let i=0;i<20;i++){
  const t=await p.locator('body').innerText();
  if(/Elige una reliquia con la que empezar/.test(t) && /Corona Antigua/.test(t)){console.log('crown after',i);return}
  await p.evaluate(()=>document.querySelector('.run-menu-btn--reset').click());await p.waitForTimeout(1200);
  await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>/REINICIAR DESDE EL PRINCIPIO/i.test(b.innerText));if(b)b.click()});await p.waitForTimeout(2500);
 }
 console.log('no crown');
})
