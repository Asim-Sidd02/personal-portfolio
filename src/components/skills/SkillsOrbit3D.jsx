import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './skillsOrbit3D.css';

const LABELS = [
  'HTML',
  'CSS',
  'JS',
  'Vue',
  'PHP',
  'Node',
  'Python',
  'MySQL',
  'Firebase',
  'Java',
  'Flutter',
  'Liquid',
];

const RADIUS = 3.3;

const createChipTexture = (label, accent, ink, base) => {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(128, 128, 106, 0, Math.PI * 2);
  ctx.globalAlpha = 0.94;
  ctx.fillStyle = base;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 3;
  ctx.strokeStyle = accent;
  ctx.stroke();

  const fontSize = Math.max(30, 56 - label.length * 2);
  ctx.fillStyle = ink;
  ctx.font = `italic 600 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 134);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
};

const SkillsOrbit3D = () => {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const accent = rootStyles.getPropertyValue('--accent-color').trim();
    const ink = rootStyles.getPropertyValue('--title-color').trim();
    const base = rootStyles.getPropertyValue('--container-color').trim();

    const { clientWidth, clientHeight } = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, clientWidth / clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 7.6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(clientWidth, clientHeight, false);

    const group = new THREE.Group();
    scene.add(group);

    const sprites = LABELS.map((label, index) => {
      const texture = createChipTexture(label, accent, ink, base);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      const angle = (index / LABELS.length) * Math.PI * 2;
      sprite.position.set(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);
      sprite.scale.set(1.05, 1.05, 1);
      group.add(sprite);
      return sprite;
    });

    const ringPoints = Array.from({ length: 129 }, (_, i) => {
      const angle = (i / 128) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * RADIUS, 0, Math.sin(angle) * RADIUS);
    });
    const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
    const ringMaterial = new THREE.LineBasicMaterial({ color: new THREE.Color(accent), transparent: true, opacity: 0.16 });
    const ringLine = new THREE.LineLoop(ringGeometry, ringMaterial);
    group.add(ringLine);

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const handlePointerMove = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerTarget.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    mountRef.current.addEventListener('pointermove', handlePointerMove);
    mountRef.current.addEventListener('pointerleave', handlePointerLeave);

    const clock = new THREE.Clock();
    let autoAngle = 0;
    let frameId;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      autoAngle += 0.0022;
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.05;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.05;

      group.rotation.y = autoAngle + pointerCurrent.x * 0.35;
      group.rotation.x = pointerCurrent.y * 0.12;

      sprites.forEach((sprite, index) => {
        sprite.position.y = Math.sin(elapsed * 0.8 + index) * 0.12;
      });

      isVisibleRef.current && renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    const handleResize = () => {
      const size = mountRef.current;
      camera.aspect = size.clientWidth / size.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(size.clientWidth, size.clientHeight, false);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountRef.current);

    const intersectionObserver = new IntersectionObserver((entries) => {
      isVisibleRef.current = entries[0]?.isIntersecting ?? true;
    });
    intersectionObserver.observe(mountRef.current);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      mountRef.current?.removeEventListener('pointermove', handlePointerMove);
      mountRef.current?.removeEventListener('pointerleave', handlePointerLeave);
      sprites.forEach((sprite) => {
        sprite.material.map.dispose();
        sprite.material.dispose();
      });
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="skills-orbit3d" ref={mountRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default SkillsOrbit3D;
