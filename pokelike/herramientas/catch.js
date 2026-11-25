// node catch.js read | reroll <i> 
const readCards = p => p.evaluate(() => [...document.querySelectorAll('.poke-choice-wrap')].filter(w=>w.offsetParent).map((w,i) => { const c=w.querySelector('.poke-card'); const rb=[...w.querySelectorAll('button')].find(b=>/REROLL|VOLVER A TIRAR/i.test(b.innerText)); return { i, name:c.querySelector('.poke-name')?.innerText, lv:c.querySelector('.poke-level')?.innerText, cls:c.className.replace('poke-card','').trim(), tags:[...c.querySelectorAll('.variant-tag')].map(t=>t.title).join('/'), pc:c.querySelector('.dex-caught-badge')?.title||'', types:[...c.querySelectorAll('.poke-types .type-badge')].map(t=>t.innerText).join('/'), move:(c.querySelector('[class*=move]')||{}).innerText?.replace(/\s+/g,' ').slice(0,40), reroll: rb? (rb.disabled?'used':'avail') : 'none' }; }));
module.exports = readCards;
if (require.main === module) require('./lib')(async p => {
  const [cmd, i] = process.argv.slice(2);
  if (cmd === 'reroll') { const wraps = p.locator('.poke-choice-wrap'); await wraps.nth(+i).getByRole('button', { name: /reroll/i }).click({timeout:5000}); await p.waitForTimeout(1800); }
  console.log(JSON.stringify(await readCards(p)));
});
