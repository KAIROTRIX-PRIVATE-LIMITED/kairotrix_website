# KAIROTRIX Website — Assets Directory Guide

All static media, videos, 3D models, brand marks, and images are organized and maintained here.

---

## Directory Organization

```
public/
└── assets/
    ├── brand/         # Official logo SVGs, geometric monograms, favicons, watermarks
    │
    ├── videos/        # Hero scroll-video, capability demos, section background loops
    │                  # Formats: .mp4 (H.264 / AV1) + .webm
    │
    ├── images/        # High-resolution raster images (WebP / AVIF preferred)
    │   ├── hero/      # Hero section poster frames & ambient backdrops
    │   ├── solutions/ # Solution area visuals & architecture diagrams
    │   ├── work/      # Project screenshots, demo previews & experiment visuals
    │   ├── insights/  # Article covers, case study headers, video thumbnails
    │   └── og/        # Social sharing OpenGraph images (1200x630px)
    │
    ├── 3d/            # WebGL / Three.js 3D assets (.gltf, .glb, textures, HDRIs)
    │                  # For "How We Think / Build" signature 3D section
    │
    ├── icons/         # Custom vector SVG icons
    │
    └── fonts/         # Self-hosted web fonts (if any custom fonts are used)
```

---

## Asset Guidelines

1. **Formats**:
   - Vector / UI: `.svg`
   - Images: `.webp` or `.avif` (fallback `.png` for transparency)
   - Video: `.mp4` + `.webm` (compressed and web-optimized)
   - 3D: `.glb` (binary compressed with Draco compression where possible)

2. **Zero Fabrication Rule**:
   - Only real project screenshots, real demos, and custom branded vectors.
   - No generic stock imagery or fake client logos.
