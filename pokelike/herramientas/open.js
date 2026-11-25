require('./lib')(async p => { const l=process.argv[2];
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await p.evaluate(l => { const el=[...document.querySelectorAll('button,a')].find(e=>e.offsetParent && e.innerText.trim().toUpperCase()===l); el.click(); }, l);
  await p.waitForTimeout(3000); });
