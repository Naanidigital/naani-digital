import fs from 'fs';
import path from 'path';

const searchIndexPath = path.resolve('naani-main/src/lib/searchIndex.ts');
if (fs.existsSync(searchIndexPath)) {
  const content = fs.readFileSync(searchIndexPath, 'utf8');
  console.log('searchIndex.ts exists, length:', content.length);
  // print all paths in searchIndex
  const paths = content.match(/path:\s*["']([^"']+)["']/g);
  if (paths) {
    console.log(`Found ${paths.length} paths in searchIndex:`);
    const projectPaths = paths.filter(p => p.includes('/projects/'));
    console.log(`Project paths (${projectPaths.length}):`);
    projectPaths.forEach(p => console.log('  ', p));
  }
} else {
  console.log('searchIndex.ts does not exist');
}
