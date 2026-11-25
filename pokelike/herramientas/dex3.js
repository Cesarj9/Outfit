require('./lib')(async p => {
  console.log(await p.evaluate(() => [...document.querySelectorAll('button,a')].filter(e=>/dex/i.test(e.innerText+e.id+e.className+(e.title||''))).map(e=>e.tagName+'#'+e.id+'.'+e.className+' ['+e.innerText.trim()+'] '+e.title)));
  await p.evaluate(() => { const b=[...document.querySelectorAll('button,a')].find(e=>/dex/i.test(e.id+(e.title||''))); b.click(); });
  await p.waitForTimeout(2500);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('[id$="modal"]')].filter(e=>getComputedStyle(e).display!=='none').map(e=>e.id+' '+e.querySelectorAll('.dex-card').length+' '+e.innerText.slice(0,300))));
});
