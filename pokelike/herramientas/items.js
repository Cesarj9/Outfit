const { chromium } = require('playwright');
const fs=require('fs');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  await p.evaluate(() => { [...document.querySelectorAll('button,a')].find(e=>e.innerText.trim().toUpperCase()==='ITEMS').click(); });
  await p.waitForTimeout(3000);
  const t = await p.evaluate(() => { const h=[...document.querySelectorAll('*')].find(e=>e.children.length<3 && e.innerText && e.innerText.trim()==='ITEM GUIDE'); let c=h; while(c && c.innerText.length<5000) c=c.parentElement; return c?c.innerText:document.body.innerText; });
  fs.writeFileSync('items_guide.txt', t);
  // patch notes
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(4000);
  await p.evaluate(() => { [...document.querySelectorAll('button,a')].find(e=>e.innerText.trim().toUpperCase()==='PATCH NOTES').click(); });
  await p.waitForTimeout(3000);
  const pn = await p.evaluate(() => document.body.innerText);
  fs.writeFileSync('patch_notes.txt', pn.slice(pn.indexOf('PATCH NOTES\n\nWhat')));
  await b.close();
})();
