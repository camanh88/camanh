// Share image (Open Graph): cream card with the greeting (from content/cover.md) and the first photo of the In the making page.
// The text is set in Cormorant Garamond (the page's display font, as on the Cover). It is drawn as outlines straight from the
// @fontsource font files, so no system font is needed.
// Run in site/:  node scripts/og.mjs
import sharp from 'sharp';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { create } from 'fontkitten';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const paras = readFileSync(path.join(ROOT, '..', 'content', 'cover.md'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('BUILD NOTE'));
const [hello, intro] = [paras[0] ?? '', paras[1] ?? ''];
const cut = hello.indexOf(',') + 1;
const [h1, h2] = cut ? [hello.slice(0, cut).trim(), hello.slice(cut).trim()] : [hello, ''];
const wrap = (t, n) => t.split(' ').reduce((a, w) => { const l = a[a.length - 1]; if (l && (l + ' ' + w).length <= n) a[a.length - 1] = l + ' ' + w; else a.push(w); return a; }, []);

// fonts: a style = the latin file first, then the vietnamese / latin-ext files for the rest of the letters
const dir = path.join(ROOT, 'node_modules', '@fontsource', 'cormorant-garamond', 'files');
const face = (w, st) => ['latin', 'vietnamese', 'latin-ext'].map((s) => create(readFileSync(path.join(dir, `cormorant-garamond-${s}-${w}-${st}.woff`))));
const faces = { light: face(300, 'normal'), lightItalic: face(300, 'italic'), regular: face(400, 'normal') };
// one line of text -> SVG outlines. x,y = left end of the baseline; track = letter-spacing in px
function text(str, style, x, y, size, fill, track = 0) {
  let out = '';
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    const font = faces[style].find((f) => f.hasGlyphForCodePoint(cp)) ?? faces[style][0];
    const g = font.glyphForCodePoint(cp);
    const k = size / font.unitsPerEm;
    const d = g.path?.toSVG();
    if (d) out += `<path transform="translate(${x.toFixed(2)} ${y}) scale(${k} ${-k})" d="${d}"/>`;
    x += g.advanceWidth * k + track;
  }
  return `<g fill="${fill}">${out}</g>`;
}

const photo = await sharp(path.join(ROOT, 'public', 'img', 'p1-960.webp')).resize(580, 630, { fit: 'cover' }).toBuffer();
const lines = wrap(intro, 27).map((l, i) => text(l, 'regular', 70, 400 + i * 46, 36, '#132605')).join('');
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#F7ECCD"/>
${text(h1, 'light', 70, 205, 100, '#132605', -3)}
${text(h2, 'lightItalic', 70, 300, 100, '#922935', -3)}${lines}</svg>`);
await sharp(svg).composite([{ input: photo, left: 620, top: 0 }]).jpeg({ quality: 88 }).toFile(path.join(ROOT, 'public', 'og.jpg'));
console.log('og.jpg written');
