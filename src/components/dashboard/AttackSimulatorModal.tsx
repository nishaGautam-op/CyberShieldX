"use client";

import React, { useState } from "react";
import { X, Flame, ShieldAlert, Zap, Terminal, AlertTriangle, Play } from "lucide-react";
import { Incident } from "@/lib/data/mockSecurityData";

interface AttackSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchAttack: (simulatedIncident: Incident) => void;
}

export default function AttackSimulatorModal({
  isOpen,
  onClose,
  onLaunchAttack,
}: AttackSimulatorModalProps) {
  const [selectedVector, setSelectedVector] = useState("bruteforce");
  const [isInjecting, setIsInjecting] = useState(false);

  if (!isOpen) return null;

  const attackVectors = [
    {
      id: "bruteforce",
      name: "APT-29 Distributed Credential Stuffing",
      severity: "critical" as const,
      riskScore: 94,
      target: "auth-cluster-04.corp.internal (Port 443)",
      desc: "Simulate 48,000 rapid login requests across 120 residential proxy nodes targeting root IAM roles.",
      mitre: "T1110.004 Credential Stuffing",
    },
    {
      id: "ddos",
      name: "Layer-7 HTTP/2 Rapid Reset Flooding",
      severity: "high" as const,
      riskScore: 82,
      target: "api-gateway-edge.cybershieldx.net",
      desc: "Simulate 890,000 requests/sec with stream resets depleting worker thread pools.",
      mitre: "T1498 Denial of Service",
    },
    {
      id: "ransomware",
      name: "LockBit 3.0 Lateral Exfiltration Probe",
      severity: "critical" as const,
      riskScore: 96,
      target: "vault-db-prod.internal (Port 5432)",
      desc: "Simulate automated network reconnaissance and high-entropy staging against database vault.",
      mitre: "T1558.003 Kerberoasting / Lateral Movement",
    },
    {
      id: "sqli",
      name: "Second-Order SQL Injection & Schema Extraction",
      severity: "high" as const,
      riskScore: 78,
      target: "checkout.cybershieldx.net/v1/orders",
      desc: "Simulate hex-encoded UNION SELECT payloads in JSON transaction parameters.",
      mitre: "T1190 Exploit Public-Facing App",
    },
  ];

  const handleLaunch = () => {
    setIsInjecting(true);
    const vector = attackVectors.find((v) => v.id === selectedVector) || attackVectors[0];

    setTimeout(() => {
      const newIncident: Incident = {
        id: `INC-${Math.floor(2050 + Math.random() * 50)}`,
        title: `SIMULATED: ${vector.name}`,
        threatType: vector.mitre,
        severity: vector.severity,
        riskScore: vector.riskScore,
        status: "Investigating",
        source: "194.26.29.112 (Simulated Red Team Node)",
        target: vector.target,
        timestamp: "Just now",
        affectedResource: vector.target,
        confidence: 98.4,
        explanation: {
          summary: `Simulated attack scenario triggered by SOC operator. Telemetry captured high-volume anomalies.`,
          reasons: [
            "Red-team traffic generated via automated adversary simulation engine",
            "Anomalous packet volume exceeding baseline threshold by +380%",
            "Authentication token mismatch and high entropy flags triggered",
          ],
          shapFeatures: [
            { feature: "Simulated Adversary Ingress", contribution: 45, direction: "risk" },
            { feature: "Payload Entropy", contribution: 25, direction: "risk" },
            { feature: "Connection Burst Delta", contribution: 18, direction: "risk" },
          ],
        },
        recommendedAction:
          "Enforce zero-trust perimeter containment and apply rate limiting rules.",
        mitreTactic: "Adversary Emulation",
        mitreTechnique: vector.mitre,
      };

      onLaunchAttack(newIncident);
      setIsInjecting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg glass-panel-glow rounded-2xl flex flex-col overflow-hidden border border-red-500/40 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-red-950/40 border-b border-red-500/30">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-red-400 animate-pulse" />
            <div>
              <h3 className="font-mono font-bold text-sm text-red-200 uppercase tracking-wider">
                Adversary Attack Simulation Lab
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Inject live adversarial traffic to stress-test CyberShieldX ML models
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 font-mono text-xs">
          <label className="text-slate-400 text-[11px] uppercase tracking-wider block">
            Select Adversarial Attack Scenario:
          </label>

          <div className="space-y-2">
            {attackVectors.map((v) => {
              const isSelected = selectedVector === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVector(v.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-red-950/40 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.25)]"
                      : "bg-black/40 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-100">{v.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-500/20 text-red-400 font-bold uppercase">
                      Risk {v.riskScore}/100
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-1.5">{v.desc}</p>
                  <div className="text-[10px] text-slate-500 flex justify-between">
                    <span>Target: {v.target}</span>
                    <span className="text-red-400/80">{v.mitre}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3">
            <button
              onClick={handleLaunch}
              disabled={isInjecting}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.99] transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] cursor-pointer disabled:opacity-50"
            >
              {isInjecting ? (
                <>
                  <Terminal className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Adversarial Traffic...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Red Team Simulation Attack</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
