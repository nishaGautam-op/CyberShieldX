"use client";

import React, { useState } from "react";
import { Incident } from "@/lib/data/mockSecurityData";
import { ShieldAlert, ShieldCheck, Flame, ChevronRight, Filter, Search } from "lucide-react";

interface LiveThreatFeedProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
  className?: string;
}

export default function LiveThreatFeed({
  incidents,
  onSelectIncident,
  className = "",
}: LiveThreatFeedProps) {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredIncidents = incidents.filter((item) => {
    const matchesFilter =
      filter === "All" || item.severity.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.threatType.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={`rounded-xl glass-panel p-5 border border-cyan-500/20 flex flex-col ${className}`}>
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <h3 className="font-mono font-bold text-sm text-slate-100 uppercase tracking-wider">
            Live Incident Stream & Early Warning
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[10px] font-bold">
            {incidents.length} Active
          </span>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-slate-800 text-xs font-mono">
          {["All", "Critical", "High", "Medium", "Low"].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === level
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="my-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, IP, Threat Type or Resource..."
            className="w-full bg-[#030816] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Incidents List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[440px]">
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-8 text-slate-500 font-mono text-xs">
            No incidents found matching "{search}" in {filter} severity.
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isCritical = incident.severity === "critical";
            const isHigh = incident.severity === "high";

            return (
              <div
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer font-mono text-xs ${
                  isCritical
                    ? "bg-red-950/20 hover:bg-red-950/40 border-red-500/30 hover:border-red-500/60"
                    : isHigh
                    ? "bg-amber-950/20 hover:bg-amber-950/40 border-amber-500/30 hover:border-amber-500/60"
                    : "bg-black/40 hover:bg-black/70 border-slate-800 hover:border-cyan-500/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">{incident.id}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        isCritical
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : isHigh
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                      }`}
                    >
                      {incident.severity}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded border ${
                        incident.status === "Contained"
                          ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                          : incident.status === "Resolved"
                          ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                          : "bg-slate-800 border-slate-700 text-slate-300"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500">{incident.timestamp}</span>
                </div>

                <div className="font-semibold text-slate-200 text-xs mb-1 line-clamp-1">
                  {incident.title}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                  <span className="truncate max-w-[240px]">Target: {incident.target}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-red-400">Score {incident.riskScore}/100</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
