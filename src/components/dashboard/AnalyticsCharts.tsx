"use client";

import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const timelineData = [
  { time: "00:00", threats: 42, blocked: 40, suspicious: 12 },
  { time: "04:00", threats: 68, blocked: 65, suspicious: 24 },
  { time: "08:00", threats: 145, blocked: 142, suspicious: 38 },
  { time: "12:00", threats: 280, blocked: 276, suspicious: 62 },
  { time: "16:00", threats: 390, blocked: 385, suspicious: 84 },
  { time: "20:00", threats: 240, blocked: 236, suspicious: 50 },
  { time: "23:59", threats: 119, blocked: 118, suspicious: 21 },
];

const categoryData = [
  { category: "Brute Force", count: 480, fullMark: 500 },
  { category: "DDoS L7", count: 340, fullMark: 500 },
  { category: "SQL Injection", count: 210, fullMark: 500 },
  { category: "C2 Beaconing", count: 180, fullMark: 500 },
  { category: "Auth Bypass", count: 124, fullMark: 500 },
];

const riskDistributionData = [
  { range: "0-20 (Safe)", count: 840, fill: "#10b981" },
  { range: "21-40 (Low)", count: 240, fill: "#00f3ff" },
  { range: "41-60 (Med)", count: 120, fill: "#3b82f6" },
  { range: "61-80 (High)", count: 57, fill: "#f59e0b" },
  { range: "81-100 (Crit)", count: 27, fill: "#ef4444" },
];

const resolutionTimeData = [
  { day: "Mon", mttrMinutes: 4.8 },
  { day: "Tue", mttrMinutes: 3.9 },
  { day: "Wed", mttrMinutes: 3.2 },
  { day: "Thu", mttrMinutes: 2.8 },
  { day: "Fri", mttrMinutes: 2.4 },
  { day: "Sat", mttrMinutes: 2.1 },
  { day: "Sun", mttrMinutes: 1.9 },
];

const COLORS = ["#00f3ff", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Top Row: Threats Over Time & Attack Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threats Over Time (2 cols) */}
        <div className="lg:col-span-2 rounded-xl glass-panel p-5 border border-cyan-500/20">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/10 mb-4">
            <div>
              <h3 className="font-mono font-bold text-sm text-slate-100 uppercase tracking-wider">
                Threat Velocity Over Time (24h)
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Total Ingress Vectors vs Autonomous Edge Blocks
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Blocked
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Suspicious
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11, fontFamily: "monospace" }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#030816",
                    borderColor: "rgba(0, 243, 255, 0.4)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  stroke="#00f3ff"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#cyanGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="suspicious"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#amberGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attack Categories Radar (1 col) */}
        <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
          <div className="pb-3 border-b border-cyan-500/10 mb-2">
            <h3 className="font-mono font-bold text-sm text-slate-100 uppercase tracking-wider">
              Attack Taxonomy Matrix
            </h3>
            <p className="text-[11px] font-mono text-slate-400">MITRE Category Distribution</p>
          </div>

          <div className="h-[280px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={categoryData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis
                  dataKey="category"
                  stroke="#94a3b8"
                  tick={{ fontSize: 10, fontFamily: "monospace" }}
                />
                <PolarRadiusAxis stroke="#334155" />
                <Radar
                  name="Incidents"
                  dataKey="count"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Risk Distribution & Mean Time to Respond (MTTR) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
          <div className="pb-3 border-b border-cyan-500/10 mb-4">
            <h3 className="font-mono font-bold text-sm text-slate-100 uppercase tracking-wider">
              Risk Score Population Distribution
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Evaluated via Real-Time Neural Classifier
            </p>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10, fontFamily: "monospace" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#030816",
                    borderColor: "rgba(0, 243, 255, 0.4)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MTTR */}
        <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
          <div className="pb-3 border-b border-cyan-500/10 mb-4">
            <h3 className="font-mono font-bold text-sm text-slate-100 uppercase tracking-wider">
              Mean Time to Respond (MTTR Minutes)
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Down from 4.8m to 1.9m through Autonomous Playbooks
            </p>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resolutionTimeData}>
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11, fontFamily: "monospace" }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11, fontFamily: "monospace" }} unit="m" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#030816",
                    borderColor: "rgba(16, 185, 129, 0.4)",
                    borderRadius: "8px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="mttrMinutes"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#emeraldGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
