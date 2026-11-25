// usage: node ev.js "<js expression run in page>" [wait ms] [screenshot]
require('./lib')(async p => {
  const code=process.argv[2]; const w=+process.argv[3]||1500;
  if (code && code!=='-') { const r = await p.evaluate(new Function(code)); if (r!==undefined) console.log(typeof r==='string'?r:JSON.stringify(r)); }
  await p.waitForTimeout(w);
  if (process.argv[4]) await p.screenshot({path: process.argv[4]});
});
