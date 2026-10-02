"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { NetworkNode } from "@/lib/data/mockSecurityData";

interface NetworkTopology3DProps {
  nodes: NetworkNode[];
  onSelectNode?: (node: NetworkNode) => void;
  selectedNodeId?: string;
  threatTriggered?: boolean;
}

export default function NetworkTopology3D({
  nodes,
  onSelectNode,
  selectedNodeId,
  threatTriggered = false,
}: NetworkTopology3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.05);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambient = new THREE.AmbientLight(0x0a1b38, 3.0);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0x00f3ff, 8, 30);
    pointLight.position.set(0, 5, 8);
    scene.add(pointLight);

    // 3. Position Mapping for Nodes
    // Organize layout in 3D space: External on left, Gateways/Firewalls in center-left, Core in center, Vault on right
    const nodePositions: Record<string, THREE.Vector3> = {
      "ext-actor-01": new THREE.Vector3(-4.8, 1.2, 0.5),
      "fw-edge-01": new THREE.Vector3(-2.8, 0.2, 0.2),
      "gw-ingress-01": new THREE.Vector3(-0.8, 1.8, 0.3),
      "gw-auth-01": new THREE.Vector3(-0.8, -1.2, 0.4),
      "srv-auth-04": new THREE.Vector3(1.2, -1.4, 0.2),
      "srv-api-01": new THREE.Vector3(1.2, 1.4, 0.1),
      "srv-web-01": new THREE.Vector3(1.2, 0.0, -0.2),
      "db-vault-01": new THREE.Vector3(3.6, -1.0, 0.3),
      "db-analytics-01": new THREE.Vector3(3.6, 1.2, 0.2),
      "usr-admin-01": new THREE.Vector3(-0.2, -3.0, 0.5),
    };

    const nodeMeshMap = new Map<string, THREE.Mesh>();
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    // 4. Create Node Meshes
    nodes.forEach((node) => {
      const pos = nodePositions[node.id] || new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, 0);
      
      let nodeColor = 0x00f3ff; // Cyan
      if (node.status === "suspicious") nodeColor = 0xf59e0b; // Amber
      if (node.status === "critical") nodeColor = 0xef4444; // Red

      // Outer glow halo ring
      const haloGeo = new THREE.RingGeometry(0.35, 0.42, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: nodeColor,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(pos);
      nodeGroup.add(haloMesh);

      // Node Core Sphere
      const sphereGeo = new THREE.SphereGeometry(node.type === "threat" ? 0.3 : 0.25, 24, 24);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        emissive: nodeColor,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.position.copy(pos);
      sphereMesh.userData = { node };
      nodeGroup.add(sphereMesh);

      nodeMeshMap.set(node.id, sphereMesh);
    });

    // 5. Create Connection Lines and Traveling Packets
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    interface Packet {
      mesh: THREE.Mesh;
      start: THREE.Vector3;
      end: THREE.Vector3;
      progress: number;
      speed: number;
      color: number;
    }

    const packets: Packet[] = [];

    // Distinct connections
    const drawnEdges = new Set<string>();

    nodes.forEach((node) => {
      const p1 = nodePositions[node.id];
      if (!p1) return;

      node.connections.forEach((targetId) => {
        const edgeKey = [node.id, targetId].sort().join("--");
        if (drawnEdges.has(edgeKey)) return;
        drawnEdges.add(edgeKey);

        const p2 = nodePositions[targetId];
        if (!p2) return;

        // Determine edge color based on threat status
        const isCritical = node.status === "critical" || nodes.find((n) => n.id === targetId)?.status === "critical";
        const isSuspicious = node.status === "suspicious" || nodes.find((n) => n.id === targetId)?.status === "suspicious";

        const lineColor = isCritical ? 0xef4444 : isSuspicious ? 0xf59e0b : 0x00f3ff;

        // Line
        const points = [p1, p2];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: lineColor,
          transparent: true,
          opacity: isCritical ? 0.8 : 0.3,
          linewidth: isCritical ? 2 : 1,
        });
        const line = new THREE.Line(lineGeo, lineMat);
        linesGroup.add(line);

        // Add 1-2 animated packets per edge
        for (let i = 0; i < (isCritical ? 3 : 1); i++) {
          const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
          const packetMat = new THREE.MeshBasicMaterial({
            color: lineColor,
          });
          const packetMesh = new THREE.Mesh(packetGeo, packetMat);
          packetMesh.position.copy(p1);
          scene.add(packetMesh);

          packets.push({
            mesh: packetMesh,
            start: p1,
            end: p2,
            progress: Math.random(),
            speed: isCritical ? 0.015 + Math.random() * 0.01 : 0.005 + Math.random() * 0.005,
            color: lineColor,
          });
        }
      });
    });

    // 6. Interactive Raycasting for Node Hover/Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(nodeMeshMap.values());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitNode = intersects[0].object.userData.node as NetworkNode;
        setHoveredNode(hitNode);
        container.style.cursor = "pointer";
      } else {
        setHoveredNode(null);
        container.style.cursor = "default";
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(nodeMeshMap.values());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hitNode = intersects[0].object.userData.node as NetworkNode;
        if (onSelectNode) onSelectNode(hitNode);
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("click", handleClick);

    // 7. Render Loop
    let clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Animate packet travel
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;
        p.mesh.position.lerpVectors(p.start, p.end, p.progress);
      });

      // Animate pulsing nodes
      nodeMeshMap.forEach((mesh, id) => {
        const node = mesh.userData.node as NetworkNode;
        if (node.status === "critical") {
          const scale = 1 + Math.sin(time * 6) * 0.25;
          mesh.scale.set(scale, scale, scale);
        } else if (node.status === "suspicious") {
          const scale = 1 + Math.sin(time * 3) * 0.12;
          mesh.scale.set(scale, scale, scale);
        } else {
          mesh.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("click", handleClick);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [nodes, threatTriggered, onSelectNode]);

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl overflow-hidden glass-panel border border-cyan-500/20">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Topology Legend HUD */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-3 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-cyan-500/30 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f3ff] shadow-[0_0_8px_#00f3ff]" />
          <span className="text-slate-300 font-mono">Normal (Secured)</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-amber-500/30 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          <span className="text-slate-300 font-mono">Suspicious Vector</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 border border-red-500/30 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-red-400 font-mono font-semibold">Active Breach / Critical</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 z-20 p-3 rounded-lg bg-black/90 border border-cyan-400/40 shadow-xl backdrop-blur-md text-xs font-mono max-w-sm pointer-events-none animate-fadeIn">
          <div className="flex items-center justify-between gap-4 mb-1">
            <span className="text-cyan-300 font-bold text-sm">{hoveredNode.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                hoveredNode.status === "critical"
                  ? "bg-red-500/20 text-red-400 border border-red-500/40"
                  : hoveredNode.status === "suspicious"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              }`}
            >
              {hoveredNode.status}
            </span>
          </div>
          <div className="text-slate-400 space-y-0.5 text-[11px]">
            <div>IP Address: <span className="text-slate-200">{hoveredNode.ip}</span></div>
            <div>Zone: <span className="text-slate-200">{hoveredNode.zone}</span></div>
            <div>Throughput: <span className="text-cyan-400">{hoveredNode.trafficMbps} Mbps</span></div>
            <div>Risk Score: <span className={hoveredNode.riskScore > 70 ? "text-red-400 font-bold" : "text-emerald-400"}>{hoveredNode.riskScore}/100</span></div>
          </div>
          <div className="mt-2 text-[10px] text-cyan-400/70 border-t border-slate-800 pt-1">
            Click node to isolate or inspect packet stream
          </div>
        </div>
      )}
    </div>
  );
}
