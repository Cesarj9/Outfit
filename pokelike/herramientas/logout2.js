require('./lib')(async p => {
  await p.evaluate(()=>{window.confirm=()=>true;});
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click()); await p.waitForTimeout(1500);
  await p.evaluate(()=>[...document.querySelectorAll('button')].find(x=>x.offsetParent&&/CERRAR SESIÓN|LOG OUT/i.test(x.innerText)).click());
  await p.waitForTimeout(3000);
  await p.reload(); await p.waitForTimeout(5000);
  console.log((await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').slice(-120));
});
