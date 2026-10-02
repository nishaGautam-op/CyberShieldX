"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ShieldCanvasProps {
  interactive?: boolean;
  threatActive?: boolean;
  className?: string;
}

export default function ShieldCanvas({
  interactive = true,
  threatActive = false,
  className = "",
}: ShieldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x06152d, 2.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f3ff, 8, 25);
    cyanLight.position.set(2, 3, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 6, 25);
    purpleLight.position.set(-3, -2, 4);
    scene.add(purpleLight);

    const threatLight = new THREE.PointLight(0xef4444, threatActive ? 9 : 0, 20);
    threatLight.position.set(0, 0, 4);
    scene.add(threatLight);

    // Dramatic light beam / background glow
    const beamGeo = new THREE.CylinderGeometry(0.1, 5, 20, 32, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const lightBeam = new THREE.Mesh(beamGeo, beamMat);
    lightBeam.rotation.x = Math.PI / 2;
    lightBeam.position.z = -5;
    scene.add(lightBeam);

    // 3. Shield Geometry Construction
    // Draw classic cyber shield profile curve
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 2.4);
    shieldShape.bezierCurveTo(1.6, 2.4, 2.0, 1.4, 2.0, 0.2);
    shieldShape.bezierCurveTo(2.0, -1.0, 1.2, -1.8, 0, -2.5);
    shieldShape.bezierCurveTo(-1.2, -1.8, -2.0, -1.0, -2.0, 0.2);
    shieldShape.bezierCurveTo(-2.0, 1.4, -1.6, 2.4, 0, 2.4);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    };

    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();

    // Shield Material: metallic dark navy with glass reflection
    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0x07152b,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2,
      ior: 1.5,
      reflectivity: 0.8,
    });

    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);

    // Wireframe edge highlight
    const wireframeGeo = new THREE.WireframeGeometry(shieldGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: threatActive ? 0xef4444 : 0x00f3ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const shieldWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    shieldMesh.add(shieldWireframe);

    // Inner Cyber Core (Hologram Shield)
    const innerShape = new THREE.Shape();
    innerShape.moveTo(0, 2.0);
    innerShape.bezierCurveTo(1.3, 2.0, 1.6, 1.1, 1.6, 0.1);
    innerShape.bezierCurveTo(1.6, -0.8, 0.9, -1.4, 0, -2.0);
    innerShape.bezierCurveTo(-0.9, -1.4, -1.6, -0.8, -1.6, 0.1);
    innerShape.bezierCurveTo(-1.6, 1.1, -1.3, 2.0, 0, 2.0);

    const innerGeo = new THREE.ShapeGeometry(innerShape);
    innerGeo.center();
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.z = 0.25;
    shieldMesh.add(innerMesh);

    // Circuit lines inside shield
    const circuitGroup = new THREE.Group();
    const circuitLinesCount = 8;
    for (let i = 0; i < circuitLinesCount; i++) {
      const points: THREE.Vector3[] = [];
      const xStart = (Math.random() - 0.5) * 2;
      const yStart = (Math.random() - 0.5) * 2.5;
      points.push(new THREE.Vector3(xStart, yStart, 0.26));
      points.push(new THREE.Vector3(xStart + (Math.random() - 0.5) * 0.8, yStart + (Math.random() - 0.5) * 0.6, 0.26));
      points.push(new THREE.Vector3(xStart + (Math.random() - 0.5) * 1.2, yStart + (Math.random() - 0.5) * 1.2, 0.26));
      
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      circuitGroup.add(new THREE.Line(lineGeo, lineMat));

      // Terminal node dot
      const dotGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(points[points.length - 1]);
      circuitGroup.add(dotMesh);
    }
    shieldMesh.add(circuitGroup);

    // 4. Rotating Security Rings
    const ringsGroup = new THREE.Group();
    
    // Ring 1 (Outer large ring)
    const ring1Geo = new THREE.RingGeometry(3.2, 3.24, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    ringsGroup.add(ring1);

    // Ring 2 (Tilted dashed ring)
    const ring2Geo = new THREE.RingGeometry(2.7, 2.73, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 6;
    ringsGroup.add(ring2);

    // Ring 3 (Horizontal scanner ring)
    const ring3Geo = new THREE.RingGeometry(2.2, 2.22, 64);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    ringsGroup.add(ring3);

    // 5. 3D Particles Dust Field
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f3ff);
    const colorPurple = new THREE.Color(0x8b5cf6);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 16;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 16;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 12;

      const mixedColor =
        Math.random() > 0.4
          ? colorCyan
          : Math.random() > 0.5
          ? colorPurple
          : colorWhite;
      particleColors[idx] = mixedColor.r;
      particleColors[idx + 1] = mixedColor.g;
      particleColors[idx + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Holographic Scanning Plane
    const scanPlaneGeo = new THREE.PlaneGeometry(5, 0.06);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: threatActive ? 0xef4444 : 0x00f3ff,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.z = 0.4;
    shieldMesh.add(scanPlane);

    // 7. Background Cyber Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f3ff, 0x071c3d);
    gridHelper.position.y = -4;
    gridHelper.position.z = -2;
    scene.add(gridHelper);

    // Assemble Main Shield Group
    const mainShieldGroup = new THREE.Group();
    mainShieldGroup.add(shieldMesh);
    mainShieldGroup.add(ringsGroup);
    scene.add(mainShieldGroup);

    setIsLoaded(true);

    // 8. Mouse Parallax & Cursor Reaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetLightX = 2;
    let targetLightY = 3;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      targetRotationY = x * 0.45;
      targetRotationX = -y * 0.35;
      targetLightX = x * 4;
      targetLightY = y * 4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 9. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Shield Rotation and Spring Parallax
      mainShieldGroup.rotation.y += (targetRotationY - mainShieldGroup.rotation.y) * 0.05;
      mainShieldGroup.rotation.x += (targetRotationX - mainShieldGroup.rotation.x) * 0.05;

      // Base Floating levitation
      mainShieldGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Light follows mouse
      cyanLight.position.x += (targetLightX - cyanLight.position.x) * 0.08;
      cyanLight.position.y += (targetLightY - cyanLight.position.y) * 0.08;

      // Rotate Security Rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.4;
      ring3.rotation.z = elapsedTime * 0.2;

      // Scanline sweep
      scanPlane.position.y = Math.sin(elapsedTime * 2.2) * 2.1;

      // Slowly rotate particle field
      particleSystem.rotation.y = elapsedTime * 0.02;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      // Threat Pulse effect
      if (threatActive) {
        wireframeMat.color.setHex(0xef4444);
        threatLight.intensity = 6 + Math.sin(elapsedTime * 8) * 3;
      } else {
        wireframeMat.color.setHex(0x00f3ff);
        threatLight.intensity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 11. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries and Materials
      shieldGeo.dispose();
      shieldMat.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      scanPlaneGeo.dispose();
      scanPlaneMat.dispose();
      gridHelper.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive, threatActive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Fallback ambient glowing blur backdrop */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Subtle HUD scanning lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,243,255,0.015)_51%)] bg-[length:100%_4px] pointer-events-none" />
    </div>
  );
}
