require('./lib')(async p => {
  await p.evaluate(() => { [...document.querySelectorAll('button,a')].find(e=>e.offsetParent && e.innerText.trim().toUpperCase()==='PC').click(); });
  await p.waitForTimeout(3000);
  await p.screenshot({ path: 'pc.png' });
  const t = await p.evaluate(() => document.body.innerText);
  const i=t.indexOf('PC\n\n'); console.log(t.slice(i, i+2500));
  const html = await p.evaluate(() => { const c=[...document.querySelectorAll('*')].find(e=>e.offsetParent && /^#\d{3}$/.test(e.innerText.trim())); let x=c; for(let k=0;k<4&&x;k++) x=x.parentElement; return x?x.outerHTML.slice(0,2500):'none'; });
  console.log('HTML', html);
});
