require('./lib')(async p => {
  await p.waitForTimeout(3000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(1500);
  await p.fill('input[placeholder="Username"]', process.env.PU);
  await p.fill('input[placeholder="Password"]', process.env.PP);
  await p.evaluate(() => { const bs=[...document.querySelectorAll('button')].filter(b=>b.offsetParent && b.innerText.trim().toUpperCase()==='LOG IN'); bs[bs.length-1].click(); });
  await p.waitForTimeout(7000);
  await p.screenshot({ path: 'after_login.png' });
  const t = await p.evaluate(() => document.body.innerText);
  console.log(t.slice(0,1500));
});
