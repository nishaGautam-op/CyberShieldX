"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  Server,
  Zap,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface MetricCardsProps {
  threatsCount?: number;
  criticalCount?: number;
  incidentsCount?: number;
  systemsProtected?: number;
  detectionRate?: number;
  securityScore?: number;
}

export default function MetricCards({
  threatsCount = 1284,
  criticalCount = 27,
  incidentsCount = 8,
  systemsProtected = 142,
  detectionRate = 98.7,
  securityScore = 94,
}: MetricCardsProps) {
  const [displayThreats, setDisplayThreats] = useState(0);
  const [displayCritical, setDisplayCritical] = useState(0);
  const [displayIncidents, setDisplayIncidents] = useState(0);
  const [displaySystems, setDisplaySystems] = useState(0);

  // Counter animation on load
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    const timer = setInterval(() => {
      start++;
      const progress = start / steps;
      setDisplayThreats(Math.floor(threatsCount * progress));
      setDisplayCritical(Math.floor(criticalCount * progress));
      setDisplayIncidents(Math.floor(incidentsCount * progress));
      setDisplaySystems(Math.floor(systemsProtected * progress));

      if (start >= steps) {
        clearInterval(timer);
        setDisplayThreats(threatsCount);
        setDisplayCritical(criticalCount);
        setDisplayIncidents(incidentsCount);
        setDisplaySystems(systemsProtected);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [threatsCount, criticalCount, incidentsCount, systemsProtected]);

  const cards = [
    {
      title: "Threats Detected",
      value: formatNumber(displayThreats),
      subtext: "+12.4% vs last 24h",
      trend: "up",
      icon: ShieldAlert,
      color: "cyan",
      borderColor: "border-cyan-500/30",
      glowColor: "shadow-[0_0_20px_rgba(0,243,255,0.12)]",
      textColor: "text-cyan-300",
    },
    {
      title: "Critical Threats",
      value: displayCritical.toString(),
      subtext: "5 immediate action required",
      trend: "alert",
      icon: Flame,
      color: "red",
      borderColor: "border-red-500/40",
      glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      textColor: "text-red-400",
    },
    {
      title: "Active Incidents",
      value: `0${displayIncidents}`,
      subtext: "3 contained, 5 investigating",
      trend: "neutral",
      icon: AlertTriangle,
      color: "amber",
      borderColor: "border-amber-500/30",
      glowColor: "shadow-[0_0_20px_rgba(245,158,11,0.12)]",
      textColor: "text-amber-400",
    },
    {
      title: "Systems Protected",
      value: displaySystems.toString(),
      subtext: "100% telemetry coverage",
      trend: "up",
      icon: Server,
      color: "purple",
      borderColor: "border-purple-500/30",
      glowColor: "shadow-[0_0_20px_rgba(139,92,246,0.12)]",
      textColor: "text-purple-300",
    },
    {
      title: "Threat Detection Rate",
      value: `${detectionRate}%`,
      subtext: "False positive: 0.13%",
      trend: "up",
      icon: Zap,
      color: "emerald",
      borderColor: "border-emerald-500/30",
      glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.12)]",
      textColor: "text-emerald-400",
    },
    {
      title: "Security Score",
      value: `${securityScore}/100`,
      subtext: "Defense posture: Optimal",
      trend: "up",
      icon: ShieldCheck,
      color: "cyan",
      borderColor: "border-cyan-400/40",
      glowColor: "shadow-[0_0_20px_rgba(0,243,255,0.15)]",
      textColor: "text-cyan-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-xl glass-panel glass-panel-hover border ${card.borderColor} ${card.glowColor} relative overflow-hidden group`}
          >
            {/* Ambient background glow inside card */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 via-transparent to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs sm:text-[13px] font-mono font-semibold text-slate-300 uppercase tracking-wider truncate">
                {card.title}
              </span>
              <div className="w-8 h-8 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${card.textColor}`} />
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={`text-3xl sm:text-[32px] font-extrabold font-mono tracking-tight ${card.textColor}`}>
                {card.value}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-2.5 text-xs font-mono text-slate-400">
              {card.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              {card.trend === "alert" && <Flame className="w-3.5 h-3.5 text-red-400 shrink-0" />}
              <span className="truncate">{card.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
