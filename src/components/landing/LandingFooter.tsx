"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowRight, Terminal, Lock, Globe2, Radio } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="relative bg-[#010207] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-12 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-cyan-600/10 via-blue-600/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Pre-footer Call to Action */}
        <div className="rounded-2xl glass-panel-glow border border-cyan-500/30 p-8 sm:p-12 text-center space-y-6">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block">
            NEXT-GENERATION DEFENSE MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-extrabold text-slate-100 max-w-3xl mx-auto tracking-tight">
            Threats evolve. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 cyan-text-glow">
              So should your defense.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-mono max-w-xl mx-auto">
            Detect earlier. Understand deeper. Respond smarter.
          </p>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-black font-mono font-bold text-sm tracking-wider uppercase hover:shadow-[0_0_35px_rgba(0,243,255,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer"
            >
              <span>Enter the Defense Layer</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </Link>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs text-slate-400 pt-6 border-t border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-slate-100 font-bold mb-3">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>CyberShieldX</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
              Next-generation AI cyber defense command center. Defensive cybersecurity intelligence only.
            </p>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-3 uppercase tracking-wider">
              Command Modules
            </span>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/dashboard" className="hover:text-cyan-300">Security Overview</Link></li>
              <li><Link href="/dashboard/threats" className="hover:text-cyan-300">AI Threat Lab</Link></li>
              <li><Link href="/dashboard/network" className="hover:text-cyan-300">3D Network Topology</Link></li>
              <li><Link href="/dashboard/incidents" className="hover:text-cyan-300">Incident Center</Link></li>
              <li><Link href="/dashboard/intelligence" className="hover:text-cyan-300">Threat Intelligence</Link></li>
            </ul>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-3 uppercase tracking-wider">
              XAI Intelligence
            </span>
            <ul className="space-y-2 text-[11px]">
              <li><span className="text-slate-400">SHAP Feature Attribution</span></li>
              <li><span className="text-slate-400">MITRE ATT&CK Matrix</span></li>
              <li><span className="text-slate-400">XGBoost Anomaly Pipeline</span></li>
              <li><span className="text-slate-400">Zero-Trust Telemetry</span></li>
            </ul>
          </div>

          <div>
            <span className="text-slate-200 font-bold block mb-3 uppercase tracking-wider">
              Security Operations
            </span>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Defense Nodes Active</span>
              </div>
              <div className="text-slate-500">SOC Clearance: Level 5 LOP</div>
              <div className="text-slate-500">FastAPI ML Pipeline: Ready</div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CyberShieldX Defense Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400/80">Defensive Cybersecurity Protocol</span>
            <span>•</span>
            <span>Zero-Trust Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
