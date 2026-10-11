import fs from 'fs';
import path from 'path';

const file = path.resolve('dist/projects/canny-aravindam/index.html');
if (!fs.existsSync(file)) {
  console.error('dist/projects/canny-aravindam/index.html NOT FOUND');
  process.exit(1);
}

const html = fs.readFileSync(file, 'utf-8');
console.log('File size:', html.length, 'bytes');

const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
console.log('Description:', descMatch ? descMatch[1] : 'NONE');

const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
console.log('Canonical:', canonMatch ? canonMatch[1] : 'NONE');

const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
console.log('Robots:', robotsMatch ? robotsMatch[1] : 'NONE');

const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
console.log('OG Title:', ogTitleMatch ? ogTitleMatch[1] : 'NONE');

const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
console.log('OG Image:', ogImgMatch ? ogImgMatch[1] : 'NONE');

const hasRootContent = html.includes('Canny Aravindam');
console.log('Contains Canny Aravindam content:', hasRootContent);

const sitemapStatic = fs.readFileSync(path.resolve('public/sitemaps/static.xml'), 'utf-8');
const inSitemap = sitemapStatic.includes('https://www.naani.in/projects/canny-aravindam');
console.log('In public/sitemaps/static.xml:', inSitemap);
