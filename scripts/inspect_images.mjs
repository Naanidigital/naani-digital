import fs from 'fs';
import path from 'path';

const uploadedDir = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded';

const files = [
  'media_1794762728876_40b85879.webp',
  'media_1794762729994_93f28089.jpg',
  'media_1794762729997_3c5704c0.webp',
  'media_1794762730001_5d2239f3.webp',
  'media_1794762730002_39cb130c.webp',
  'media_1794762730015_9e4b08ee.jpg',
];

for (const f of files) {
  const p = path.join(uploadedDir, f);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(f, 'size:', stat.size);
  } else {
    console.log(f, 'MISSING');
  }
}
