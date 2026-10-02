"use client";

import React, { useState } from "react";
import { INITIAL_INCIDENTS, Incident } from "@/lib/data/mockSecurityData";
import IncidentDetailModal from "@/components/dashboard/IncidentDetailModal";
import {
  AlertTriangle,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Plus,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const handleUpdateStatus = (id: string, newStatus: Incident["status"]) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
  };

  const filtered = incidents.filter((item) => {
    const matchSev =
      severityFilter === "All" || item.severity.toLowerCase() === severityFilter.toLowerCase();
    const matchStatus =
      statusFilter === "All" || item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.threatType.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase()) ||
      item.target.toLowerCase().includes(search.toLowerCase());
    return matchSev && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            Incident Management & Orchestration Center
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Track, inspect, contain, and remediate anomalous security events. Every incident includes mathematical SHAP
          feature attribution and automated containment playbooks.
        </p>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 font-mono text-xs">
        {/* Severity Tabs */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {["All", "Critical", "High", "Medium", "Low"].map((level) => (
            <button
              key={level}
              onClick={() => setSeverityFilter(level)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                severityFilter === level
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {["All", "Investigating", "Contained", "Resolved", "Monitoring"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === status
                  ? "bg-purple-600 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search incidents by ID, IP, or payload..."
            className="w-full bg-[#030816] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Incidents Table */}
      <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Incident ID</th>
                <th className="py-3 px-3">Threat Description</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3">Source & Target</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.map((item) => {
                const isCrit = item.severity === "critical";
                const isHigh = item.severity === "high";

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedIncident(item)}
                    className="hover:bg-slate-900/50 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-3 font-bold text-cyan-400">{item.id}</td>
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-200 line-clamp-1">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.threatType}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isCrit
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : isHigh
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                        }`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-bold">
                      <span className={item.riskScore >= 70 ? "text-red-400" : "text-emerald-400"}>
                        {item.riskScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[11px] text-slate-400">
                      <div>Src: <span className="text-slate-200">{item.source.split(" ")[0]}</span></div>
                      <div>Dst: <span className="text-slate-300">{item.target.split(" ")[0]}</span></div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.status === "Contained"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : item.status === "Resolved"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                            : item.status === "Monitoring"
                            ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-400 text-[11px]">{item.timestamp}</td>
                    <td className="py-3.5 px-3 text-right">
                      <ChevronRight className="w-4 h-4 text-cyan-400 inline-block" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Detail Modal */}
      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
