"use client";

import React, { useState } from "react";
import { NETWORK_NODES, NetworkNode } from "@/lib/data/mockSecurityData";
import { Network, ShieldAlert, Lock, RefreshCw, CheckCircle2, Flame, Server } from "lucide-react";
import confetti from "canvas-confetti";
import dynamic from "next/dynamic";

const NetworkTopology3D = dynamic(() => import("@/components/3d/NetworkTopology3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-xl glass-panel border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
      Initializing 3D Network Topology Grid...
    </div>
  ),
});

export default function NetworkPage() {
  const [nodes, setNodes] = useState<NetworkNode[]>(NETWORK_NODES);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [filterZone, setFilterZone] = useState<string>("All");
  const [isolatedNodeId, setIsolatedNodeId] = useState<string | null>(null);

  const filteredNodes = nodes.filter(
    (n) => filterZone === "All" || n.zone === filterZone
  );

  const handleIsolateNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === nodeId
          ? { ...n, status: "secure", riskScore: 4, trafficMbps: 0 }
          : n
      )
    );
    setIsolatedNodeId(nodeId);
    if (selectedNode?.id === nodeId) {
      setSelectedNode((prev) =>
        prev ? { ...prev, status: "secure", riskScore: 4, trafficMbps: 0 } : null
      );
    }
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ["#00f3ff", "#10b981"],
      });
    } catch (e) {}
  };

  const handleResetTopology = () => {
    setNodes(NETWORK_NODES);
    setIsolatedNodeId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
              Live Threat Monitor & 3D Network Topology
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Real-time interactive 3D spatial mapping of internal core, DMZ, external adversary ingress, and packet telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTopology}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Zone Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        <span className="text-slate-500 font-mono">Filter Zone:</span>
        {["All", "External", "DMZ", "Internal Core", "Restricted Vault"].map((zone) => (
          <button
            key={zone}
            onClick={() => setFilterZone(zone)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterZone === zone
                ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                : "bg-black/40 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* Main 3D Topology Canvas */}
      <div className="h-[520px] w-full">
        <NetworkTopology3D
          nodes={filteredNodes}
          onSelectNode={(node) => setSelectedNode(node)}
        />
      </div>

      {/* Nodes Table & Telemetry Breakdown */}
      <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
        <h3 className="font-mono font-bold text-sm text-slate-100 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Server className="w-4 h-4 text-cyan-400" />
          Active Infrastructure Nodes & Telemetry Vector
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Node Name</th>
                <th className="py-2.5 px-3">Zone</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Throughput</th>
                <th className="py-2.5 px-3">Risk Rating</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Defense Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredNodes.map((n) => {
                const isCritical = n.status === "critical";
                const isSuspicious = n.status === "suspicious";

                return (
                  <tr
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className="hover:bg-slate-900/40 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-3 font-semibold text-slate-200 flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCritical
                            ? "bg-red-500 animate-ping"
                            : isSuspicious
                            ? "bg-amber-400"
                            : "bg-cyan-400"
                        }`}
                      />
                      {n.name}
                    </td>
                    <td className="py-3 px-3 text-slate-400">{n.zone}</td>
                    <td className="py-3 px-3 text-cyan-300">{n.ip}</td>
                    <td className="py-3 px-3 text-slate-300">{n.trafficMbps} Mbps</td>
                    <td className="py-3 px-3">
                      <span
                        className={`font-bold ${
                          n.riskScore >= 70
                            ? "text-red-400"
                            : n.riskScore >= 40
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {n.riskScore}/100
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isCritical
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : isSuspicious
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                        }`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isCritical || isSuspicious ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIsolateNode(n.id);
                          }}
                          className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Isolate Node
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-400/80">Protected</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
