// Cuts the corner piece for the Contact page from the straw-mat photo (assets/Chiếu cói Việt Nam.jpg):
// a square of the coloured weave, shown as a triangle in the bottom-right corner of the page.
// Run in site/:  node scripts/coi-images.mjs
import sharp from 'sharp';
import path from 'node:path';
const src = path.resolve('..', 'assets', 'Chiếu cói Việt Nam.jpg');
const out = path.resolve('public', 'img');
await sharp(src).extract({ left: 0, top: 300, width: 1000, height: 1000 }).resize(800).webp({ quality: 78 }).toFile(path.join(out, 'coi-corner.webp'));
console.log('done');
