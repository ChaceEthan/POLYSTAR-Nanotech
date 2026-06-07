import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const logoPath = join(root, "frontend", "public", "brand", "orginal logo11.png");
const brandDir = join(root, "frontend", "public", "brand");
const publicDir = join(root, "frontend", "public");

const pngIcons = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["favicon-48x48.png", 48],
  ["icon-192x192.png", 192],
  ["icon-512x512.png", 512],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
  ["apple-touch-icon.png", 180]
];

async function renderPng(size) {
  return sharp(logoPath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png({ compressionLevel: 9, quality: 95 })
    .toBuffer();
}

function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const image of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 0);
    entry.writeUInt8(image.size >= 256 ? 0 : image.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(image.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += image.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.buffer)]);
}

await mkdir(brandDir, { recursive: true });

for (const [filename, size] of pngIcons) {
  const rendered = await renderPng(size);
  await writeFile(join(brandDir, filename), rendered);
  if (["favicon-16x16.png", "favicon-32x32.png", "apple-touch-icon.png", "android-chrome-192x192.png", "android-chrome-512x512.png"].includes(filename)) {
    await writeFile(join(publicDir, filename), rendered);
  }
}

const icoImages = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    buffer: await renderPng(size)
  }))
);

await writeFile(join(publicDir, "favicon.ico"), createIco(icoImages));
