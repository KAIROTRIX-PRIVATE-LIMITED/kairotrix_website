/**
 * KAIROTRIX — Cloudinary Asset Migration Script
 *
 * Scans local videos and service images, uploads them to your Cloudinary cloud,
 * and updates all corresponding Project and Insight records in PostgreSQL.
 *
 * Run via:
 *   npx tsx scripts/migrate-assets-to-cloudinary.ts
 */

import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function main() {
  console.log('🚀 Starting KAIROTRIX Cloudinary Asset Migration...');

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('❌ Error: Cloudinary credentials not found in .env.');
    console.error('Please add:');
    console.error('  CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('  CLOUDINARY_API_KEY=your_api_key');
    console.error('  CLOUDINARY_API_SECRET=your_api_secret');
    process.exit(1);
  }

  const videosDir = path.join(process.cwd(), 'public', 'assets', 'videos');
  const imagesDir = path.join(process.cwd(), 'public', 'assets', 'images', 'service');

  const uploadedVideos: Record<string, string> = {};
  const uploadedImages: Record<string, string> = {};

  // 1. Upload Videos
  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir).filter((f) => f.endsWith('.mp4') || f.endsWith('.webm'));
    console.log(`\n📹 Found ${videoFiles.length} videos to upload...`);

    for (const file of videoFiles) {
      const filePath = path.join(videosDir, file);
      const publicId = file.replace(/\.[^/.]+$/, '');
      console.log(`  ⬆️ Uploading video: ${file}...`);

      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'kairotrix/videos',
          resource_type: 'video',
          public_id: publicId,
          overwrite: true,
          transformation: [{ quality: 'auto' }],
        });
        uploadedVideos[`/assets/videos/${file}`] = res.secure_url;
        console.log(`     ✅ URL: ${res.secure_url}`);
      } catch (err: any) {
        console.error(`     ❌ Failed to upload ${file}:`, err.message);
      }
    }
  }

  // 2. Upload Images
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter((f) => f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpg'));
    console.log(`\n🖼️ Found ${imageFiles.length} service images to upload...`);

    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const publicId = file.replace(/\.[^/.]+$/, '');
      console.log(`  ⬆️ Uploading image: ${file}...`);

      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: 'kairotrix/images',
          resource_type: 'image',
          public_id: publicId,
          overwrite: true,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        });
        uploadedImages[`/assets/images/service/${file}`] = res.secure_url;
        console.log(`     ✅ URL: ${res.secure_url}`);
      } catch (err: any) {
        console.error(`     ❌ Failed to upload ${file}:`, err.message);
      }
    }
  }

  // 3. Update PostgreSQL Database Records
  console.log('\n📦 Updating PostgreSQL Database Records...');

  // Update Projects
  const projects = await prisma.project.findMany();
  let updatedProjects = 0;
  for (const p of projects) {
    let newVideo = p.video;
    let newImage = p.image;

    if (p.video && uploadedVideos[p.video]) {
      newVideo = uploadedVideos[p.video];
    }
    if (p.image && uploadedImages[p.image]) {
      newImage = uploadedImages[p.image];
    }

    if (newVideo !== p.video || newImage !== p.image) {
      await prisma.project.update({
        where: { id: p.id },
        data: { video: newVideo, image: newImage },
      });
      updatedProjects++;
      console.log(`  ✅ Updated Project [${p.slug}] with Cloudinary URLs`);
    }
  }

  // Update Insights
  const insights = await prisma.insight.findMany();
  let updatedInsights = 0;
  for (const i of insights) {
    let newVideoSrc = i.videoSrc;
    let newImage = i.image;

    if (i.videoSrc && uploadedVideos[i.videoSrc]) {
      newVideoSrc = uploadedVideos[i.videoSrc];
    }
    if (i.image && uploadedImages[i.image]) {
      newImage = uploadedImages[i.image];
    }

    if (newVideoSrc !== i.videoSrc || newImage !== i.image) {
      await prisma.insight.update({
        where: { id: i.id },
        data: { videoSrc: newVideoSrc, image: newImage },
      });
      updatedInsights++;
      console.log(`  ✅ Updated Insight [${i.slug}] with Cloudinary URLs`);
    }
  }

  console.log('\n🎉 Migration Complete!');
  console.log(`  - Projects updated: ${updatedProjects}/${projects.length}`);
  console.log(`  - Insights updated: ${updatedInsights}/${insights.length}`);
}

main()
  .catch((e) => {
    console.error('Fatal error during migration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
