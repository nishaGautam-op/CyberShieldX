"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, ArrowRight, Activity, Lock, Terminal, Sparkles, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const ShieldCanvas = dynamic(() => import("../3d/ShieldCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-cyan-400">
      Initializing 3D Shield Layer...
    </div>
  ),
});

export default function HeroSection() {
  const [threatMode, setThreatMode] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#02040a]">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* Volumetric Radial Light Beam behind shield */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-purple-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Live Cyber Ticker at the top */}
      <div className="relative z-20 max-w-7xl mx-auto w-full mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-full glass-panel border border-cyan-500/20 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="text-cyan-300 font-bold tracking-wider">● SYSTEM PROTECTED</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-400 text-[11px]">
            <span>SHIELDAI MATRIX: ONLINE</span>
            <span>•</span>
            <span>ZERO-TRUST INTEGRITY: 100%</span>
            <span>•</span>
            <span>ACTIVE DEFLECTION: READY</span>
          </div>

          <button
            onClick={() => setThreatMode(!threatMode)}
            className="px-2.5 py-1 rounded-full text-[10px] font-mono border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer"
          >
            {threatMode ? "Reset Shield Normal" : "Simulate Deflection Wave"}
          </button>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Column: Headlines & CTAs (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span className="font-mono text-xs font-semibold text-cyan-200 tracking-wider uppercase">
              Autonomous AI Threat Detection Engine
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-mono font-extrabold tracking-tight leading-[1.08] text-slate-100">
            DEFEND. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 cyan-text-glow">
              DETECT.
            </span>{" "}
            <br />
            DOMINATE.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
            AI-powered cybersecurity intelligence that detects threats before they become breaches.
            Continuous behavioral anomaly analysis with mathematical SHAP explainability.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-black font-mono font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(0,243,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] group cursor-pointer"
            >
              <span>Enter Security Center</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#cinematic-experience"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl glass-panel glass-panel-hover font-mono font-bold text-sm tracking-wider uppercase text-slate-200 border border-slate-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
            >
              <span>Explore CyberShieldX</span>
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            </a>
          </div>

          {/* Real-time telemetry indicators */}
          <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-md mx-auto lg:mx-0">
            <div>
              <span className="text-xs font-mono text-slate-400 block">DETECTION RATE</span>
              <span className="text-xl font-extrabold font-mono text-cyan-300">98.7%</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block">SECURITY SCORE</span>
              <span className="text-xl font-extrabold font-mono text-cyan-300">94/100</span>
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 block">AVG MITIGATION</span>
              <span className="text-xl font-extrabold font-mono text-emerald-400">1.9 min</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Digital Shield floating in space (5 cols) */}
        <div className="lg:col-span-5 h-[480px] sm:h-[560px] relative flex items-center justify-center">
          <ShieldCanvas interactive={true} threatActive={threatMode} className="w-full h-full" />

          {/* Floating HUD chips around shield */}
          <div className="absolute top-10 right-2 sm:right-6 p-2.5 rounded-lg glass-panel border border-cyan-400/30 text-[11px] font-mono text-cyan-200 backdrop-blur-md shadow-lg pointer-events-none hidden sm:block animate-pulse">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>CIRCUIT ARRAY: ARMED</span>
            </div>
            <div className="text-[9px] text-slate-400">SHA-512 Encrypted Grid</div>
          </div>

          <div className="absolute bottom-12 left-2 sm:left-6 p-2.5 rounded-lg glass-panel border border-purple-400/30 text-[11px] font-mono text-purple-200 backdrop-blur-md shadow-lg pointer-events-none hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>NEURAL SHAP ATTRIBUTION</span>
            </div>
            <div className="text-[9px] text-slate-400">Real-time Game-Theoretic XAI</div>
          </div>
        </div>
      </div>

      {/* Real-Time Live Threat Ticker across bottom */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-8 border-t border-cyan-500/10">
        <div className="overflow-hidden whitespace-nowrap py-2 font-mono text-xs text-slate-400 flex items-center gap-6">
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold shrink-0">
            LIVE TELEMETRY STREAM
          </span>
          <div className="inline-block animate-[marquee_25s_linear_infinite] space-x-8">
            <span className="text-slate-300">
              <strong className="text-emerald-400">[BLOCKED]</strong> 194.26.29.112 Brute-Force SSH Auth Attempt — 0.4s ago
            </span>
            <span className="text-slate-300">
              <strong className="text-amber-400">[ANALYZING]</strong> Anomaly in OAuth Token Grant #TK-9921 (Risk: 68)
            </span>
            <span className="text-slate-300">
              <strong className="text-cyan-400">[NEUTRALIZED]</strong> Blind SQL Injection in Checkout API — Edge WAF
            </span>
            <span className="text-slate-300">
              <strong className="text-purple-400">[INTEGRITY]</strong> ShieldAI Defense Matrix v4.8: 100% Posture
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
