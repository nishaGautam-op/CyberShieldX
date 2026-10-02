"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, HelpCircle, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

interface ShapFeature {
  feature: string;
  contribution: number; // percentage
  direction: "risk" | "safe";
  rawValue?: string;
  description?: string;
}

interface ShapExplanationViewProps {
  threatTitle: string;
  reasons: string[];
  shapFeatures: ShapFeature[];
  riskScore: number;
  confidence: number;
  className?: string;
}

export default function ShapExplanationView({
  threatTitle,
  reasons,
  shapFeatures,
  riskScore,
  confidence,
  className = "",
}: ShapExplanationViewProps) {
  const [showMathDetails, setShowMathDetails] = useState(false);

  return (
    <div className={`rounded-xl glass-panel p-5 border border-cyan-500/30 ${className}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-base font-bold font-mono tracking-wide text-cyan-300 uppercase">
              Explainable AI (XAI) Diagnostic Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interpreted via SHAP (SHapley Additive exPlanations) Game-Theoretic Feature Attribution
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/50 border border-cyan-500/30 font-mono text-xs">
            <span className="text-slate-400">Confidence: </span>
            <span className="text-cyan-300 font-bold">{confidence.toFixed(1)}%</span>
          </div>
          <div
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold ${
              riskScore >= 80
                ? "bg-red-500/20 text-red-400 border border-red-500/40"
                : riskScore >= 50
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
            }`}
          >
            Risk: {riskScore}/100
          </div>
        </div>
      </div>

      {/* WHY IS THIS ACTIVITY SUSPICIOUS? */}
      <div className="mt-5">
        <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Why Is This Activity Suspicious?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-lg bg-black/40 border border-slate-800 text-xs font-mono text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SHAP Feature Importance Bars */}
      <div className="mt-6 pt-5 border-t border-cyan-500/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
            <span className="text-cyan-400">f(x)</span>
            Risk Contribution (SHAP Feature Importance)
          </h4>
          <span className="text-[11px] font-mono text-slate-400">
            Base Probability ➔ Model Anomaly Output
          </span>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {shapFeatures.map((item, idx) => {
            const isRisk = item.direction === "risk";
            const barWidth = Math.min(Math.abs(item.contribution) * 2.5, 100);

            return (
              <div key={idx} className="p-2.5 rounded-lg bg-black/30 border border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-200 font-semibold">{item.feature}</span>
                    {item.rawValue && (
                      <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                        {item.rawValue}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-bold ${
                      isRisk ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {isRisk ? `+${item.contribution}%` : `${item.contribution}%`}
                  </span>
                </div>

                {/* Animated bar visualizer */}
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isRisk
                        ? "bg-gradient-to-r from-amber-500 to-red-500 shadow-[0_0_8px_#ef4444]"
                        : "bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_8px_#10b981]"
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>

                {item.description && (
                  <p className="text-[10px] text-slate-500 mt-1">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Accordion: Mathematical Attribution Details */}
      <div className="mt-4 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => setShowMathDetails(!showMathDetails)}
          className="flex items-center justify-between w-full text-left text-xs font-mono text-cyan-400 hover:text-cyan-300 py-1"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Mathematical Shapley Value Formulation
          </span>
          {showMathDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showMathDetails && (
          <div className="mt-2 p-3 rounded bg-black/60 border border-cyan-500/20 text-[11px] font-mono text-slate-400 space-y-2">
            <p>
              Shapley values allocate credit to individual input telemetry attributes using cooperative game theory:
            </p>
            <div className="bg-[#030712] p-2 rounded text-cyan-300 overflow-x-auto text-[10px]">
              {"ϕ_i(v) = ∑ [|S|! (n - |S| - 1)! / n!] × [v(S ∪ {i}) - v(S)]"}
            </div>
            <p>
              This guarantees that the sum of feature attributions equals the difference between the actual risk score
              and the baseline average expected prediction.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
