"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Radio,
  Zap,
  CheckCircle2,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function CinematicStory() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const scenes = [
    {
      id: 1,
      name: "Scene 1 — Threat",
      tagline: "Every system leaves a digital footprint.",
      description:
        "Billions of network packets flow continuously across enterprise firewalls, gateways, and cloud pods. Hidden within the baseline noise lies microscopic behavioral drift.",
      badge: "FOOTPRINT MONITORING",
      badgeColor: "cyan",
      visual: "nodes-ambient",
    },
    {
      id: 2,
      name: "Scene 2 — Attack",
      tagline: "And every anomaly can become a threat.",
      description:
        "An adversary cluster from bulletproof ASN AS49870 launches coordinated multi-stage credential spraying. Attack signals traverse edge proxies, bypassing legacy static signature filters.",
      badge: "ANOMALY INGRESS",
      badgeColor: "amber",
      visual: "threat-signals",
    },
    {
      id: 3,
      name: "Scene 3 — Detection",
      tagline: "CyberShieldX detects the abnormal.",
      description:
        "Autonomous neural sensors awaken. High-frequency behavioral telemetry vectors are ingested into the XGBoost engine. Dynamic scanning waves sweep through the network topology.",
      badge: "DEFENSE SCAN ACTIVE",
      badgeColor: "cyan",
      visual: "shield-activating",
    },
    {
      id: 4,
      name: "Scene 4 — Intelligence",
      tagline: "Understand the signal through Explainable AI.",
      description:
        "The SHAP engine breaks down the anomaly into exact mathematical feature attributions. The threat is deconstructed before human operators even receive the alert.",
      badge: "XAI ATTRIBUTION",
      badgeColor: "red",
      visual: "intelligence-breakdown",
    },
    {
      id: 5,
      name: "Scene 5 — Protection",
      tagline: "Understand the threat. Respond before the damage.",
      description:
        "The CyberShieldX digital defense matrix expands. Autonomous micro-segmentation isolates the compromised authentication endpoint while innocent user workflows remain uninterrupted.",
      badge: "DEFENSE MATRIX ENGAGED",
      badgeColor: "emerald",
      visual: "shield-expand",
    },
    {
      id: 6,
      name: "Scene 6 — Command Center",
      tagline: "Unified SOC orchestration at your fingertips.",
      description:
        "All telemetry, live 3D network topology, incident management, and ShieldAI assistant fuse into a singular cyber operations deck.",
      badge: "COMMAND CENTER READY",
      badgeColor: "cyan",
      visual: "command-center",
    },
  ];

  // Auto-advance scenes when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, scenes.length]);

  const scene = scenes[currentScene];

  return (
    <section id="cinematic-experience" className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#02040a] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-600/10 via-blue-600/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>CINEMATIC SCROLL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-slate-100 tracking-tight">
            How CyberShieldX Protects The Grid
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-mono mt-3">
            Step through the lifecycle of an autonomous threat detection & defense response sequence.
          </p>
        </div>

        {/* Cinematic Stage Container */}
        <div className="relative rounded-2xl glass-panel-glow border border-cyan-500/30 overflow-hidden shadow-2xl p-6 lg:p-12 min-h-[500px] flex flex-col justify-between">
          {/* Top Bar: Timeline Indicators & Control */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
            {/* Step Indicators */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {scenes.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentScene(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all flex items-center gap-2 ${
                    currentScene === idx
                      ? "bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(0,243,255,0.4)]"
                      : "bg-black/50 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <span>0{s.id}</span>
                  <span className="hidden md:inline">{s.name.split("—")[1]}</span>
                </button>
              ))}
            </div>

            {/* Play / Pause / Reset Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-black/60 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                title={isPlaying ? "Pause cinematic flow" : "Auto-play cinematic flow"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setCurrentScene(0);
                  setIsPlaying(true);
                }}
                className="p-2 rounded-lg bg-black/60 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                title="Restart from beginning"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Cinematic Scene View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8">
            {/* Left: Narrative Script */}
            <div className="lg:col-span-6 space-y-4 font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    scene.badgeColor === "red"
                      ? "bg-red-500/20 text-red-400 border border-red-500/40"
                      : scene.badgeColor === "amber"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : scene.badgeColor === "emerald"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  }`}
                >
                  {scene.badge}
                </span>
                <span className="text-slate-500 text-xs">• PHASE {currentScene + 1}/6</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight leading-snug">
                "{scene.tagline}"
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">{scene.description}</p>

              {/* Dynamic Telemetry Box per Scene */}
              {currentScene === 3 && (
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/50 space-y-2 mt-4 font-mono">
                  <div className="flex items-center justify-between text-xs text-red-400 font-bold">
                    <span>ANOMALY DETECTED</span>
                    <span className="animate-ping w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div className="text-sm font-extrabold text-slate-100">
                    RISK SCORE: <span className="text-red-400">92 / 100</span>
                  </div>
                  <div className="text-xs text-amber-400">THREAT LEVEL: CRITICAL</div>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-red-900/60">
                    Key Driver: Unusual Geo-Origin (+31%) • 48 Failed Attempts (+24%)
                  </div>
                </div>
              )}

              {currentScene === 4 && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/50 space-y-2 mt-4 font-mono">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                    <span>AUTONOMOUS SHIELD ACTION</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xs text-slate-200">
                    Host auth-srv-04 placed in micro-segmented isolation sandbox.
                  </div>
                  <div className="text-[11px] text-cyan-400">
                    Zero latency penalty across remaining 141 core enterprise nodes.
                  </div>
                </div>
              )}

              {currentScene === 5 && (
                <div className="pt-2">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all cursor-pointer"
                  >
                    <span>Enter Live Command Center</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right: Futuristic Visual Representation */}
            <div className="lg:col-span-6 h-[340px] rounded-xl bg-black/60 border border-cyan-500/20 relative flex items-center justify-center overflow-hidden">
              {/* Animated HUD Radar Grid */}
              <div className="absolute inset-0 cyber-grid-dense opacity-40" />

              {/* Scene 1 Visual */}
              {currentScene === 0 && (
                <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                  <div className="relative w-36 h-36 rounded-full border border-cyan-500/30 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-cyan-500/50 flex items-center justify-center animate-ping" />
                    <Radio className="w-8 h-8 text-cyan-400 absolute" />
                  </div>
                  <span className="font-mono text-xs text-cyan-300">
                    Continuous Ingress Telemetry: 1,420,000 pkts/s
                  </span>
                </div>
              )}

              {/* Scene 2 Visual */}
              {currentScene === 1 && (
                <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                  <div className="relative w-36 h-36 rounded-full border border-red-500/40 flex items-center justify-center bg-red-950/20">
                    <div className="w-28 h-28 rounded-full border border-red-500/60 animate-ping" />
                    <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                  </div>
                  <span className="font-mono text-xs text-red-400 font-bold">
                    Adversary Threat Vector Injected (AS49870)
                  </span>
                </div>
              )}

              {/* Scene 3 Visual */}
              {currentScene === 2 && (
                <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                  <div className="relative w-40 h-40 rounded-full border border-cyan-400/50 flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-t-2 border-cyan-400 animate-spin" />
                    <Shield className="w-12 h-12 text-cyan-400 absolute animate-pulse" />
                  </div>
                  <span className="font-mono text-xs text-cyan-300 font-bold">
                    Neural Defense Shield Activating: Heuristic Scan Wave
                  </span>
                </div>
              )}

              {/* Scene 4 Visual */}
              {currentScene === 3 && (
                <div className="p-4 w-full max-w-sm space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Unusual Location</span>
                    <span className="text-red-400 font-bold">+31%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[78%]" />
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Failed Attempts</span>
                    <span className="text-red-400 font-bold">+24%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[60%]" />
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Unknown Device</span>
                    <span className="text-red-400 font-bold">+18%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[45%]" />
                  </div>
                </div>
              )}

              {/* Scene 5 Visual */}
              {currentScene === 4 && (
                <div className="relative flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-36 h-36 rounded-full border-2 border-emerald-400/70 bg-emerald-950/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-14 h-14 text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs text-emerald-300 font-bold">
                    Adversary Neutralized • Zero Breach Surface
                  </span>
                </div>
              )}

              {/* Scene 6 Visual */}
              {currentScene === 5 && (
                <div className="p-6 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 mx-auto flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h4 className="text-base font-bold text-slate-100">Cyber Defense Center Online</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Live telemetry, 3D network topology, and ShieldAI assistant ready.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-xs text-slate-500">
            <span>CyberShieldX Autonomous Pipeline</span>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
                />
              </div>
              <span className="text-cyan-300">
                {currentScene + 1} of {scenes.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
