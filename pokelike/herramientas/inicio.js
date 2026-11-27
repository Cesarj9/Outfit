require('./lib')(async p=>{await p.getByText('INICIO',{exact:true}).first().click();await p.waitForTimeout(2500);console.log('ok')})
