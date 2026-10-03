/**
 * KAIROTRIX Intelligent Asset Discovery & Preloader Engine
 * 
 * Preloads fonts, document readiness, critical assets, and all images/videos
 * currently on the page to eliminate layout shift, stutter, and mid-page asset loading lag.
 */

// Critical global media that should always be warmed up in the browser cache
const CRITICAL_GLOBAL_ASSETS: string[] = [
  '/assets/brand/PRIMARY_LOGO_WIDE/KAIROTRIX_Logo_Black_Wide.svg',
  '/assets/brand/PRIMARY_LOGO_WIDE/KAIROTRIX_Logo_White_Wide.svg',
  '/assets/brand/PRIMARY_LOGO_SQUARE/BLACK.svg',
  '/assets/brand/PRIMARY_LOGO_SQUARE/WHITE.svg',
  '/assets/images/404/chat_icon.png',
  '/assets/images/home/chat_icon.png',
];

// Critical route-specific assets mapped by route prefix
const ROUTE_ASSET_MANIFEST: Record<string, string[]> = {
  '/': [
    '/assets/videos/Robot_tracking_mouse_and_waving.mp4',
    '/assets/images/solutions/grid/M1.png',
    '/assets/images/solutions/sub_hero/s1.png',
    '/assets/images/solutions/sub_hero/s2.png',
    '/assets/images/solutions/sub_hero/s3.png',
    '/assets/images/solutions/sub_hero/s4.png',
    '/assets/images/solutions/sub_hero/s5.png',
    '/assets/images/solutions/sub_hero/s6.png',
    '/assets/images/service/SERVICE01.png',
    '/assets/images/service/SERVICE02.png',
    '/assets/images/service/SERVICE03.png',
    '/assets/images/service/SERVICE04.png',
    '/assets/images/service/SERVICE05.png',
    '/assets/images/service/SERVICE06.png',
    '/assets/images/home/how_we_build/s1.png',
    '/assets/images/home/how_we_build/s2.png',
    '/assets/images/home/how_we_build/s3.png',
    '/assets/images/home/how_we_build/s4.png',
    '/assets/images/home/how_we_build/s5.png',
    '/assets/images/home/how_we_build/s6.png',
  ],
  '/solutions': [
    '/assets/images/solutions/hero_river/C1-1.png',
    '/assets/images/solutions/hero_river/C1-2.png',
    '/assets/images/solutions/grid/M1.png',
    '/assets/images/solutions/sub_hero/s1.png',
    '/assets/images/solutions/sub_hero/s2.png',
    '/assets/images/solutions/sub_hero/s3.png',
    '/assets/images/solutions/sub_hero/s4.png',
    '/assets/images/solutions/sub_hero/s5.png',
    '/assets/images/solutions/sub_hero/s6.png',
    '/assets/images/solutions/methodology/methodology-01-understand.png',
    '/assets/images/solutions/methodology/methodology-02-design.png',
    '/assets/images/solutions/methodology/methodology-03-build.png',
    '/assets/images/solutions/methodology/methodology-04-deploy.png',
  ],
  '/work': [
    '/assets/videos/Robot_tracking_mouse_and_waving.mp4',
  ],
  '/insights': [
    '/assets/images/insights/hero/hero_bg.png',
  ],
  '/about': [
    '/assets/images/about/about-hero-workbench.jpg',
    '/assets/images/about/about-philosophy-craft.jpg',
    '/assets/images/about/about-vision-system.jpg',
  ],
};

/**
 * Preloads a single image and decodes it for immediate GPU rendering.
 */
export function preloadImage(src: string): Promise<boolean> {
  if (typeof window === 'undefined' || !src) return Promise.resolve(true);

  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    // Use HTMLImageElement.decode() if supported for smooth paint
    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => resolve(true))
        .catch(() => {
          // If decode fails or is not yet complete, fallback to onload/complete
          if (img.complete) {
            resolve(true);
          } else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
          }
        });
    } else {
      if (img.complete) {
        resolve(true);
      } else {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }
    }

    // Safety timeout per individual image: 3.5 seconds
    setTimeout(() => resolve(true), 3500);
  });
}

/**
 * Preloads video metadata/initial buffer.
 */
