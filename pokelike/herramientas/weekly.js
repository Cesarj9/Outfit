// node weekly.js Starter [hard]  -> main menu, challenges, weekly, Easy (or Hard), pick starter, print relic screen
require('./lib')(async p=>{
 const c=async re=>p.evaluate(s=>{const r=new RegExp(s,'i');const e=[...document.querySelectorAll('button,a')].filter(x=>x.offsetParent&&r.test(x.innerText.trim())&&x.innerText.length<40);if(!e.length)return false;e[e.length-1].click();return true},re);
 await c('^(MENÚ PRINCIPAL|INICIO)$'); await p.waitForTimeout(2500);
 await c('ACEPTAR DESAF'); await p.waitForTimeout(2500);
 await p.click('#chal-weekly'); await p.waitForTimeout(2500);
 const subs=p.locator('.weekly-sub'); console.log('subs',await subs.count());
 await subs.nth(process.argv[3]==='hard'?1:0).click(); await p.waitForTimeout(3000);
 console.log('starter', await p.evaluate(n=>{const c=[...document.querySelectorAll('.dex-card')].find(e=>e.offsetParent&&new RegExp('^'+n).test(e.innerText));if(!c)return false;c.click();return true},process.argv[2])); await p.waitForTimeout(3000);
 await p.evaluate(()=>{const m=document.querySelector('#mega-stones-modal');if(m&&m.offsetParent){const b=m.querySelector('.btn-icon-close');b&&b.click()}}); await p.waitForTimeout(800);
 console.log((await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/Elige una reliquia.{0,500}/i)?.[0]);
});
