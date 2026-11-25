// node equip.js "Item name" Pokemon
require('./lib')(async p => {
  await p.getByText(process.argv[2],{exact:true}).last().click({timeout:5000}); await p.waitForTimeout(2000);
  const r = await p.evaluate(n=>{ const r=[...document.querySelectorAll('.equip-pokemon-row')].find(x=>x.offsetParent && x.querySelector('.equip-poke-name')?.innerText===n); if(!r) return 'no row'; const b=[...r.querySelectorAll('button')].find(b=>/EQUIP|REEMPLAZ|CAMBIAR/i.test(b.innerText))||r.querySelector('button'); b.click(); return r.innerText.replace(/\s+/g,' '); }, process.argv[3]);
  await p.waitForTimeout(1500); console.log(r);
});
