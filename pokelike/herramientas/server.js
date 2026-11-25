const { chromium } = require('playwright');
(async () => {
  const ctx = await chromium.launchPersistentContext(__dirname + '/profile', { viewport: { width: 1280, height: 900 }, args: ['--remote-debugging-port=9222'] });
  const p = ctx.pages()[0] || await ctx.newPage();
  await p.goto('https://pokelike.xyz/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  console.log('ready');
  setInterval(()=>{}, 1e9);
})();
