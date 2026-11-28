import fs from 'fs';

const migration = fs.readFileSync('supabase/migrations/20261127000002_add_casagrand_evon.sql', 'utf8');
const dataFile = fs.readFileSync('src/data/casagrandEvonData.ts', 'utf8');
const pageFile = fs.readFileSync('src/pages/CasagrandEvonPage.tsx', 'utf8');

const checks = [
  { name: 'Slug', val: 'casagrand-evon-kompally' },
  { name: 'TG RERA', val: 'P02200009350' },
  { name: 'HMDA', val: '013326/BP/HMDA/2977/MED/2023' },
  { name: 'Promoter', val: 'Casagrand Hyderwise Private Limited' },
  { name: 'Land Extent', val: '6.84' },
  { name: 'Units', val: '579' },
  { name: 'Towers', val: '3' },
  { name: 'Clubhouse', val: '34,860' },
  { name: '3 BHK area', val: '2,075' },
  { name: '4 BHK area', val: '2,850' },
  { name: 'Completion Date', val: 'June 18, 2030' },
  { name: 'Developer Target', val: '2029' }
];

console.log('--- Checking presence across files ---');
checks.forEach(c => {
  const inMig = migration.includes(c.val);
  const inData = dataFile.includes(c.val);
  const inPage = pageFile.includes(c.val);
  console.log(`${c.name.padEnd(18)}: Migration=${inMig} | Data=${inData} | Page=${inPage}`);
});

console.log('\n--- Checking prohibition of unconfirmed/speculative claims ---');
const prohibited = [
  { name: '62% open space', pattern: /62%/ },
  { name: '67% open space', pattern: /67%/ },
  { name: 'Historic ₹7,099/sft', pattern: /7,?099/ },
  { name: 'Historic 1.46 Cr', pattern: /1\.46/ },
  { name: 'Walk-in closets', pattern: /walk-in/i },
  { name: 'Domestic staff room', pattern: /domestic staff/i },
  { name: 'Double balconies', pattern: /double balcon/i },
  { name: 'Carpet area claim for 2075', pattern: /2,?075.*carpet/i }
];

prohibited.forEach(p => {
  const inMig = p.pattern.test(migration);
  // Note: data file has discrepancy table internally, check if public data has it
  const inDataPublic = p.pattern.test(dataFile.split('CASAGRAND_EVON_DATA_DISCREPANCIES')[0]);
  const inPage = p.pattern.test(pageFile);
  console.log(`${p.name.padEnd(28)}: In Migration=${inMig} | In Public Data=${inDataPublic} | In Page=${inPage}`);
});
