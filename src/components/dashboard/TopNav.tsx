"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  Activity,
  AlertTriangle,
  Network,
  Globe2,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Radio,
  Flame,
  User,
  Zap,
  Volume2,
  VolumeX,
} from "lucide-react";
import { isSoundEnabled, setSoundEnabled, playThreatAlertSound } from "@/lib/sound-alerts";

interface TopNavProps {
  onSimulateAttack?: () => void;
}

export default function TopNav({ onSimulateAttack }: TopNavProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState("");
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    setSoundActive(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    setSoundActive(next);
    if (next) {
      playThreatAlertSound("low");
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toUTCString().replace("GMT", "UTC") + " | " + now.toLocaleTimeString()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: Activity },
    { label: "Threat Detection", href: "/dashboard/threats", icon: Zap },
    { label: "Network", href: "/dashboard/network", icon: Network },
    { label: "Incidents", href: "/dashboard/incidents", icon: AlertTriangle, badge: "8" },
    { label: "Intelligence", href: "/dashboard/intelligence", icon: Globe2 },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Reports", href: "/dashboard/reports", icon: FileText },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#02040a]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.7)] transition-all">
              <div className="w-full h-full bg-[#030712] rounded-[6px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-extrabold text-base tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
                  CyberShield<span className="text-cyan-400">X</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  SOC v4.8
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider block">
                DEFENSE COMMAND CENTER
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                    isActive
                      ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,243,255,0.15)] font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Status, Time, Attack Simulator, User */}
        <div className="flex items-center gap-3">
          {/* UTC Clock */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span suppressHydrationWarning>{currentTime || "UTC SOC TIME"}</span>
          </div>

          {/* Simulate Attack Trigger Button */}
          {onSimulateAttack && (
            <button
              onClick={onSimulateAttack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 text-red-300 font-mono text-xs font-semibold shadow-[0_0_12px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span className="hidden sm:inline">Simulate Attack</span>
            </button>
          )}

          {/* System Online Status Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-cyan-300 font-bold text-[11px] hidden sm:inline">SYSTEM ONLINE</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-purple-600 p-0.5 shadow-[0_0_10px_rgba(0,243,255,0.3)]">
              <div className="w-full h-full rounded-full bg-[#02040a] flex items-center justify-center text-xs font-mono font-bold text-cyan-300">
                L5
              </div>
            </div>
            <div className="hidden lg:block text-left font-mono">
              <span className="text-xs font-bold text-slate-200 block leading-tight">Nisha S.</span>
              <span className="text-[10px] text-cyan-400/80 block leading-tight">CHIEF ANALYST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Sub-nav */}
      <nav className="flex xl:hidden items-center gap-1 overflow-x-auto pt-2.5 pb-1 border-t border-slate-800/80 mt-2.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1 py-0.1 text-[8px] rounded-full bg-red-500/20 text-red-400 font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
