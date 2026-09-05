'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroBackgroundCanvas — 3D Perspective Grid Tunnel with Image Panels (Light Theme)
 *
 * Recreates the 3D perspective grid tunnel matching the Framer reference video:
 *  - 4-walled rectangular tunnel: ceiling, floor, left wall, right wall.
 *  - Rectangular grid boxes: each wall face is structured into modular rectangular wireframe cells.
 *  - Sliding 3D Graphic Panels with REAL IMAGES (cybernetic posters, AI neural crystals,
 *    futuristic architecture) and vibrant accent tiles gliding forward along the tunnel walls.
 *  - Center Clarity: Soft ambient wash around the vanishing point ensures the background
 *    never overshadows or competes with the primary hero content and logo.
 *  - Interactive mouse steering: subtle camera perspective tilt.
 */

interface TunnelPanel {
  wall: 'left' | 'right' | 'ceiling' | 'floor';
  slot: number; // Grid column or row index
  zPos: number; // 0.0 (far) to 1.0 (near)
  speed: number;
  lengthDepth: number;
  type: 'image' | 'accent';
  imageIndex: number;
  accentColor: 'purple' | 'amber' | 'coral' | 'indigo';
}

const PANEL_IMAGE_SRCS = [
  '/assets/tunnel/panel_1.jpg',
  '/assets/tunnel/panel_2.jpg',
  '/assets/tunnel/panel_3.jpg',
  '/assets/tunnel/panel_4.jpg',
];

