"use client";

import React, { useState } from "react";
import MetricCards from "@/components/dashboard/MetricCards";
import RiskScoreCircle from "@/components/dashboard/RiskScoreCircle";
import LiveThreatFeed from "@/components/dashboard/LiveThreatFeed";
import IncidentDetailModal from "@/components/dashboard/IncidentDetailModal";
import dynamic from "next/dynamic";

const NetworkTopology3D = dynamic(() => import("@/components/3d/NetworkTopology3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] w-full rounded-xl glass-panel border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
      Initializing 3D Network Topology Grid...
    </div>
  ),
});
import {
  INITIAL_INCIDENTS,
  INITIAL_METRICS,
  NETWORK_NODES,
  Incident,
  NetworkNode,
} from "@/lib/data/mockSecurityData";
import { Activity, Radio, Shield, AlertOctagon, Sparkles, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [nodes, setNodes] = useState<NetworkNode[]>(NETWORK_NODES);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);

  const handleUpdateStatus = (id: string, newStatus: Incident["status"]) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
  };

  const handleIsolateNode = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, status: "secure", riskScore: 5 } : n))
    );
    setSelectedNode(null);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
              Cyber Operations Command Deck
            </h1>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Real-time defensive posture • Autonomous XGBoost + SHAP inference online
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/threats"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-semibold transition-all shadow-[0_0_15px_rgba(0,243,255,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI Anomaly Lab</span>
          </Link>
          <Link
            href="/dashboard/intelligence"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-mono text-xs font-semibold transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-purple-300" />
            <span>3D Threat Globe</span>
          </Link>
        </div>
      </div>

      {/* 1. Animated Security Overview Metrics Cards */}
      <MetricCards
        threatsCount={INITIAL_METRICS.threatsDetected}
        criticalCount={INITIAL_METRICS.criticalThreats}
        incidentsCount={INITIAL_METRICS.activeIncidents}
        systemsProtected={INITIAL_METRICS.systemsProtected}
        detectionRate={INITIAL_METRICS.threatDetectionRate}
        securityScore={INITIAL_METRICS.securityScore}
      />

      {/* 2. Main Center Grid: 3D Topology + Security Score Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 3D Network Topology (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider">
                Live 3D Network Topology & Packet Vectors
              </h2>
            </div>
            <Link
              href="/dashboard/network"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              <span>Expand Full Grid</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="h-[460px] w-full">
            <NetworkTopology3D
              nodes={nodes}
              onSelectNode={(node) => setSelectedNode(node)}
            />
          </div>
        </div>

        {/* Global Security Score Gauge with Sub-scores (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <RiskScoreCircle
            score={INITIAL_METRICS.securityScore}
            maxScore={100}
            label="SECURITY SCORE"
            variant="security-health"
            subScores={INITIAL_METRICS.subScores}
          />
        </div>
      </div>

      {/* 3. Live Threat Feed & Early Warning Stream */}
      <div>
        <LiveThreatFeed
          incidents={incidents}
          onSelectIncident={(incident) => setSelectedIncident(incident)}
        />
      </div>

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Node Inspect Drawer/Modal */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl glass-panel-glow p-6 border border-cyan-400/40 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <span className="font-bold text-sm text-cyan-300">{selectedNode.name}</span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-300">
              <div>Zone: <span className="text-slate-100 font-bold">{selectedNode.zone}</span></div>
              <div>IP: <span className="text-cyan-300">{selectedNode.ip}</span></div>
              <div>Location: <span className="text-slate-100">{selectedNode.location}</span></div>
              <div>Throughput: <span className="text-cyan-400">{selectedNode.trafficMbps} Mbps</span></div>
              <div>
                Status:{" "}
                <span
                  className={
                    selectedNode.status === "critical"
                      ? "text-red-400 font-bold uppercase"
                      : selectedNode.status === "suspicious"
                      ? "text-amber-400 font-bold uppercase"
                      : "text-emerald-400 font-bold uppercase"
                  }
                >
                  {selectedNode.status} (Risk: {selectedNode.riskScore}/100)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => handleIsolateNode(selectedNode.id)}
                className="flex-1 py-2.5 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 cursor-pointer"
              >
                Apply Micro-Segmentation Isolation
              </button>
              <button
                onClick={() => setSelectedNode(null)}
                className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
