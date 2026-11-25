const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
  p.on('request', r => { if (!/\.(png|js|css|woff2?|ogg|mp3|json)(\?|$)/.test(r.url()) || r.method()!=='GET') console.log('REQ', r.method(), r.url().slice(0,150), (r.postData()||'').replace(/"password":"[^"]*"/,'"password":"***"').slice(0,200)); });
  p.on('response', async r => { if (r.request().method()!=='GET') console.log('RES', r.status(), r.url().slice(0,150), JSON.stringify(r.headers()).slice(0,300)); });
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(5000);
  await p.evaluate(()=>document.getElementById('btn-cloud-sync').click());
  await p.waitForTimeout(1500);
  await p.fill('input[placeholder="Username"]', 'zz_probe_nonexistent_user_123');
  await p.fill('input[placeholder="Password"]', 'wrongpass123');
  await p.evaluate(() => { const bs=[...document.querySelectorAll('button')].filter(b=>b.offsetParent && b.innerText.trim().toUpperCase()==='LOG IN'); bs[bs.length-1].click(); });
  await p.waitForTimeout(4000);
  console.log('MSG', await p.evaluate(() => [...document.querySelectorAll('*')].filter(e=>e.offsetParent && e.children.length===0 && /invalid|incorrect|wrong|not found|error/i.test(e.innerText)).map(e=>e.innerText).join(' | ')));
  await b.close();
})();
