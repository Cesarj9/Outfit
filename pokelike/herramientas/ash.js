// node ash.js Pokemon [ITEM title]: on battle order screen, use bag item (default Sacred Ash) on Pokemon via its menu
require('./lib')(async p=>{ const it=process.argv[3]||'Sacred Ash';
 await p.locator('.item-badge:visible').filter({has:p.locator(`img[title="${it}"]`)}).first().click(); await p.waitForTimeout(1200);
 await p.evaluate(n=>{const r=[...document.querySelectorAll('.equip-pokemon-row')].find(e=>e.offsetParent&&new RegExp('^'+n).test(e.innerText.trim()));(r.querySelector('button')||r).click()},process.argv[2]); await p.waitForTimeout(1500);
 console.log((await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').match(/TU EQUIPO.{0,200}/)?.[0]);
});
