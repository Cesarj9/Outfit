const { chromium } = require('playwright');
module.exports = async function run(fn) {
  const b = await chromium.connectOverCDP('http://localhost:9222');
  const p = b.contexts()[0].pages()[0];
  try { await fn(p); } finally { await b.close().catch(()=>{}); }
};
