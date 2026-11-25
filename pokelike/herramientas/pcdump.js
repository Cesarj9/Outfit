const fs=require('fs');
const filt=process.argv[2]||'none';
require('./lib')(async p => {
  const grab = () => p.evaluate(() => [...document.querySelectorAll('#pc-modal .dex-card')].map(c => ({
    num: c.querySelector('.dex-num')?.innerText.trim(), name: c.querySelector('.dex-name')?.innerText.trim(),
    types: [...c.querySelectorAll('.type-badge')].map(t=>t.innerText.trim().toUpperCase()),
    buff: (c.querySelector('.pc-buff-stars')?.title||'').replace(/\D/g,'')||'0',
    cls: c.className, sprite: c.querySelector('img.dex-sprite')?.getAttribute('src'),
    fav: c.querySelector('.pc-fav-btn')?.className, extra: [...c.querySelectorAll('[title]')].map(e=>e.title).filter(t=>!/buff points|Favourite|Shiny!|Aurora:/.test(t)) })));
  // reset filters
  if (filt!=='none') { await p.evaluate(f=>document.querySelector(`#pc-modal [data-pcf="${f}"]`).click(), filt); await p.waitForTimeout(1500); }
  const desc = await p.evaluate(()=>document.querySelector('#pc-modal .game-modal-desc').innerText);
  const seen=new Map();
  const box = await p.evaluateHandle(()=>{ let e=document.querySelector('#pc-modal .dex-card'); while(e && !(e.scrollHeight>e.clientHeight+20 && /auto|scroll/.test(getComputedStyle(e).overflowY))) e=e.parentElement; return e; });
  for (let k=0;k<80;k++){
    for (const c of await grab()) seen.set(c.num+'|'+c.name, c);
    const done = await box.evaluate(e=>{ if(!e) return true; const b=e.scrollTop; e.scrollTop+=e.clientHeight*0.8; return e.scrollTop===b; });
    await p.waitForTimeout(250);
    if (done) { for (const c of await grab()) seen.set(c.num+'|'+c.name, c); break; }
  }
  await box.evaluate(e=>{ if(e) e.scrollTop=0; });
  if (filt!=='none') { await p.evaluate(f=>document.querySelector(`#pc-modal [data-pcf="${f}"]`).click(), filt); await p.waitForTimeout(800); }
  const arr=[...seen.values()];
  fs.writeFileSync(`pc_${filt}.json`, JSON.stringify({desc, arr},null,1));
  console.log(filt, desc, 'cards:', arr.length);
});
