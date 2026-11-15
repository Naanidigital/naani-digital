import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded';
const srcTargetDir = path.resolve('src/assets/urbanrise-sky-habitat');
const pubTargetDir = path.resolve('public/assets/urbanrise-sky-habitat');

fs.mkdirSync(srcTargetDir, { recursive: true });
fs.mkdirSync(pubTargetDir, { recursive: true });

const mappings = [
  {
    src: 'media_1794762728876_40b85879.webp',
    dest: 'urbanrise-skyhabitat-elevation-day.webp',
  },
  {
    src: 'media_1794762729997_3c5704c0.webp',
    dest: 'urbanrise-skyhabitat-tower-facade.webp',
  },
  {
    src: 'media_1794762729994_93f28089.jpg',
    dest: 'urbanrise-skyhabitat-drone-aerial-day.jpg',
  },
  {
    src: 'media_1794762730001_5d2239f3.webp',
    dest: 'urbanrise-skyhabitat-rooftop-skywalk.webp',
  },
  {
    src: 'media_1794762730015_9e4b08ee.jpg',
    dest: 'urbanrise-skyhabitat-central-courtyard-pool.jpg',
  },
  {
    src: 'media_1794762730002_39cb130c.webp',
    dest: 'urbanrise-skyhabitat-master-plan.webp',
  },
];

for (const m of mappings) {
  const srcPath = path.join(uploadedDir, m.src);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(srcTargetDir, m.dest));
    fs.copyFileSync(srcPath, path.join(pubTargetDir, m.dest));
    console.log(`Copied ${m.src} -> ${m.dest}`);
  } else {
    console.error(`Source missing: ${srcPath}`);
  }
}
console.log('All Sky Habitat assets organized successfully!');
