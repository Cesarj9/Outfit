// node relic.js "New relic" ["Relic to replace"]
require('./lib')(async p => {
  await p.locator('*:visible',{hasText:new RegExp('^'+process.argv[2]+'$')}).last().click(); await p.waitForTimeout(2000);
  const old=process.argv[3];
  if (old) console.log(await p.evaluate(old=>{ const els=[...document.querySelectorAll('*')].filter(x=>x.offsetParent && x.children.length===0 && /^(REPLACE|REEMPLAZAR|SUSTITUIR|CAMBIAR)$/i.test(x.innerText.trim())); if(!els.length) return 'no replace needed';
    let best=null; for(const x of els){ let c=x.parentElement; for(let i=0;i<5&&c;i++){ if(c.innerText.includes(old)) break; c=c.parentElement; } if(c && c.innerText.includes(old) && (c.innerText.match(/(REPLACE|REEMPLAZAR|SUSTITUIR|CAMBIAR)/g)||[]).length===1) { best=x; break; } }
    if(!best) return 'none'; best.click(); return 'replaced'; }, old));
  await p.waitForTimeout(2500);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('#passive-badges img[title]')].map(i=>i.title).join(', ')));
});
