require('./lib')(async p=>{const b=p.locator('button.btn-icon-close:visible');if(await b.count())await b.first().click();await p.waitForTimeout(800);console.log('closed')})
