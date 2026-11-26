// click the visible SALTAR button (relic/item skip)
require('./lib')(async p=>{ console.log(await p.evaluate(()=>{const b=[...document.querySelectorAll('button,div,span')].filter(e=>e.offsetParent&&e.innerText.trim()==='SALTAR');if(!b.length)return 'none';b[b.length-1].click();return 'skipped'})); await p.waitForTimeout(2000); });
