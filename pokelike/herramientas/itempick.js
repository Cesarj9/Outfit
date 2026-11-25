// node itempick.js "Item" [Pokemon|BAG]
require('./lib')(async p => {
  await p.getByText(process.argv[2],{exact:true}).first().click(); await p.waitForTimeout(1500);
  const who=process.argv[3]||'BAG';
  const r=await p.evaluate(who=>{
    const btns=[...document.querySelectorAll('button')].filter(b=>b.offsetParent);
    if(who==='BAG'){ const b=btns.find(b=>/KEEP IN BAG|GUARDAR/i.test(b.innerText)); if(b){b.click();return 'bag';} return 'nobag:'+btns.map(b=>b.innerText).join('/'); }
    const b=btns.find(b=>/^(EQUIP|SWAP|EQUIPAR|CAMBIAR)$/i.test(b.innerText.trim()) && (b.closest('div')?.parentElement?.innerText||'').includes(who) && !(b.closest('div')?.parentElement?.innerText||'').includes('Mega Heracross'));
    let el=null; for(const x of btns){ if(!/^(EQUIP|SWAP|EQUIPAR|CAMBIAR)$/i.test(x.innerText.trim())) continue; let c=x.parentElement; while(c && !/(Lv|Nv)\s?\d/.test(c.innerText)) c=c.parentElement; if(c && new RegExp('(^|\\n)\\s*'+who+'\\s*\\n').test(c.innerText)) {el=x;break;} }
    if(el){ el.click(); return 'equipped '+who; } return 'notfound';
  }, who);
  await p.waitForTimeout(1500);
  console.log(r, await p.evaluate(()=>[...document.querySelectorAll('.team-slot')].filter(e=>e.offsetParent).map(e=>e.querySelector('.team-slot-name')?.innerText+':'+([...e.querySelectorAll('img')].map(i=>i.title).filter(Boolean).join(',')))), await p.evaluate(()=>[...document.querySelectorAll('#item-bar img')].map(i=>i.title)));
});
