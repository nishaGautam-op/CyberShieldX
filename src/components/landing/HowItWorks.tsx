"use client";

import React from "react";
import {
  Activity,
  Scan,
  Cpu,
  BarChart,
  HelpCircle,
  BellRing,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Activity & Telemetry",
      subtitle: "Ingress Stream",
      desc: "Continuous packet capture, syslog ingestion, and OAuth token activity monitoring across all endpoints.",
      icon: Activity,
      color: "cyan",
    },
    {
      num: "02",
      title: "Detection",
      subtitle: "Heuristic Anomaly",
      desc: "Multi-layered statistical baseline checks isolate behavioral deviations from expected Gaussian traffic.",
      icon: Scan,
      color: "purple",
    },
    {
      num: "03",
      title: "AI Analysis",
      subtitle: "XGBoost + Neural",
      desc: "Gradient boosted decision trees process 140+ behavioral features in under 4 milliseconds.",
      icon: Cpu,
      color: "cyan",
    },
    {
      num: "04",
      title: "Risk Scoring",
      subtitle: "0-100 Confidence",
      desc: "Computes dynamic Bayesian probability score mapped against historical zero-day breach patterns.",
      icon: BarChart,
      color: "amber",
    },
    {
      num: "05",
      title: "Explainability",
      subtitle: "SHAP Attribution",
      desc: "Cooperative game theory decomposes exactly WHY the vector is dangerous into mathematical feature weights.",
      icon: HelpCircle,
      color: "purple",
    },
    {
      num: "06",
      title: "Early Warning",
      subtitle: "Predictive Alert",
      desc: "High-priority notifications delivered to security operations analysts before payload execution occurs.",
      icon: BellRing,
      color: "red",
    },
    {
      num: "07",
      title: "Recommended Response",
      subtitle: "Autonomous Defense",
      desc: "Automated micro-segmentation playbooks isolate compromised nodes while preserving business continuity.",
      icon: ShieldCheck,
      color: "emerald",
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-12 bg-[#02040a] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest block mb-2">
            DEFENSIVE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-slate-100">
            The CyberShieldX Autonomous Core Flow
          </h2>
          <p className="text-slate-400 text-sm font-mono mt-3">
            Activity/Data ➔ Detection ➔ AI Analysis ➔ Risk Score ➔ Explainability ➔ Alert ➔ Recommended Response
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 rounded-xl glass-panel glass-panel-hover border border-cyan-500/20 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-extrabold text-cyan-400/80">
                      {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-black/60 border border-slate-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>

                  <h3 className="font-mono font-bold text-xs text-slate-100">{step.title}</h3>
                  <span className="text-[10px] font-mono text-cyan-400/70 block mb-2">
                    {step.subtitle}
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <ChevronRight className="w-4 h-4 text-cyan-500/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
