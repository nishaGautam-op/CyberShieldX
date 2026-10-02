"use client";

import React, { useState } from "react";
import {
  X,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  Terminal,
  Activity,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lock,
  Play,
  RotateCcw,
} from "lucide-react";
import { Incident } from "@/lib/data/mockSecurityData";
import ShapExplanationView from "../ai/ShapExplanationView";
import confetti from "canvas-confetti";

interface IncidentDetailModalProps {
  incident: Incident | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, newStatus: Incident["status"]) => void;
}

export default function IncidentDetailModal({
  incident,
  onClose,
  onUpdateStatus,
}: IncidentDetailModalProps) {
  const [executing, setExecuting] = useState(false);
  const [playbookExecuted, setPlaybookExecuted] = useState(false);

  if (!incident) return null;

  const handleMitigate = () => {
    setExecuting(true);
    setTimeout(() => {
      setExecuting(false);
      setPlaybookExecuted(true);
      if (onUpdateStatus) {
        onUpdateStatus(incident.id, "Contained");
      }
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#00f3ff", "#10b981", "#3b82f6"],
        });
      } catch (err) {}
    }, 1200);
  };

  const handleResolve = () => {
    if (onUpdateStatus) {
      onUpdateStatus(incident.id, "Resolved");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel-glow rounded-2xl flex flex-col overflow-hidden border border-cyan-400/40 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black/60 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                incident.severity === "critical"
                  ? "bg-red-500/20 border-red-500 text-red-400"
                  : incident.severity === "high"
                  ? "bg-amber-500/20 border-amber-500 text-amber-400"
                  : "bg-cyan-500/20 border-cyan-500 text-cyan-300"
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-bold text-sm">{incident.id}</span>
                <span className="text-slate-500">•</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    incident.severity === "critical"
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : incident.severity === "high"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                  }`}
                >
                  {incident.severity}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                  {incident.status}
                </span>
              </div>
              <h2 className="text-lg font-bold font-mono text-slate-100 mt-0.5">{incident.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">RISK SCORE</span>
              <span className="text-lg font-bold text-red-400">{incident.riskScore}/100</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
              <span className="text-lg font-bold text-cyan-300">{incident.confidence}%</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">MITRE TECHNIQUE</span>
              <span className="text-xs font-bold text-slate-200 truncate block mt-1">
                {incident.mitreTechnique}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-slate-800 font-mono text-xs">
              <span className="text-slate-400 block text-[10px]">TIMESTAMP</span>
              <span className="text-xs font-bold text-slate-300 block mt-1">{incident.timestamp}</span>
            </div>
          </div>

          {/* Telemetry Vectors */}
          <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/20 font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-20 text-slate-500">Source:</span>
              <span className="text-cyan-300 font-bold">{incident.source}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-20 text-slate-500">Target:</span>
              <span className="text-slate-200 font-bold">{incident.target}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-20 text-slate-500">Resource:</span>
              <span className="text-amber-400 font-bold">{incident.affectedResource}</span>
            </div>
            {incident.payloadSignature && (
              <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-800">
                <span className="w-20 text-slate-500">Payload:</span>
                <code className="text-red-300 bg-red-950/40 px-2 py-0.5 rounded text-[11px] font-mono truncate max-w-xl">
                  {incident.payloadSignature}
                </code>
              </div>
            )}
          </div>

          {/* Explainable AI Diagnostics & SHAP Breakdown */}
          <ShapExplanationView
            threatTitle={incident.title}
            reasons={incident.explanation.reasons}
            shapFeatures={incident.explanation.shapFeatures}
            riskScore={incident.riskScore}
            confidence={incident.confidence}
          />

          {/* Recommended Defensive Action Box */}
          <div className="p-5 rounded-xl bg-cyan-950/30 border border-cyan-400/40 font-mono text-xs">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Recommended Defensive Playbook
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">{incident.recommendedAction}</p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleMitigate}
                disabled={executing || playbookExecuted || incident.status === "Contained" || incident.status === "Resolved"}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer"
              >
                {executing ? (
                  <>
                    <Terminal className="w-4 h-4 animate-spin" />
                    <span>Executing Defense Playbook...</span>
                  </>
                ) : playbookExecuted || incident.status === "Contained" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                    <span>Playbook Executed (Node Contained)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    <span>Execute Automated Containment Playbook</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResolve}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
              >
                Mark Incident Resolved
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
