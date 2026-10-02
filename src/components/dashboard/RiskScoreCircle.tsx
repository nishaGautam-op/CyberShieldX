"use client";

import React from "react";
import { Shield, AlertOctagon, CheckCircle2, Lock, Cpu, Eye, Activity } from "lucide-react";

interface RiskScoreCircleProps {
  score: number;
  maxScore?: number;
  label?: string;
  category?: string;
  confidence?: number;
  affectedResource?: string;
  variant?: "threat-risk" | "security-health";
  subScores?: {
    networkSecurity: number;
    authenticationSecurity: number;
    behavioralSecurity: number;
    threatExposure: number;
    incidentResponse: number;
  };
}

export default function RiskScoreCircle({
  score,
  maxScore = 100,
  label = "SECURITY SCORE",
  category = "Identity & Perimeter",
  confidence = 97.4,
  affectedResource,
  variant = "security-health",
  subScores,
}: RiskScoreCircleProps) {
  // SVG Circular Gauge Math
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isRiskVariant = variant === "threat-risk";

  // Color mapping
  let strokeColor = "#00f3ff"; // Cyan
  let glowColor = "rgba(0, 243, 255, 0.4)";
  let statusText = "OPTIMAL";

  if (isRiskVariant) {
    if (score >= 85) {
      strokeColor = "#ef4444";
      glowColor = "rgba(239, 68, 68, 0.5)";
      statusText = "CRITICAL";
    } else if (score >= 60) {
      strokeColor = "#f59e0b";
      glowColor = "rgba(245, 158, 11, 0.5)";
      statusText = "HIGH";
    } else {
      strokeColor = "#00f3ff";
      glowColor = "rgba(0, 243, 255, 0.4)";
      statusText = "ELEVATED";
    }
  } else {
    // Health score
    if (score >= 90) {
      strokeColor = "#00f3ff";
      statusText = "SECURE";
    } else if (score >= 75) {
      strokeColor = "#f59e0b";
      statusText = "VULNERABLE";
    } else {
      strokeColor = "#ef4444";
      statusText = "AT RISK";
    }
  }

  return (
    <div className="rounded-xl glass-panel p-6 border border-cyan-500/20 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-500/10 mb-4">
        <div className="flex items-center gap-2">
          {isRiskVariant ? (
            <AlertOctagon className="w-4 h-4 text-red-400" />
          ) : (
            <Shield className="w-4 h-4 text-cyan-400" />
          )}
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            {isRiskVariant ? "Real-Time Risk Engine" : "Global Security Posture"}
          </span>
        </div>
        <span
          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase"
          style={{
            backgroundColor: `${strokeColor}20`,
            color: strokeColor,
            border: `1px solid ${strokeColor}50`,
          }}
        >
          {statusText}
        </span>
      </div>

      {/* Main Circular Gauge */}
      <div className="flex flex-col items-center justify-center my-2">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
            {/* Background Track */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="14"
              fill="transparent"
            />

            {/* Glowing Accent Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke={strokeColor}
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 10px ${glowColor})`,
                transition: "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </svg>

          {/* Centered Numbers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span
              className="text-4xl font-extrabold font-mono tracking-tight"
              style={{ color: strokeColor }}
            >
              {score}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
              / {maxScore}
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-300 uppercase mt-1 tracking-wider">
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Contextual Sub-metrics */}
      {isRiskVariant ? (
        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs font-mono">
          <div className="flex justify-between text-slate-400">
            <span>Threat Category:</span>
            <span className="text-slate-200 font-semibold">{category}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Model Confidence:</span>
            <span className="text-cyan-300 font-semibold">{confidence}%</span>
          </div>
          {affectedResource && (
            <div className="flex justify-between text-slate-400">
              <span>Affected Resource:</span>
              <span className="text-red-400 font-semibold truncate max-w-[180px]">{affectedResource}</span>
            </div>
          )}
        </div>
      ) : subScores ? (
        <div className="mt-4 pt-4 border-t border-cyan-500/20 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> Network Security
            </span>
            <span className="text-cyan-300 font-bold">{subScores.networkSecurity}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_#00f3ff]"
              style={{ width: `${subScores.networkSecurity}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Authentication Security
            </span>
            <span className="text-purple-300 font-bold">{subScores.authenticationSecurity}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_#8b5cf6]"
              style={{ width: `${subScores.authenticationSecurity}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Behavioral Security
            </span>
            <span className="text-emerald-300 font-bold">{subScores.behavioralSecurity}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_#10b981]"
              style={{ width: `${subScores.behavioralSecurity}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-amber-400" /> Threat Exposure
            </span>
            <span className="text-amber-300 font-bold">{subScores.threatExposure}%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_#f59e0b]"
              style={{ width: `${subScores.threatExposure}%` }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
