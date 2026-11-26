// node vitamin.js "VITAMINA" Pokemon N : in the open mart, select vitamin and apply N times to Pokemon
require('./lib')(async p=>{ const [v,name,N]=[process.argv[2],process.argv[3],+process.argv[4]||1];
 const onList=await p.evaluate(()=>/Toca un Pokémon para añadir/.test(document.body.innerText));
 if(onList){ await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(e=>e.offsetParent&&/ATRÁS/.test(e.innerText));b&&b.click()}); await p.waitForTimeout(1200); }
 await p.locator(`text=${v}`).first().click(); await p.waitForTimeout(1500);
 for(let i=0;i<N;i++){ await p.evaluate(n=>{const c=[...document.querySelectorAll('.vitamin-card')].find(e=>new RegExp('^'+n+'\\b').test(e.innerText.trim()));c.scrollIntoView();c.click()},name); await p.waitForTimeout(700); }
 const t=(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ');
 console.log(v, t.match(/Saldo [0-9,]+/)?.[0],'|',t.match(new RegExp(name+'.{0,40}'))?.[0]);
});
