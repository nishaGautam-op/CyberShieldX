"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { THREAT_ARCS, ThreatArc } from "@/lib/data/mockSecurityData";
import { formatNumber } from "@/lib/utils";

interface ThreatGlobe3DProps {
  className?: string;
  onSelectArc?: (arc: ThreatArc) => void;
}

export default function ThreatGlobe3D({ className = "", onSelectArc }: ThreatGlobe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeArc, setActiveArc] = useState<ThreatArc | null>(THREAT_ARCS[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.05);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x071b3b, 3);
    scene.add(ambientLight);

    const cyanLight = new THREE.DirectionalLight(0x00f3ff, 4);
    cyanLight.position.set(5, 3, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 6, 20);
    purpleLight.position.set(-5, -3, 3);
    scene.add(purpleLight);

    // 3. Globe Construction
    const globeRadius = 2.8;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner dark sphere
    const innerSphereGeo = new THREE.SphereGeometry(globeRadius - 0.02, 48, 48);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x030816,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // Wireframe cyber sphere
    const wireGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(globeRadius, 32, 24));
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    globeGroup.add(wireMesh);

    // Continental dot matrix points
    const pointCount = 1400;
    const dotPositions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const r = globeRadius;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const dotMesh = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotMesh);

    // Outer atmospheric glow halo
    const haloGeo = new THREE.SphereGeometry(globeRadius * 1.15, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    scene.add(halo);

    // Helper: Convert Lat/Lng to 3D Cartesian coordinates
    function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    }

    // 4. Create Threat Arcs and Animated Missile Pulses
    interface ArcObject {
      data: ThreatArc;
      curve: THREE.CubicBezierCurve3;
      pulseMesh: THREE.Mesh;
      progress: number;
    }

    const arcObjects: ArcObject[] = [];

    THREAT_ARCS.forEach((arc) => {
      const v1 = latLngToVector3(arc.originLat, arc.originLng, globeRadius);
      const v2 = latLngToVector3(arc.targetLat, arc.targetLng, globeRadius);

      // Calculate midpoint elevated arc
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      const distance = v1.distanceTo(v2);
      mid.normalize().multiplyScalar(globeRadius + distance * 0.35);

      const curve = new THREE.CubicBezierCurve3(v1, v1.clone().lerp(mid, 0.5), v2.clone().lerp(mid, 0.5), v2);
      const points = curve.getPoints(50);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

      const colorHex = arc.severity === "critical" ? 0xef4444 : arc.severity === "high" ? 0xf59e0b : 0x00f3ff;

      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: arc.severity === "critical" ? 0.9 : 0.6,
      });
      const arcLine = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(arcLine);

      // Origin Beacon marker
      const beaconGeo = new THREE.RingGeometry(0.04, 0.08, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide });
      const originBeacon = new THREE.Mesh(beaconGeo, beaconMat);
      originBeacon.position.copy(v1);
      originBeacon.lookAt(v1.clone().multiplyScalar(2));
      globeGroup.add(originBeacon);

      // Animated traveling missile/packet pulse
      const pulseGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.position.copy(v1);
      globeGroup.add(pulseMesh);

      arcObjects.push({
        data: arc,
        curve,
        pulseMesh,
        progress: Math.random(),
      });
    });

    // 5. Mouse Interaction & Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // 6. Animation Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Auto rotation when not dragging
      if (!isDragging) {
        globeGroup.rotation.y += 0.003;
      }

      // Animate attack pulses along bezier curves
      arcObjects.forEach((item) => {
        item.progress += 0.008;
        if (item.progress > 1) item.progress = 0;
        const pt = item.curve.getPoint(item.progress);
        item.pulseMesh.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-[520px] rounded-xl overflow-hidden glass-panel border border-cyan-500/20 ${className}`}>
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Overlay HUD */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            Global Cyber Threat Vector Grid
          </span>
        </div>
        <p className="text-[11px] text-slate-400 font-mono">
          Drag to orbit globe • Live intercontinental ballistic attack vectors
        </p>
      </div>

      {/* Attack Arc Selector Carousel / Cards */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto pb-1">
        {THREAT_ARCS.map((arc) => {
          const isSelected = activeArc?.id === arc.id;
          return (
            <button
              key={arc.id}
              onClick={() => {
                setActiveArc(arc);
                if (onSelectArc) onSelectArc(arc);
              }}
              className={`shrink-0 px-3 py-2 rounded-lg text-left transition-all font-mono text-xs border backdrop-blur-md ${
                isSelected
                  ? "bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,243,255,0.3)]"
                  : "bg-black/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-slate-200">{arc.type}</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded font-bold uppercase ${
                    arc.severity === "critical"
                      ? "bg-red-500/20 text-red-400"
                      : arc.severity === "high"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-cyan-500/20 text-cyan-400"
                  }`}
                >
                  {arc.severity}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px]">
                {arc.originName} ➔ {arc.targetName}
              </div>
              <div className="text-[9px] text-cyan-400/80 mt-0.5">
                {formatNumber(arc.packets)} packets • {arc.timestamp}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
