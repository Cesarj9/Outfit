require('./lib')(async p => {
  const [ax,ay,bx,by]=process.argv.slice(2).map(Number);
  await p.mouse.move(ax,ay); await p.mouse.down(); await p.waitForTimeout(150);
  for(let k=1;k<=25;k++){ await p.mouse.move(ax+(bx-ax)*k/25, ay+(by-ay)*k/25); await p.waitForTimeout(30);} 
  await p.waitForTimeout(250); await p.mouse.up(); await p.waitForTimeout(1200);
  console.log(await p.evaluate(()=>[...document.querySelectorAll('.elite-prep-player-side .battle-pokemon, .battle-side .battle-pokemon[data-idx]')].filter(e=>e.getBoundingClientRect().height>0&&getComputedStyle(e).position!=='fixed').map(e=>e.querySelector('.battle-poke-name').innerText+':'+(e.querySelector('.battle-poke-item')?.title||'')+'@'+Math.round(e.getBoundingClientRect().y))));
});