export function preloadVideo(src: string): Promise<boolean> {
  if (typeof window === 'undefined' || !src) return Promise.resolve(true);

  return new Promise((resolve) => {
    // Avoid loading heavy videos on slow/data-saver connections or small screens
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      resolve(true);
      return;
    }

    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.src = src;

    const onReady = () => {
      cleanup();
      resolve(true);
    };

    const cleanup = () => {
      video.removeEventListener('loadeddata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onReady);
    };

    video.addEventListener('loadeddata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onReady);

    // Timeout safety fallback for video
    setTimeout(onReady, 2500);
  });
}

/**
 * Discovers all visible and DOM-declared visual assets on the page.
 */
export function discoverPageAssets(pathname: string): string[] {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return [];
  }

  const assetSet = new Set<string>();

  // 1. Add critical global assets
  CRITICAL_GLOBAL_ASSETS.forEach((src) => assetSet.add(src));

  // 2. Add manifest assets for current route
  const currentManifest = ROUTE_ASSET_MANIFEST[pathname] || [];
  currentManifest.forEach((src) => assetSet.add(src));

  // If on solutions detail page
  if (pathname.startsWith('/solutions/')) {
    const slug = pathname.replace('/solutions/', '');
    assetSet.add(`/assets/images/solutions/${slug}/${slug}-system-focus.png`);
    ROUTE_ASSET_MANIFEST['/solutions']?.forEach((src) => assetSet.add(src));
  }

  // 3. Scan DOM for <img> tags
  try {
    const images = document.querySelectorAll<HTMLImageElement>('img');
    images.forEach((img) => {
      const src = img.currentSrc || img.src || img.getAttribute('src');
      if (src && !src.startsWith('data:') && !src.includes('blob:')) {
        assetSet.add(src);
      }
    });

    // 4. Scan for <source> elements (picture or video)
    const sources = document.querySelectorAll<HTMLSourceElement>('source');
    sources.forEach((source) => {
      const src = source.srcset || source.src;
      if (src && !src.startsWith('data:')) {
        // Handle comma-separated srcset
        const firstSrc = src.split(',')[0].trim().split(' ')[0];
        if (firstSrc) assetSet.add(firstSrc);
      }
    });

    // 5. Scan for inline background images
    const elementsWithBg = document.querySelectorAll<HTMLElement>('[style*="background-image"]');
    elementsWithBg.forEach((el) => {
      const bg = el.style.backgroundImage;
      const match = bg.match(/url\(["']?([^"')]+)["']?\)/);
      if (match && match[1] && !match[1].startsWith('data:')) {
        assetSet.add(match[1]);
      }
    });
  } catch {
    // Graceful error ignore on querySelector
  }

  return Array.from(assetSet).filter((s) => Boolean(s) && typeof s === 'string');
}

export interface AssetPreloadProgress {
  ratio: number; // 0 to 1
  loadedCount: number;
  totalCount: number;
  status: string;
}

/**
 * Executes full page asset preloading pipeline with progress telemetry.
 */
export async function runAssetPreloadPipeline(
  pathname: string,
  onProgress: (info: AssetPreloadProgress) => void
): Promise<void> {
  if (typeof window === 'undefined') return;

  const discoveredAssets = discoverPageAssets(pathname);
  const totalAssets = Math.max(1, discoveredAssets.length);
  let loadedAssets = 0;

  // Track fonts and document readiness as milestone weights
  let fontReady = false;
  let domReady = document.readyState === 'complete';

  const updateProgress = (customStatus?: string) => {
    // Asset progress: 70% weight, Fonts: 15% weight, DOM: 15% weight
    const assetRatio = totalAssets > 0 ? loadedAssets / totalAssets : 1;
    const fontRatio = fontReady ? 1 : 0.4;
    const domRatio = domReady ? 1 : 0.5;

    const combinedRatio = Math.min(1, assetRatio * 0.7 + fontRatio * 0.15 + domRatio * 0.15);

    let status = customStatus;
    if (!status) {
      if (combinedRatio < 0.25) {
        status = 'INITIALIZING ARCHITECTURE KERNEL';
      } else if (combinedRatio < 0.5) {
        status = 'CALIBRATING SYSTEM TYPOGRAPHY';
      } else if (combinedRatio < 0.8) {
        status = 'PREFETCHING HIGH-RES VISUAL ASSETS';
      } else if (combinedRatio < 0.99) {
        status = 'DECODING MEDIA & GPU TEXTURES';
      } else {
        status = 'ALL SYSTEMS VERIFIED • INITIALIZING UI';
      }
    }

    onProgress({
      ratio: combinedRatio,
      loadedCount: loadedAssets,
      totalCount: totalAssets,
      status,
    });
  };

  // Initial progress update
  updateProgress('INITIALIZING ARCHITECTURE KERNEL');

  // Check fonts
  const fontPromise = (async () => {
    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
    } catch {
      // Ignore font ready errors
    } finally {
      fontReady = true;
      updateProgress();
    }
  })();

  // Check DOM ready
  const domPromise = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') {
      domReady = true;
      resolve();
    } else {
      const handleLoad = () => {
        domReady = true;
        window.removeEventListener('load', handleLoad);
        updateProgress();
        resolve();
      };
      window.addEventListener('load', handleLoad);
    }
  });

  // Preload discovered assets with concurrency pool
  const CONCURRENCY = 6;
  const queue = [...discoveredAssets];

  const worker = async () => {
    while (queue.length > 0) {
      const src = queue.shift();
      if (!src) continue;

      try {
        if (src.endsWith('.mp4') || src.endsWith('.webm')) {
          await preloadVideo(src);
        } else {
          await preloadImage(src);
        }
      } catch {
        // Silently resolve failed image so process continues smoothly
      } finally {
        loadedAssets++;
        updateProgress();
      }
    }
  };

  const pool = Array.from({ length: Math.min(CONCURRENCY, discoveredAssets.length) }, () => worker());

  // Wait for all workers, fonts, and DOM or safety timeout of 6 seconds
  const safetyTimeout = new Promise<void>((resolve) => setTimeout(resolve, 6000));

  await Promise.race([
    Promise.all([...pool, fontPromise, domPromise]),
    safetyTimeout,
  ]);

  // Final 100% update
  onProgress({
    ratio: 1,
    loadedCount: totalAssets,
    totalCount: totalAssets,
    status: 'ALL SYSTEMS VERIFIED • INITIALIZING UI',
  });
}
