// node relrep.js "Old relic name (ES)"  -- on the 'Bolsa de reliquias llena' screen
require('./lib')(async p=>{ const old=process.argv[2];
 console.log(await p.evaluate(old=>{ const btns=[...document.querySelectorAll('*')].filter(x=>x.offsetParent&&x.children.length===0&&/^SUSTITUIR$/.test(x.innerText.trim()));
  for(const b of btns){ let c=b.parentElement; for(let i=0;i<4&&c;i++){ const m=(c.innerText.match(/SUSTITUIR/g)||[]).length; if(m===1&&c.innerText.includes(old)){ b.click(); return 'replaced '+old;} if(m>1) break; c=c.parentElement; } } return 'not found '+btns.length; },old));
 await p.waitForTimeout(2500);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('#passive-badges img[title]')].map(i=>i.title).join(', ')));
});
