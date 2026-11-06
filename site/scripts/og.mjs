// Share image (Open Graph): cream card with the greeting (from content/cover.md) and the first photo of the In the making page.
// Run in site/:  node scripts/og.mjs
import sharp from 'sharp';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const paras = readFileSync(path.join(ROOT, '..', 'content', 'cover.md'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('BUILD NOTE'));
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const [hello, intro] = [paras[0] ?? '', paras[1] ?? ''];
const cut = hello.indexOf(',') + 1;
const [h1, h2] = cut ? [hello.slice(0, cut).trim(), hello.slice(cut).trim()] : [hello, ''];
const wrap = (t, n) => t.split(' ').reduce((a, w) => { const l = a[a.length - 1]; if (l && (l + ' ' + w).length <= n) a[a.length - 1] = l + ' ' + w; else a.push(w); return a; }, []);
const photo = await sharp(path.join(ROOT, 'public', 'img', 'p1-960.webp')).resize(580, 630, { fit: "cover" }).toBuffer();
const lines = wrap(intro, 28).map((l, i) => `<text x="70" y="${400 + i * 36}" font-family="Georgia, serif" font-size="27" fill="#132605">${esc(l)}</text>`).join('');
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#F7ECCD"/>
<text x="70" y="200" font-family="Georgia, serif" font-size="72" fill="#132605">${esc(h1)}</text>
<text x="70" y="285" font-family="Georgia, serif" font-size="72" font-style="italic" fill="#922935">${esc(h2)}</text>${lines}</svg>`);
await sharp(svg).composite([{ input: photo, left: 620, top: 0 }]).jpeg({ quality: 88 }).toFile(path.join(ROOT, 'public', 'og.jpg'));
console.log('og.jpg written');