export function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Preload image assets
    const loadedImages: HTMLImageElement[] = [];
    PANEL_IMAGE_SRCS.forEach((src) => {
      const img = new Image();
      img.src = src;
      loadedImages.push(img);
    });

    // Mouse tracking for subtle 3D camera parallax
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    // Tunnel 3D parameters
    const FOCAL_LENGTH = 370;
    const Z_NEAR = 65;
    const Z_FAR = 1350;
    const NUM_RINGS = 16;
    const DIVISIONS_X = 6; // Rectangular divisions across floor/ceiling
    const DIVISIONS_Y = 4; // Rectangular divisions across left/right walls

    // Tunnel physical half-dimensions in 3D units
    const TUNNEL_W = 430;
    const TUNNEL_H = 270;

    // Active sliding panels on the tunnel walls
    const panels: TunnelPanel[] = [];
    const NUM_PANELS = 12;
    const walls = ['left', 'right', 'ceiling', 'floor'] as const;
    const accents = ['purple', 'amber', 'coral', 'indigo'] as const;

    for (let i = 0; i < NUM_PANELS; i++) {
      const wall = walls[i % walls.length];
      const maxSlots = wall === 'ceiling' || wall === 'floor' ? DIVISIONS_X : DIVISIONS_Y;
      const isImage = i % 3 !== 2; // 2 out of 3 are real images, 1 is vibrant color tile

      panels.push({
        wall,
        slot: Math.floor(Math.random() * maxSlots),
        zPos: Math.random(),
        speed: 0.002 + Math.random() * 0.0016,
        lengthDepth: 0.08 + Math.random() * 0.06,
        type: isImage ? 'image' : 'accent',
        imageIndex: i % PANEL_IMAGE_SRCS.length,
        accentColor: accents[i % accents.length],
      });
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 2;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 3D projection to 2D screen coordinates
    function project(x: number, y: number, z: number, vpX: number, vpY: number) {
      const scale = FOCAL_LENGTH / Math.max(z, 1);
      return {
        x: vpX + x * scale,
        y: vpY + y * scale,
        scale,
      };
    }

    // Convert linear progress (0..1) to actual 3D depth z (Z_FAR -> Z_NEAR)
    function progressToZ(p: number) {
      const clampedP = Math.max(0, Math.min(1, p));
      const invNear = 1 / Z_NEAR;
      const invFar = 1 / Z_FAR;
      const invZ = invFar + clampedP * (invNear - invFar);
      return 1 / invZ;
    }

    let globalProgress = 0;

    // ── Main Render Loop ──────────────────────────────────────────────────────
    function render() {
      // Smooth mouse camera steering
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx!.clearRect(0, 0, width, height);

      // Central vanishing point with subtle parallax
      const vpX = width / 2 + mouse.x * 38;
      const vpY = height / 2 + mouse.y * 26;

      // Uniform forward flight motion
      globalProgress = (globalProgress + 0.0015) % (1 / NUM_RINGS);

      // ── 1. Render 3D Perspective Rectangular Grid Boxes on 4 Walls ──────────
      // Calculate depth of all transverse rings
      const ringDepths: number[] = [];
      for (let i = 0; i <= NUM_RINGS; i++) {
        const ringProgress = (i / NUM_RINGS + globalProgress) % 1.0;
        ringDepths.push(progressToZ(ringProgress));
      }
      ringDepths.sort((a, b) => b - a); // Sort far to near

      // Draw rectangular grid boxes on Left & Right walls
      for (let i = 0; i < ringDepths.length - 1; i++) {
        const zFar = ringDepths[i];
        const zNear = ringDepths[i + 1];

        // Opacity: subtle so background never overshadows content
        const avgZ = (zFar + zNear) / 2;
        const normDist = 1 - (avgZ - Z_NEAR) / (Z_FAR - Z_NEAR);
        const farFade = normDist < 0.22 ? Math.pow(normDist / 0.22, 2) : 1;
        const boxAlpha = Math.sin(Math.max(0, Math.min(1, normDist)) * Math.PI) * 0.11 * farFade;

        if (boxAlpha <= 0.01) continue;

        ctx!.strokeStyle = `rgba(15, 15, 23, ${boxAlpha})`;
        ctx!.lineWidth = 0.75;

        // Left Wall Rectangular Boxes
        const rowH = (TUNNEL_H * 2) / DIVISIONS_Y;
        for (let r = 0; r < DIVISIONS_Y; r++) {
          const topY = -TUNNEL_H + r * rowH;
          const botY = topY + rowH;

          const p1 = project(-TUNNEL_W, topY, zFar, vpX, vpY);
          const p2 = project(-TUNNEL_W, topY, zNear, vpX, vpY);
          const p3 = project(-TUNNEL_W, botY, zNear, vpX, vpY);
          const p4 = project(-TUNNEL_W, botY, zFar, vpX, vpY);

          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.lineTo(p3.x, p3.y);
          ctx!.lineTo(p4.x, p4.y);
          ctx!.closePath();
          ctx!.stroke();
        }

        // Right Wall Rectangular Boxes
        for (let r = 0; r < DIVISIONS_Y; r++) {
          const topY = -TUNNEL_H + r * rowH;
          const botY = topY + rowH;

          const p1 = project(TUNNEL_W, topY, zFar, vpX, vpY);
          const p2 = project(TUNNEL_W, topY, zNear, vpX, vpY);
          const p3 = project(TUNNEL_W, botY, zNear, vpX, vpY);
          const p4 = project(TUNNEL_W, botY, zFar, vpX, vpY);

          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.lineTo(p3.x, p3.y);
          ctx!.lineTo(p4.x, p4.y);
          ctx!.closePath();
          ctx!.stroke();
        }

        // Ceiling & Floor Rectangular Boxes
        const colW = (TUNNEL_W * 2) / DIVISIONS_X;
        for (let c = 0; c < DIVISIONS_X; c++) {
          const leftX = -TUNNEL_W + c * colW;
          const rightX = leftX + colW;

          // Ceiling
          const c1 = project(leftX, -TUNNEL_H, zFar, vpX, vpY);
          const c2 = project(rightX, -TUNNEL_H, zFar, vpX, vpY);
          const c3 = project(rightX, -TUNNEL_H, zNear, vpX, vpY);
          const c4 = project(leftX, -TUNNEL_H, zNear, vpX, vpY);

          ctx!.beginPath();
          ctx!.moveTo(c1.x, c1.y);
          ctx!.lineTo(c2.x, c2.y);
          ctx!.lineTo(c3.x, c3.y);
          ctx!.lineTo(c4.x, c4.y);
          ctx!.closePath();
          ctx!.stroke();

          // Floor
          const f1 = project(leftX, TUNNEL_H, zFar, vpX, vpY);
          const f2 = project(rightX, TUNNEL_H, zFar, vpX, vpY);
          const f3 = project(rightX, TUNNEL_H, zNear, vpX, vpY);
          const f4 = project(leftX, TUNNEL_H, zNear, vpX, vpY);

          ctx!.beginPath();
          ctx!.moveTo(f1.x, f1.y);
          ctx!.lineTo(f2.x, f2.y);
          ctx!.lineTo(f3.x, f3.y);
          ctx!.lineTo(f4.x, f4.y);
          ctx!.closePath();
          ctx!.stroke();
        }
      }

      // ── 2. Render Sliding 3D Graphic Image Panels & Accent Tiles ────────────
      // Advance panels forward
      for (let i = 0; i < panels.length; i++) {
        const pan = panels[i];
        pan.zPos += pan.speed;
        if (pan.zPos > 1.0) {
          pan.zPos = 0.0;
          pan.wall = walls[Math.floor(Math.random() * walls.length)];
          const maxSlots = pan.wall === 'ceiling' || pan.wall === 'floor' ? DIVISIONS_X : DIVISIONS_Y;
          pan.slot = Math.floor(Math.random() * maxSlots);
          pan.imageIndex = Math.floor(Math.random() * loadedImages.length);
        }
      }

      // Sort far to near for correct depth compositing
      const sortedPanels = [...panels].sort((a, b) => a.zPos - b.zPos);

      for (let i = 0; i < sortedPanels.length; i++) {
        const pan = sortedPanels[i];
        const z1 = progressToZ(pan.zPos);
        const z2 = progressToZ(Math.min(1.0, pan.zPos + pan.lengthDepth));

        // Smooth fade in / out curve with near and far distance protection
        const nearFade = pan.zPos > 0.65 ? Math.max(0, 1 - (pan.zPos - 0.65) / 0.22) : 1;
        const farFade = pan.zPos < 0.18 ? Math.pow(pan.zPos / 0.18, 1.5) : 1;
        const alpha = Math.sin(pan.zPos * Math.PI) * 0.44 * nearFade * farFade;
        if (alpha <= 0.01) continue;

        let x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        let x3 = 0, y3 = 0, x4 = 0, y4 = 0;

        if (pan.wall === 'floor') {
          const colW = (TUNNEL_W * 2) / DIVISIONS_X;
          const leftX = -TUNNEL_W + pan.slot * colW;
          const rightX = leftX + colW;
          x1 = leftX;  y1 = TUNNEL_H;
          x2 = rightX; y2 = TUNNEL_H;
          x3 = rightX; y3 = TUNNEL_H;
          x4 = leftX;  y4 = TUNNEL_H;
        } else if (pan.wall === 'ceiling') {
          const colW = (TUNNEL_W * 2) / DIVISIONS_X;
          const leftX = -TUNNEL_W + pan.slot * colW;
          const rightX = leftX + colW;
          x1 = leftX;  y1 = -TUNNEL_H;
          x2 = rightX; y2 = -TUNNEL_H;
          x3 = rightX; y3 = -TUNNEL_H;
          x4 = leftX;  y4 = -TUNNEL_H;
        } else if (pan.wall === 'left') {
          const rowH = (TUNNEL_H * 2) / DIVISIONS_Y;
          const topY = -TUNNEL_H + pan.slot * rowH;
          const botY = topY + rowH;
          x1 = -TUNNEL_W; y1 = topY;
          x2 = -TUNNEL_W; y2 = botY;
          x3 = -TUNNEL_W; y3 = botY;
          x4 = -TUNNEL_W; y4 = topY;
        } else {
          // Right wall
          const rowH = (TUNNEL_H * 2) / DIVISIONS_Y;
          const topY = -TUNNEL_H + pan.slot * rowH;
          const botY = topY + rowH;
          x1 = TUNNEL_W; y1 = topY;
          x2 = TUNNEL_W; y2 = botY;
          x3 = TUNNEL_W; y3 = botY;
          x4 = TUNNEL_W; y4 = topY;
        }

        const p1 = project(x1, y1, z1, vpX, vpY);
        const p2 = project(x2, y2, z1, vpX, vpY);
        const p3 = project(x3, y3, z2, vpX, vpY);
        const p4 = project(x4, y4, z2, vpX, vpY);

        const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
        const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
        const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
        const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);
        const quadW = maxX - minX;
        const quadH = maxY - minY;

        if (quadW <= 1 || quadH <= 1) continue;

        ctx!.save();
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.y);
        ctx!.lineTo(p2.x, p2.y);
        ctx!.lineTo(p3.x, p3.y);
        ctx!.lineTo(p4.x, p4.y);
        ctx!.closePath();
        ctx!.clip();

        if (pan.type === 'image') {
          const img = loadedImages[pan.imageIndex];
          if (img && img.complete && img.naturalWidth > 0) {
            ctx!.globalAlpha = alpha * 0.85;
            ctx!.drawImage(img, minX, minY, quadW, quadH);

            // Subtle luminous tech tint over the image
            ctx!.fillStyle = `rgba(147, 51, 234, 0.15)`;
            ctx!.fill();
          } else {
            // Fallback tech gradient while loading
            ctx!.fillStyle = `rgba(147, 51, 234, ${alpha * 0.6})`;
            ctx!.fill();
          }
        } else {
          // Vibrant Accent Tile (from video: yellow, coral red, purple)
          if (pan.accentColor === 'amber') {
            ctx!.fillStyle = `rgba(245, 158, 11, ${alpha * 0.85})`;
          } else if (pan.accentColor === 'coral') {
            ctx!.fillStyle = `rgba(239, 68, 68, ${alpha * 0.8})`;
          } else if (pan.accentColor === 'purple') {
            ctx!.fillStyle = `rgba(147, 51, 234, ${alpha * 0.75})`;
          } else {
            ctx!.fillStyle = `rgba(99, 102, 241, ${alpha * 0.75})`;
          }
          ctx!.fill();
        }

        ctx!.restore();

        // High-tech bounding outline for the panel
        ctx!.beginPath();
        ctx!.moveTo(p1.x, p1.y);
        ctx!.lineTo(p2.x, p2.y);
        ctx!.lineTo(p3.x, p3.y);
        ctx!.lineTo(p4.x, p4.y);
        ctx!.closePath();
        ctx!.strokeStyle =
          pan.type === 'image'
            ? `rgba(147, 51, 234, ${alpha * 0.9})`
            : pan.accentColor === 'amber'
            ? `rgba(245, 158, 11, ${alpha * 1.2})`
            : `rgba(239, 68, 68, ${alpha * 1.1})`;
        ctx!.lineWidth = 1.2;
        ctx!.stroke();
      }

      // ── 3. Center Clarity Protection (Foreground Dominance) ─────────────────
      // Guarantees the background gently clears out around the center logo & text
      ctx!.save();
      ctx!.translate(vpX, vpY);
      ctx!.scale(1.5, 1.0); // Widescreen horizontal expansion to cradle the words

      const radius = Math.min(width, height) * 0.36;
      const maskGrad = ctx!.createRadialGradient(0, 0, 0, 0, 0, radius);
      maskGrad.addColorStop(0, 'rgba(250, 250, 252, 1.0)'); // 100% clean at logo center
      maskGrad.addColorStop(0.28, 'rgba(250, 250, 252, 0.96)');
      maskGrad.addColorStop(0.62, 'rgba(250, 250, 252, 0.45)');
      maskGrad.addColorStop(1, 'rgba(250, 250, 252, 0)');

      ctx!.fillStyle = maskGrad;
      ctx!.beginPath();
      ctx!.arc(0, 0, radius, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 will-change-transform"
      style={{ opacity: 0.92 }}
      aria-hidden="true"
    />
  );
}
