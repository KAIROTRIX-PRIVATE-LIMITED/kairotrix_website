const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read the black symbol SVG
const blackSymbolSvgPath = path.resolve('public/assets/brand/ASSTES/SYMBOL/KAIROTRIX_Symbol_Black.svg');
const blackSymbolContent = fs.readFileSync(blackSymbolSvgPath, 'utf8');

// Extract the <g id="logo-w">...</g> content
const logoMatch = blackSymbolContent.match(/<g id="logo-w">([\s\S]*?)<\/g>\s*<\/g>/);
if (!logoMatch) {
  console.error('Could not find logo-w');
  process.exit(1);
}
const logoContent = logoMatch[1];

// Circular White Badge with Black KAIROTRIX Logo
// Diameter 540, radius 270. Scale factor 0.65 places the 4 outer tips perfectly inside the circle with safety padding
// so that circular platforms (like Google Search, mobile home screens, and browser tabs) never clip the symbol.
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 540 540" width="540" height="540">
  <defs>
    <style>
      .cls-1 { fill: #08080c; }
    </style>
  </defs>
  <circle cx="270" cy="270" r="270" fill="#FFFFFF"/>
  <g id="logo-w" transform="translate(270 270) scale(0.65) translate(-270 -270)">
${logoContent}
  </g>
</svg>
`;

async function main() {
  // 1. Write src/app/icon.svg and public/icon.svg
  fs.writeFileSync(path.resolve('src/app/icon.svg'), faviconSvg, 'utf8');
  fs.writeFileSync(path.resolve('public/icon.svg'), faviconSvg, 'utf8');
  console.log('Updated icon.svg in src/app and public (rounded white circle bg, black logo)');

  // 2. Generate 180x180 apple-icon.png
  const appleIconBuffer = await sharp(Buffer.from(faviconSvg))
    .resize(180, 180)
    .png()
    .toBuffer();
  fs.writeFileSync(path.resolve('src/app/apple-icon.png'), appleIconBuffer);
  fs.writeFileSync(path.resolve('public/apple-icon.png'), appleIconBuffer);
  console.log('Updated apple-icon.png in src/app and public');

  // 3. Generate 48x48 PNG for Google Search standard favicon size and 32x32 for favicon.ico
  const png48Buffer = await sharp(Buffer.from(faviconSvg))
    .resize(48, 48)
    .png()
    .toBuffer();
  fs.writeFileSync(path.resolve('public/favicon-48x48.png'), png48Buffer);

  const png32Buffer = await sharp(Buffer.from(faviconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();

  // Create standard ICO file with PNG payload
  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // icon type (1)
  icoHeader.writeUInt16LE(1, 4); // 1 image
  icoHeader.writeUInt8(32, 6);   // width 32
  icoHeader.writeUInt8(32, 7);   // height 32
  icoHeader.writeUInt8(0, 8);    // color count
  icoHeader.writeUInt8(0, 9);    // reserved
  icoHeader.writeUInt16LE(1, 10); // color planes
  icoHeader.writeUInt16LE(32, 12); // bits per pixel
  icoHeader.writeUInt32LE(png32Buffer.length, 14); // image size
  icoHeader.writeUInt32LE(22, 18); // offset to image data

  const icoBuffer = Buffer.concat([icoHeader, png32Buffer]);
  fs.writeFileSync(path.resolve('src/app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuffer);
  console.log('Updated favicon.ico in src/app and public');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
