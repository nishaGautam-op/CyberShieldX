"use client";

import React, { useState } from "react";
import { THREAT_INTEL_FEED, ThreatIntelligenceItem } from "@/lib/data/mockSecurityData";
import { Globe2, ShieldAlert, Terminal, Hash, ExternalLink, ShieldCheck, Filter } from "lucide-react";
import dynamic from "next/dynamic";

const ThreatGlobe3D = dynamic(() => import("@/components/3d/ThreatGlobe3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[520px] w-full rounded-xl glass-panel border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
      Initializing 3D Threat Telemetry Globe...
    </div>
  ),
});

export default function ThreatIntelligencePage() {
  const [filterType, setFilterType] = useState<string>("All");

  const filteredFeed = THREAT_INTEL_FEED.filter(
    (item) => filterType === "All" || item.type === filterType
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Globe2 className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            Threat Intelligence & Adversary Telemetry
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Global threat correlation, bulletproof hosting indicators, Cobalt Strike C2 beacons, ransomware stager hashes,
          and intercontinental ballistic vector mapping.
        </p>
      </div>

      {/* 3D Threat Globe View */}
      <div className="w-full">
        <ThreatGlobe3D />
      </div>

      {/* Threat Indicators Feed */}
      <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20 mb-4">
          <div className="flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-slate-100 uppercase tracking-wider">
              Active Indicators of Compromise (IoC Feed)
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {["All", "IP", "Domain", "Hash", "CVE", "ASN"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterType === type
                    ? "bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Indicator Value</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Category / Threat Actor</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">Origin Country</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredFeed.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-cyan-300 truncate max-w-xs">
                    {item.indicator}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-black/50 border border-slate-800 text-[10px] text-slate-300">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="text-slate-200">{item.category}</div>
                    {item.threatActor && (
                      <div className="text-[10px] text-purple-400 font-semibold">
                        Actor: {item.threatActor}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.severity === "critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-cyan-300 font-bold">{item.confidence}%</td>
                  <td className="py-3.5 px-3 text-slate-400">{item.country} ({item.countryCode})</td>
                  <td className="py-3.5 px-3 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === "Blocklisted"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : item.status === "Sinkholed"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
