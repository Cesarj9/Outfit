// node click.js "text" [nth] [wait]
require('./lib')(async p => {
  const loc = p.getByText(process.argv[2], { exact: true });
  const n = await loc.count(); const i = process.argv[3]? +process.argv[3] : n-1;
  await loc.nth(i).click({ timeout: 5000 });
  await p.waitForTimeout(+process.argv[4]||2000);
  console.log('clicked', n);
});
