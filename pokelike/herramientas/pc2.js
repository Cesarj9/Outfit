require('./lib')(async p => {
  const r = await p.evaluate(() => {
    const m=document.getElementById('pc-modal');
    const cards=[...m.querySelectorAll('*')].filter(e=>/^#(007|072|063|010)$/.test(e.innerText.trim()) && e.children.length===0);
    return cards.map(c=>{let x=c; while(x && !/#\d{3}[\s\S]*♥/.test(x.innerText)) x=x.parentElement; return x.outerHTML.slice(0,1800);});
  });
  r.forEach(h=>console.log(h,'\n======'));
});
