import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Food3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 4, 20);
    pointLight.position.set(2, 4, 3);
    scene.add(pointLight);

    const goldLight = new THREE.PointLight(0xf59e0b, 3, 20);
    goldLight.position.set(-3, -2, 2);
    scene.add(goldLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 3. 3D Main Culinary Bowl Object (Glass Lathe Bowl)
    const points = [];
    for (let i = 0; i < 12; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.18) * 2.2 + 0.3, (i - 5) * 0.25));
    }
    const bowlGeometry = new THREE.LatheGeometry(points, 32);
    const bowlMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
      thickness: 1.2,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const bowlMesh = new THREE.Mesh(bowlGeometry, bowlMaterial);
    bowlMesh.position.y = -0.5;
    scene.add(bowlMesh);

    // Bowl Inner Liquid Base
    const liquidGeo = new THREE.CylinderGeometry(2.3, 1.2, 0.4, 32);
    const liquidMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48, // Rich Tomato Soup Base
      roughness: 0.3,
      metalness: 0.2,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    liquidMesh.position.y = 0.1;
    scene.add(liquidMesh);

    // 4. Floating 3D Food Elements Group
    const foodGroup = new THREE.Group();

    // 3D Pasta Spirals (Torus Knots)
    const pastaGeo = new THREE.TorusKnotGeometry(0.25, 0.08, 64, 8, 2, 3);
    const pastaMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 }); // Golden pasta

    for (let i = 0; i < 6; i++) {
      const pasta = new THREE.Mesh(pastaGeo, pastaMat);
      pasta.position.set(
        (Math.random() - 0.5) * 2.8,
        0.35 + Math.random() * 0.3,
        (Math.random() - 0.5) * 2.8
      );
      pasta.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      foodGroup.add(pasta);
    }

    // 3D Cherry Tomatoes (Red Spheres)
    const tomatoGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const tomatoMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.2, metalness: 0.1 });

    for (let i = 0; i < 5; i++) {
      const tomato = new THREE.Mesh(tomatoGeo, tomatoMat);
      tomato.position.set(
        (Math.random() - 0.5) * 2.6,
        0.4 + Math.random() * 0.25,
        (Math.random() - 0.5) * 2.6
      );
      foodGroup.add(tomato);
    }

    // 3D Basil Leaves (Emerald Icosahedrons)
    const leafGeo = new THREE.IcosahedronGeometry(0.2, 1);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });

    for (let i = 0; i < 8; i++) {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(
        (Math.random() - 0.5) * 3.2,
        0.5 + Math.random() * 0.8,
        (Math.random() - 0.5) * 3.2
      );
      leaf.scale.set(1.5, 0.4, 1.2);
      leaf.rotation.set(Math.random(), Math.random(), Math.random());
      foodGroup.add(leaf);
    }

    scene.add(foodGroup);

    // 5. 3D Floating Steam Particles System
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 3;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse Pointer Tracking
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetX = x * 0.8;
      targetY = y * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer interpolation (lerp)
      scene.rotation.y += (targetX - scene.rotation.y) * 0.05;
      scene.rotation.x += (targetY - scene.rotation.x) * 0.05;

      // Continuous 3D floating object rotations
      bowlMesh.rotation.y = elapsedTime * 0.15;
      foodGroup.rotation.y = elapsedTime * 0.25;

      // Animate floating steam particles upward
      const pos = particleGeo.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        pos[i] += 0.015;
        if (pos[i] > 4) pos[i] = 0;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Bobbing floating motion
      foodGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[420px] sm:h-[480px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
