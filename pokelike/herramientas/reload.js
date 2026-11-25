require('./lib')(async p => { await p.reload(); await p.waitForTimeout(6000); const t=await p.evaluate(()=>document.body.innerText); console.log(t.replace(/\s+/g,' ').slice(-90)); });
