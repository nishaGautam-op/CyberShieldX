"use client";

import React, { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import CinematicStory from "@/components/landing/CinematicStory";
import HowItWorks from "@/components/landing/HowItWorks";
import EarlyWarningSection from "@/components/landing/EarlyWarningSection";
import LandingFooter from "@/components/landing/LandingFooter";
import ThreatLogAnalyzer from "@/components/ai/ThreatLogAnalyzer";
import MetricCards from "@/components/dashboard/MetricCards";
import ShieldAiAssistant from "@/components/ai/ShieldAiAssistant";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Globe2, Radio, Terminal, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ThreatGlobe3D = dynamic(() => import("@/components/3d/ThreatGlobe3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-xl glass-panel border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
      Loading 3D Threat Vector Matrix...
    </div>
  ),
});

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#02040a] text-slate-100 selection:bg-[#00f3ff] selection:text-black">
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 2. Security Statistics Banner */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-12 bg-[#02040a] border-y border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <MetricCards />
        </div>
      </section>

      {/* 3. Cinematic Story Progression (Scenes 1 - 6) */}
      <CinematicStory />

      {/* 4. Core Flow: How CyberShieldX Works */}
      <HowItWorks />

      {/* 5. Live AI Threat Detection & XAI Showcase */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#030611] border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-3">
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              <span>LIVE AI EVALUATION LAB</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-slate-100">
              Test CyberShieldX Anomaly Inference
            </h2>
            <p className="text-slate-400 text-sm font-mono mt-3">
              Inspect suspicious logs, URLs, IP addresses, or API queries with live SHAP feature attribution.
            </p>
          </div>

          <ThreatLogAnalyzer />
        </div>
      </section>

      {/* 6. Early Warning System */}
      <EarlyWarningSection />

      {/* 7. Global Threat Intelligence 3D Globe Showcase */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-12 bg-[#02040a] border-t border-cyan-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-400/40 text-purple-300 font-mono text-xs">
                <Globe2 className="w-3.5 h-3.5 animate-pulse" />
                <span>GLOBAL THREAT MATRIX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-slate-100">
                Interactive 3D Threat Telemetry Globe
              </h2>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                CyberShieldX tracks intercontinental adversarial botnets, bulletproof hosting ASNs, and C2
                beaconing in real time. Click or drag to orbit the global defense grid and inspect active ballistic vectors.
              </p>
              <div className="pt-2">
                <Link
                  href="/dashboard/intelligence"
                  className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider"
                >
                  <span>Open Full Intelligence Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <ThreatGlobe3D />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Command Center Preview & Call To Action */}
      <LandingFooter />

      {/* 9. Floating Holographic AI Copilot (ShieldAI) */}
      <ShieldAiAssistant />
    </main>
  );
}
