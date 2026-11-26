import fs from 'fs';
import path from 'path';

const userUploadsDir = 'C:\\Users\\PC\\.gemini\\antigravity\\brain\\10365bfc-d17a-44c5-981e-875f927c8a18\\.user_uploaded';
const srcAssetsDir = path.resolve('src/assets/sunyuga-vantara');
const publicAssetsDir = path.resolve('public/assets/sunyuga-vantara');

[srcAssetsDir, publicAssetsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const assetMappings = [
  {
    src: path.join(userUploadsDir, 'media_1795704802390_043ebb92.jpg'),
    destName: 'sunyuga-vantara-aerial-drone-day.jpg'
  },
  {
    src: path.join(userUploadsDir, 'media_1795704855955_037bacb9.webp'),
    destName: 'sunyuga-vantara-clubhouse-elevation.webp'
  },
  {
    src: path.join(userUploadsDir, 'media_1795712446308_a311dab5.jpg'),
    destName: 'sunyuga-vantara-master-plan-layout.jpg'
  }
];

assetMappings.forEach(({ src, destName }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(srcAssetsDir, destName));
    fs.copyFileSync(src, path.join(publicAssetsDir, destName));
    console.log(`Copied ${destName} successfully.`);
  } else {
    console.warn(`Source not found: ${src}`);
  }
});

console.log('All Sunyuga Vantara assets setup completed!');
