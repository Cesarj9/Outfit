const fs=require('fs');
require('./lib')(async p => {
  const M='.game-modal-box--ach, .game-modal-box';
  const dump = (tab,reg) => p.evaluate(([tab,reg])=>{const m=[...document.querySelectorAll('.game-modal-box')].find(e=>e.offsetParent&&/ACHIEVEMENTS|LOGROS/.test(e.innerText));
    const out=[]; for(const sec of m.querySelectorAll('.achx-sec')){ const st=sec.querySelector('.achx-sec-title,[class*=sec-h]')?.innerText||sec.firstElementChild?.innerText||'';
      for(const r of sec.querySelectorAll('.achx-row')){ const main=r.querySelector('.achx-row-main'); const lines=(main?.innerText||'').split('\n').map(s=>s.trim()).filter(Boolean);
        out.push({tab,reg,sec:st.split('\n')[0],nombre:lines[0],desc:lines.slice(1).join(' | '),done:/achx-row--done/.test(r.className),tiers:r.querySelectorAll('.achx-dot').length,tiers_on:r.querySelectorAll('.achx-dot--on').length,fin:(r.querySelector('.achx-row-end')?.innerText||'').replace(/\n/g,' ')}); } }
    if(!out.length) for(const r of m.querySelectorAll('.achx-row')){const lines=(r.querySelector('.achx-row-main')?.innerText||'').split('\n').filter(Boolean);out.push({tab,reg,nombre:lines[0],desc:lines.slice(1).join(' | '),done:/achx-row--done/.test(r.className),fin:(r.querySelector('.achx-row-end')?.innerText||'').replace(/\n/g,' ')});}
    return out;},[tab,reg]);
  const all=[]; const head=await p.evaluate(()=>[...document.querySelectorAll('.achx-rank, .game-modal-desc')].map(e=>e.innerText.replace(/\n/g,' ')).join(' || '));
  for (const t of ['story','tower','chal','coll']) {
    await p.evaluate(t=>document.querySelector('.achx-tab--'+t).click(), t); await p.waitForTimeout(800);
    const regs = await p.evaluate(()=>[...document.querySelectorAll('.achx-reg')].map(e=>e.innerText.replace(/\n/g,' ')));
    if (!regs.length) all.push(...await dump(t,'')); 
    for (let i=0;i<regs.length;i++){ await p.evaluate(i=>document.querySelectorAll('.achx-reg')[i].click(), i); await p.waitForTimeout(600); all.push(...await dump(t,regs[i])); }
  }
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('.achx-tab')].map(e=>e.innerText.replace(/\n/g,' ')));
  fs.writeFileSync('ach.json', JSON.stringify({head,tabs,all},null,1));
  console.log(head, tabs, all.length, all.filter(a=>a.done).length);
});
