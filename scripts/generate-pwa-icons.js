import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public');
const iconsDir = path.resolve(publicDir, 'icons');

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create high-res branded PWA icon SVG
function createSvgIcon(size, padding = 0) {
  const innerSize = size - padding * 2;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="50%" stop-color="#0B0F19"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>
      <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF9900"/>
        <stop offset="100%" stop-color="#FF6600"/>
      </linearGradient>
      <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#0284C7"/>
      </linearGradient>
      <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34D399"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <!-- Background rounded squircle -->
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#bgGrad)"/>
    <rect x="1.5" y="1.5" width="${size - 3}" height="${size - 3}" rx="${Math.round(size * 0.22) - 1.5}" stroke="#FF9900" stroke-opacity="0.3" stroke-width="2"/>

    <!-- Scaled inner topology graphic -->
    <g transform="translate(${padding}, ${padding}) scale(${innerSize / 100})">
      <!-- Glow ambient behind graphic -->
      <circle cx="50" cy="50" r="30" fill="#FF9900" fill-opacity="0.15" filter="url(#glow)"/>

      <!-- 3 Layers of Architecture Stack -->
      <!-- Top Layer (Compute/Frontend) -->
      <path d="M50 14L18 30L50 46L82 30L50 14Z" stroke="url(#orangeGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Middle Layer (Services/Messaging) -->
      <path d="M18 50L50 66L82 50" stroke="url(#greenGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Bottom Layer (Storage/Database) -->
      <path d="M18 70L50 86L82 70" stroke="url(#blueGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>

      <!-- Central pillar connector node dots -->
      <circle cx="50" cy="30" r="4" fill="#FF9900"/>
      <circle cx="50" cy="50" r="4" fill="#34D399"/>
      <circle cx="50" cy="70" r="4" fill="#38BDF8"/>
    </g>
  </svg>
  `.trim();
}

// Create Maskable icon SVG (full bleed background, graphic inside safe zone ~80%)
function createMaskableSvgIcon(size) {
  const padding = size * 0.15;
  const innerSize = size - padding * 2;
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none">
    <defs>
      <linearGradient id="bgGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0F172A"/>
        <stop offset="50%" stop-color="#0B0F19"/>
        <stop offset="100%" stop-color="#030712"/>
      </linearGradient>
      <linearGradient id="orangeGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF9900"/>
        <stop offset="100%" stop-color="#FF6600"/>
      </linearGradient>
      <linearGradient id="blueGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="100%" stop-color="#0284C7"/>
      </linearGradient>
      <linearGradient id="greenGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34D399"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
    </defs>

    <!-- Full bleed background for adaptive masks -->
    <rect width="${size}" height="${size}" fill="url(#bgGradMask)"/>

    <!-- Graphic strictly inside safe circle (80%) -->
    <g transform="translate(${padding}, ${padding}) scale(${innerSize / 100})">
      <path d="M50 14L18 30L50 46L82 30L50 14Z" stroke="url(#orangeGradMask)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 50L50 66L82 50" stroke="url(#greenGradMask)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 70L50 86L82 70" stroke="url(#blueGradMask)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="50" cy="30" r="4" fill="#FF9900"/>
      <circle cx="50" cy="50" r="4" fill="#34D399"/>
      <circle cx="50" cy="70" r="4" fill="#38BDF8"/>
    </g>
  </svg>
  `.trim();
}

async function generate() {
  console.log('Generating PWA icons...');

  // Standard icons
  const icon192Svg = Buffer.from(createSvgIcon(192, 16));
  await sharp(icon192Svg).png().toFile(path.join(iconsDir, 'icon-192x192.png'));

  const icon512Svg = Buffer.from(createSvgIcon(512, 40));
  await sharp(icon512Svg).png().toFile(path.join(iconsDir, 'icon-512x512.png'));

  // Apple touch icon (180x180)
  const appleTouchSvg = Buffer.from(createSvgIcon(180, 14));
  await sharp(appleTouchSvg).png().toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  await sharp(appleTouchSvg).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Maskable icons
  const maskable192Svg = Buffer.from(createMaskableSvgIcon(192));
  await sharp(maskable192Svg).png().toFile(path.join(iconsDir, 'icon-maskable-192x192.png'));

  const maskable512Svg = Buffer.from(createMaskableSvgIcon(512));
  await sharp(maskable512Svg).png().toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));

  // Standalone vector icon
  fs.writeFileSync(path.join(iconsDir, 'icon.svg'), createSvgIcon(512, 40));

  console.log('Successfully generated all PWA icons!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
