const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const out16 = path.join(publicDir, 'favicon-16.png');
  const out32 = path.join(publicDir, 'favicon-32.png');
  const outIco = path.join(publicDir, 'favicon.ico');

  const svg = await fs.readFile(svgPath);

  await sharp(svg).resize(32, 32).png().toFile(out32);
  await sharp(svg).resize(16, 16).png().toFile(out16);

  console.log('Generated:', out16, out32);
}

generate().catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
