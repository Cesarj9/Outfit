// target-only mode if TARGETS set (attempts 1-50), else any new aurora
const known=new Set(require('./known_aurora.json').concat((process.env.PENDING||'').split(',')));
const targets=process.env.TARGETS? new Set(process.env.TARGETS.split(',')) : null;
module.exports = c => /aurora/i.test(c.cls) && !known.has(c.name) && (!targets || targets.has(c.name));
