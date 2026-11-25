require('./lib')(async p => {
  await p.keyboard.press('Escape'); await p.waitForTimeout(700);
  await p.evaluate(()=>{ const m=document.getElementById('pokedex-modal'); const c=m&&m.querySelector('.btn-icon-close'); c&&c.click(); });
  await p.waitForTimeout(700);
  await p.evaluate(()=>{ const c=[...document.querySelectorAll('button,a,div')].filter(e=>e.offsetParent && /TAKE CHALLENGE/i.test(e.innerText) && e.innerText.length<40); c[c.length-1].click(); });
  await p.waitForTimeout(2500);
  await p.screenshot({path:'ch.png'});
  console.log(await p.evaluate(()=>document.body.innerText.slice(0,2500)));
});
