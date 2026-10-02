"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Flame, ShieldAlert, X, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { Incident } from "@/lib/data/mockSecurityData";
import { playThreatAlertSound, isSoundEnabled, setSoundEnabled } from "@/lib/sound-alerts";

interface ThreatAlertToastProps {
  threat: Incident | null;
  onDismiss: () => void;
  onInvestigate: (incident: Incident) => void;
}

export default function ThreatAlertToast({
  threat,
  onDismiss,
  onInvestigate,
}: ThreatAlertToastProps) {
  const [soundActive, setSoundActive] = useState(true);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    setSoundActive(isSoundEnabled());
  }, []);

  useEffect(() => {
    if (!threat) return;

    // Trigger professional audio alert for this incident
    playThreatAlertSound(threat.severity, threat.id);

    // Pulse animation for 3 seconds
    setPulse(true);
    const timer = setTimeout(() => {
      setPulse(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [threat]);

  if (!threat) return null;

  const isCritical = threat.severity === "critical";
  const isHigh = threat.severity === "high";

  return (
    <div
      className={`fixed top-20 right-6 z-50 w-[92vw] max-w-md rounded-2xl p-5 backdrop-blur-xl border transition-all duration-300 shadow-2xl animate-in slide-in-from-top-4 ${
        isCritical
          ? "bg-red-950/90 border-red-500/80 shadow-[0_0_35px_rgba(239,68,68,0.4)]"
          : isHigh
          ? "bg-amber-950/90 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.35)]"
          : "bg-[#071329]/95 border-cyan-500/60 shadow-[0_0_25px_rgba(0,243,255,0.3)]"
      } ${pulse ? "ring-2 ring-red-400 ring-offset-2 ring-offset-black" : ""}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <span className="text-sm font-extrabold text-red-300 tracking-wider uppercase">
            🚨 {isCritical ? "CRITICAL THREAT DETECTED" : "SECURITY ANOMALY DETECTED"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !soundActive;
              setSoundEnabled(next);
              setSoundActive(next);
            }}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
            title={soundActive ? "Mute alert audio" : "Unmute alert audio"}
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <button
            onClick={onDismiss}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="mt-3 space-y-2.5 font-mono text-xs">
        <div className="text-base font-bold text-slate-100 leading-snug">
          {threat.title}
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2 rounded bg-black/50 border border-slate-800">
            <span className="text-slate-400 block text-[9px] uppercase">Risk Score</span>
            <span className="text-base font-extrabold text-red-400">
              {threat.riskScore}/100
            </span>
          </div>

          <div className="p-2 rounded bg-black/50 border border-slate-800">
            <span className="text-slate-400 block text-[9px] uppercase">Confidence</span>
            <span className="text-base font-extrabold text-cyan-300">
              {threat.confidence}%
            </span>
          </div>
        </div>

        <div className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-1">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>⚠ Immediate Investigation Recommended</span>
        </div>

        <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-white/10">
          <span>Target: {threat.target.split(" ")[0]}</span>
          <span>{threat.timestamp}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              onInvestigate(threat);
              onDismiss();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(239,68,68,0.5)] cursor-pointer"
          >
            <span>Investigate Threat & Open Diagnostics</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
