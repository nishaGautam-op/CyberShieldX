"use client";

import React from "react";
import ThreatLogAnalyzer from "@/components/ai/ThreatLogAnalyzer";
import { Zap, ShieldAlert, Cpu } from "lucide-react";

export default function ThreatsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            AI Threat Detection & Anomaly Lab
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Upload security event logs, evaluate suspicious URLs, scan adversary IP indicators, or deconstruct raw API payloads
          using our neural gradient-boosted detection model with SHAP explainability.
        </p>
      </div>

      {/* Main Analyzer Component */}
      <ThreatLogAnalyzer />
    </div>
  );
}
