import sharp from 'sharp';
import path from 'path';

const avifFile = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded/media_1794762728876_40b85879.avif';
const webpFile = 'C:/Users/PC/.gemini/antigravity/brain/10365bfc-d17a-44c5-981e-875f927c8a18/.user_uploaded/media_1794762728876_40b85879.webp';

async function run() {
  const meta = await sharp(avifFile).metadata();
  console.log('AVIF Metadata:', meta.width, 'x', meta.height, meta.format);
  await sharp(avifFile).webp({ quality: 90 }).toFile(webpFile);
  console.log('Converted successfully to WebP:', webpFile);
}

run().catch(console.error);
