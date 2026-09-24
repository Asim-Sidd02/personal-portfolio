import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Scene3D.css';

/**
 * Scene3D — a refined, professional, interactive 3D background.
 *
 * A quiet constellation of drifting points with faint connecting lines that
 * form/dissolve as they move — the understated, high-end look used on modern
 * SaaS / agency sites. No obvious spinning object.
 *
 * Interaction:
 *  - Mouse parallax: the whole field eases toward the cursor for gentle depth.
 *  - Click-and-drag: subtly orbits the field, with momentum that decays.
 *
 * Performance/accessibility:
 *  - Capped pixel ratio, pauses when tab hidden, respects reduced-motion,
 *    theme-aware, and disposes everything on unmount.
 */
const Scene3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const width = () => mount.clientWidth || window.innerWidth;
    const height = () => mount.clientHeight || window.innerHeight;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width(), height());
    mount.appendChild(renderer.domElement);

    // --- Scene & camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 100);
    camera.position.z = 14;

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark';
    const accent = new THREE.Color('#2563eb');

    const group = new THREE.Group();
    scene.add(group);

    // --- Particle constellation ---
    const COUNT = 140;                 // few, well-spaced points read as refined
    const SPREAD = 20;
    const LINK_DIST = 3.6;             // max distance to draw a connecting line
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    const basePos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      basePos[i * 3] = (Math.random() - 0.5) * SPREAD;
      basePos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.6;
      basePos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    // Points
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(basePos, 3));
    const pMat = new THREE.PointsMaterial({
      color: accent,
      size: 0.12,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Lines (rebuilt each frame from nearby pairs — capped for perf)
    const MAX_LINE_VERTS = COUNT * 8; // safe upper bound of segment endpoints
    const linePositions = new Float32Array(MAX_LINE_VERTS * 3);
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lMat = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.18,
    });
    const lines = new THREE.LineSegments(lGeo, lMat);
    group.add(lines);

    const rebuildLines = () => {
      const pos = pGeo.attributes.position.array;
      let v = 0;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        for (let j = i + 1; j < COUNT; j++) {
          const jx = j * 3;
          const dx = pos[ix] - pos[jx];
          const dy = pos[ix + 1] - pos[jx + 1];
          const dz = pos[ix + 2] - pos[jx + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < LINK_DIST_SQ && v + 6 <= linePositions.length) {
            linePositions[v++] = pos[ix];
            linePositions[v++] = pos[ix + 1];
            linePositions[v++] = pos[ix + 2];
            linePositions[v++] = pos[jx];
            linePositions[v++] = pos[jx + 1];
            linePositions[v++] = pos[jx + 2];
          }
        }
      }
      lGeo.setDrawRange(0, v / 3);
      lGeo.attributes.position.needsUpdate = true;
    };

    // --- Interaction ---
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const drag = { active: false, lastX: 0, lastY: 0 };
    const velocity = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.x = (cx / window.innerWidth) * 2 - 1;
      pointer.y = (cy / window.innerHeight) * 2 - 1;

      if (drag.active) {
        velocity.y = (cx - drag.lastX) * 0.002;
        velocity.x = (cy - drag.lastY) * 0.002;
        group.rotation.y += velocity.y;
        group.rotation.x += velocity.x;
        drag.lastX = cx;
        drag.lastY = cy;
      }
    };
    const onPointerDown = (e) => {
      drag.active = true;
      drag.lastX = e.touches ? e.touches[0].clientX : e.clientX;
      drag.lastY = e.touches ? e.touches[0].clientY : e.clientY;
    };
    const onPointerUp = () => {
      drag.active = false;
    };

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    window.addEventListener('resize', onResize);

    // --- Theme reaction ---
    const applyTheme = () => {
      const dark = isDark();
      pMat.opacity = dark ? 0.9 : 0.8;
      lMat.opacity = dark ? 0.22 : 0.16;
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // --- Animation ---
    let raf = 0;
    let running = true;
    let frame = 0;
    const bounds = SPREAD / 2;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!running) return;
      frame++;

      // Drift the points slowly (skip if reduced motion).
      if (!prefersReducedMotion) {
        const pos = pGeo.attributes.position.array;
        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          pos[ix] += vel[ix];
          pos[ix + 1] += vel[ix + 1];
          pos[ix + 2] += vel[ix + 2];
          // soft wrap within bounds
          for (let a = 0; a < 3; a++) {
            if (pos[ix + a] > bounds) vel[ix + a] = -Math.abs(vel[ix + a]);
            if (pos[ix + a] < -bounds) vel[ix + a] = Math.abs(vel[ix + a]);
          }
        }
        pGeo.attributes.position.needsUpdate = true;
      }

      // Rebuild connecting lines every other frame (cheap enough, smooth).
      if (frame % 2 === 0) rebuildLines();

      // Mouse parallax easing + drag momentum decay.
      eased.x += (pointer.x - eased.x) * 0.03;
      eased.y += (pointer.y - eased.y) * 0.03;
      if (!drag.active) {
        group.rotation.x += velocity.x;
        group.rotation.y += velocity.y;
        velocity.x *= 0.93;
        velocity.y *= 0.93;
      }
      // subtle parallax offset (does not fight drag rotation)
      group.position.x = eased.x * 1.2;
      group.position.y = -eased.y * 0.8;

      renderer.render(scene, camera);
    };
    animate();

    const onVisibility = () => {
      running = !document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);

      pGeo.dispose();
      pMat.dispose();
      lGeo.dispose();
      lMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="scene3d-wrapper" ref={mountRef} aria-hidden="true" />;
};

export default Scene3D;
