require('./lib')(async p=>{await p.screenshot({path:'q.png'});console.log((await p.locator('body').innerText()).replace(/\s+/g,' ').slice(0,1500))})
