"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, ArrowRight, Bell, Terminal, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function EarlyWarningSection() {
  const [mitigated, setMitigated] = useState(false);

  const handleMitigate = () => {
    setMitigated(true);
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.8 },
        colors: ["#00f3ff", "#10b981"],
      });
    } catch (e) {}
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#02040a] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline and description */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 font-mono text-xs">
              <Bell className="w-3.5 h-3.5 animate-bounce" />
              <span>PREDICTIVE EARLY WARNING CENTER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-slate-100">
              Detect Anomalies Before They Infiltrate Your Core.
            </h2>

            <p className="text-slate-300 text-sm font-sans leading-relaxed">
              Traditional intrusion detection systems only sound alarms after ransomware has locked your files.
              CyberShieldX analyzes pre-attack reconnaissance vectors, brute-force pacing, and high-entropy staging
              to generate cinematic early warnings with prescriptive mitigation playbooks.
            </p>

            <div className="pt-2">
              <Link
                href="/dashboard/threats"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider"
              >
                <span>Explore Threat Detection Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Cinematic Early Warning Notification Panel */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl glass-threat p-6 sm:p-8 border border-red-500/40 shadow-[0_0_35px_rgba(239,68,68,0.25)]">
              {/* Alert Glow Header */}
              <div className="flex items-center justify-between pb-4 border-b border-red-500/20 mb-4 font-mono">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>
                  <span className="text-sm font-extrabold text-red-400 tracking-wider">
                    ⚠ EARLY WARNING
                  </span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-300">
                  REAL-TIME PRE-EMPTIVE
                </span>
              </div>

              {/* Warning Content */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <h3 className="text-base font-bold text-slate-100 mb-1">
                    Potential brute-force activity detected.
                  </h3>
                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <span>Confidence: <strong className="text-cyan-300">94%</strong></span>
                    <span>•</span>
                    <span>Risk Score: <strong className="text-red-400">92/100</strong></span>
                    <span>•</span>
                    <span>Detection: <strong className="text-slate-200">12s ago</strong></span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/60 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Affected System:</span>
                  <span className="text-slate-200 font-bold text-sm">
                    Authentication Server (auth-cluster-04)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30">
                  <span className="text-amber-400 block text-[10px] uppercase font-bold mb-1">
                    Recommended Action:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Temporarily restrict suspicious source (ASN 49870), initiate authentication review,
                    and trigger hardware-bound FIDO2 token challenge.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleMitigate}
                    disabled={mitigated}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer disabled:opacity-70 disabled:cursor-default"
                  >
                    {mitigated ? (
                      <span className="flex items-center justify-center gap-2 text-white">
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        Source Ingress Restricted (Contained)
                      </span>
                    ) : (
                      "Apply Instant Autonomous Mitigation"
                    )}
                  </button>

                  <Link
                    href="/dashboard/incidents"
                    className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    View in SOC
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
