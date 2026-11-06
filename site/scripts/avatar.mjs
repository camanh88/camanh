// Makes the round avatar (favicon) from the first photo of the In the making page (p1: Cam Anh from behind against the striped wall).
// Source: public/img/p1-1600.webp. Run in site/:  node scripts/avatar.mjs
import sharp from 'sharp';
import path from 'node:path';
const src = path.resolve('public', 'img', 'p1-1600.webp');
const out = path.resolve('public');
const crop = { left: 330, top: 120, width: 1160, height: 1160 };
const circle = (s) => Buffer.from(`<svg width="${s}" height="${s}"><circle cx="${s / 2}" cy="${s / 2}" r="${s / 2}" fill="#fff"/></svg>`);
for (const [name, size] of [['avatar-32.png', 32], ['avatar-64.png', 64], ['avatar-180.png', 180]]) {
  const img = await sharp(src).extract(crop).resize(size, size).png().toBuffer();
  await sharp(img).composite([{ input: circle(size), blend: 'dest-in' }]).png().toFile(path.join(out, name));
}
console.log('done');
