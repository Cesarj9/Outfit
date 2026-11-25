require('./lib')(async p => {
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(2000);
  const t=await p.evaluate(()=>[...document.querySelectorAll('[class*="modal"],[id*="modal"]')].filter(e=>e.offsetParent&&e.innerText.trim()).map(e=>(e.id||e.className)+': '+e.innerText).join('\n###\n'));
  console.log(t.slice(0,2000));
  await p.screenshot({path:'cs.png'});
});
