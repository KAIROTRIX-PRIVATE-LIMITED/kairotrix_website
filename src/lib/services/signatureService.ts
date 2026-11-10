import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import prisma from '@/lib/prisma';
import { isCloudinaryConfigured, uploadToCloudinary } from '@/lib/cloudinary';

/**
 * CRC32 table for in-memory PNG synthesis
 */
const crcTable: number[] = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function computeCrc32(buf: Buffer): number {
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function makePngBuffer(w: number, h: number, rgb: Buffer, alpha: Buffer): Buffer {
  const IHDR = Buffer.alloc(13);
  IHDR.writeUInt32BE(w, 0);
  IHDR.writeUInt32BE(h, 4);
  IHDR[8] = 8;
  IHDR[9] = 6;
  IHDR[10] = 0;
  IHDR[11] = 0;
  IHDR[12] = 0;

  const rowSize = w * 4 + 1;
  const rawRows = Buffer.alloc(h * rowSize);
  for (let y = 0; y < h; y++) {
    rawRows[y * rowSize] = 0;
    for (let x = 0; x < w; x++) {
      const srcIdx = y * w + x;
      const dstIdx = y * rowSize + 1 + x * 4;
      rawRows[dstIdx] = rgb[srcIdx * 3];
      rawRows[dstIdx + 1] = rgb[srcIdx * 3 + 1];
      rawRows[dstIdx + 2] = rgb[srcIdx * 3 + 2];
      rawRows[dstIdx + 3] = alpha[srcIdx];
    }
  }

  const idatData = zlib.deflateSync(rawRows);

  function chunk(type: string, data: Buffer) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 'ascii');
    data.copy(buf, 8);
    const crc = computeCrc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([pngHeader, chunk('IHDR', IHDR), chunk('IDAT', idatData), chunk('IEND', Buffer.alloc(0))]);
}

/**
 * Extract COO signature in-memory from the reference PDF if available
 */
export function extractSignatureFromReferencePdf(): Buffer | null {
  try {
    const pdfPath = path.join(process.cwd(), 'docs', 'KTINT2026003_20261106_104031_0000.pdf');
    if (!fs.existsSync(pdfPath)) return null;

    const buf = fs.readFileSync(pdfPath);
    const content = buf.toString('binary');
    const regex = /<<([^>]*\/Subtype\s*\/Image[^>]*)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let m;
    const streams: { dict: string; data: Buffer }[] = [];
    while ((m = regex.exec(content)) !== null) {
      streams.push({ dict: m[1], data: Buffer.from(m[2], 'binary') });
    }

    if (streams.length > 4) {
      // Stream 1: 480x343 RGB; Stream 4: 480x343 Alpha
      const rgb = zlib.inflateSync(streams[1].data);
      const alpha = zlib.inflateSync(streams[4].data);
      return makePngBuffer(480, 343, rgb, alpha);
    }
  } catch (err) {
    console.error('Error extracting signature from reference PDF:', err);
  }
  return null;
}

/**
 * Securely fetch the COO signature:
 * 1. Checks PostgreSQL InternshipProgramConfig.cooSignatureData
 * 2. If empty, lazily extracts from reference PDF, saves into DB, and returns it.
 */
export async function getCooSignatureSecurely(): Promise<string | null> {
  const config = await prisma.internshipProgramConfig.findUnique({
    where: { id: 'default' },
  });

  if (config?.cooSignatureData) {
    return config.cooSignatureData;
  }

  // Lazy initialize if not yet saved in DB
  const extracted = extractSignatureFromReferencePdf();
  if (extracted) {
    let signatureUrl = `data:image/png;base64,${extracted.toString('base64')}`;

    // If Cloudinary is configured, optionally mirror it to Cloudinary in private folder
    if (isCloudinaryConfigured()) {
      try {
        const uploadResult = await uploadToCloudinary(extracted, {
          folder: 'kairotrix/confidential/signatures',
          publicId: `coo-signature-${Date.now()}`,
          resourceType: 'image',
        });
        if (uploadResult?.secureUrl) {
          signatureUrl = uploadResult.secureUrl;
        }
      } catch (cldErr) {
        console.warn('Cloudinary signature upload fallback to data URI:', cldErr);
      }
    }

    await prisma.internshipProgramConfig.upsert({
      where: { id: 'default' },
      update: { cooSignatureData: signatureUrl },
      create: {
        id: 'default',
        cooSignatureData: signatureUrl,
      },
    });

    return signatureUrl;
  }

  return null;
}

/**
 * Save new COO Signature to DB and/or Cloudinary
 */
export async function saveCooSignature(buffer: Buffer, mimeType: string = 'image/png'): Promise<string> {
  let signatureUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;

  if (isCloudinaryConfigured()) {
    try {
      const uploadResult = await uploadToCloudinary(buffer, {
        folder: 'kairotrix/confidential/signatures',
        publicId: `coo-signature-${Date.now()}`,
        resourceType: 'image',
      });
      if (uploadResult?.secureUrl) {
        signatureUrl = uploadResult.secureUrl;
      }
    } catch (cldErr) {
      console.warn('Could not mirror signature to Cloudinary, saving in DB:', cldErr);
    }
  }

  await prisma.internshipProgramConfig.upsert({
    where: { id: 'default' },
    update: { cooSignatureData: signatureUrl },
    create: {
      id: 'default',
      cooSignatureData: signatureUrl,
    },
  });

  return signatureUrl;
}

/**
 * Delete COO Signature
 */
export async function deleteCooSignature(): Promise<void> {
  await prisma.internshipProgramConfig.update({
    where: { id: 'default' },
    data: { cooSignatureData: null },
  });
}

