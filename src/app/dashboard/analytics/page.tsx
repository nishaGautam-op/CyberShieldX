"use client";

import React from "react";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import { BarChart3, TrendingUp, Zap, Clock, ShieldCheck } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            Security Telemetry & Defensive Analytics
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Statistical aggregations of ingress velocity, autonomous containment velocity, risk distribution curves,
          and MTTR benchmarks across the enterprise.
        </p>
      </div>

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl glass-panel border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>AVG RESPONSE TIME</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-300">1.9 min</div>
          <span className="text-[10px] text-emerald-400">▼ 60% faster with Playbooks</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>FALSE POSITIVE RATE</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">0.13%</div>
          <span className="text-[10px] text-slate-400">Based on 1.4M packet samples</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>AUTONOMOUS BLOCKS</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">1,257 / 1,284</div>
          <span className="text-[10px] text-slate-400">97.8% zero-touch containment</span>
        </div>

        <div className="p-4 rounded-xl glass-panel border border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span>SOC EFFICIENCY DELTA</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-300">+340%</div>
          <span className="text-[10px] text-slate-400">SHAP explainability acceleration</span>
        </div>
      </div>

      {/* Interactive Recharts */}
      <AnalyticsCharts />
    </div>
  );
}
