import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Checks if Cloudinary credentials are fully configured
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export interface UploadOptions {
  folder?: string;
  resourceType?: 'image' | 'video' | 'auto';
  publicId?: string;
  tags?: string[];
}

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  width?: number;
  height?: number;
  bytes: number;
  resourceType: string;
  duration?: number;
}

/**
 * Uploads a Buffer (image or video) directly to Cloudinary via stream
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env'
    );
  }

  const {
    folder = 'kairotrix/general',
    resourceType = 'auto',
    publicId,
    tags = ['kairotrix'],
  } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        public_id: publicId,
        tags,
        transformation:
          resourceType === 'image'
            ? [{ quality: 'auto', fetch_format: 'auto' }]
            : resourceType === 'video'
            ? [{ quality: 'auto' }]
            : undefined,
      },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        if (!result) {
          return reject(new Error('Cloudinary upload returned an empty response.'));
        }

        resolve({
          url: result.url,
          secureUrl: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          resourceType: result.resource_type,
          duration: result.duration,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Deletes an asset from Cloudinary by its public ID
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
): Promise<boolean> {
  if (!isCloudinaryConfigured()) return false;

  try {
    const res = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return res.result === 'ok';
  } catch (err) {
    console.error(`Failed to delete asset ${publicId} from Cloudinary:`, err);
    return false;
  }
}

/**
 * Optimizes a Cloudinary image or video URL by applying f_auto,q_auto transformations
 */
export function optimizeMediaUrl(url: string): string {
  if (!url || !url.includes('res.cloudinary.com')) {
    return url;
  }
  // If transformations are already present, return
  if (url.includes('/f_auto,q_auto/') || url.includes('/q_auto/')) {
    return url;
  }
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}

export default cloudinary;
