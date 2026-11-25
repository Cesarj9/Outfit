// node startrun.js Starter
require('./lib')(async p => {
  const clickTxt = async re => p.evaluate(s=>{ const r=new RegExp(s,'i'); const e=[...document.querySelectorAll('button,a')].filter(x=>x.offsetParent && r.test(x.innerText.trim()) && x.innerText.length<40); if(!e.length) return false; e[e.length-1].click(); return true; }, re);
  await clickTxt('^(MENÚ PRINCIPAL|MAIN MENU|INICIO|HOME)$'); await p.waitForTimeout(2500);
  await clickTxt('ACEPTAR DESAF|TAKE CHALLENGE'); await p.waitForTimeout(2500);
  console.log('chal btn', await p.evaluate(t=>{const b=t==='gym'?document.querySelector('.chal-intro--launch:not(.chal-endless-launch)'):document.querySelector('.chal-cta-short.type-'+t); if(!b) return [...document.querySelectorAll('[class*=chal-cta-short]')].map(x=>x.className).join(','); b.click(); return true;}, process.env.TYPE||'fighting')); await p.waitForTimeout(3000);
  console.log('starter', await p.evaluate(n=>{ const c=[...document.querySelectorAll('.dex-card')].find(e=>e.offsetParent && new RegExp('^'+n).test(e.innerText)); if(!c) return false; c.click(); return true; }, process.argv[2])); await p.waitForTimeout(3000);
  await p.evaluate(()=>{ const m=document.querySelector('#mega-stones-modal'); if(m && m.offsetParent){ const b=m.querySelector('.btn-icon-close'); b&&b.click(); } }); await p.waitForTimeout(800);
  console.log((await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/(Elige una Reliquia|Choose a Starting).{0,500}/i)?.[0]);
});
