"use client";

import React, { useState } from "react";
import { FileText, Download, ShieldCheck, CheckCircle2, Printer, ExternalLink, Calendar } from "lucide-react";
import confetti from "canvas-confetti";

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleExport = (reportName: string) => {
    setDownloading(reportName);
    setTimeout(() => {
      setDownloading(null);
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          colors: ["#00f3ff", "#3b82f6"],
        });
      } catch (e) {}
    }, 1000);
  };

  const complianceReports = [
    {
      name: "SOC 2 Type II Security Posture Assessment",
      standard: "AICPA Trust Services Criteria",
      score: "99.4%",
      status: "Compliant",
      updated: "2026-10-01",
      id: "RPT-SOC2-2026",
    },
    {
      name: "ISO/IEC 27001:2022 Continuous Audit",
      standard: "Information Security Management",
      score: "98.1%",
      status: "Compliant",
      updated: "2026-09-28",
      id: "RPT-ISO-27001",
    },
    {
      name: "NIST Cybersecurity Framework (CSF v2.0)",
      standard: "Identify, Protect, Detect, Respond, Recover",
      score: "96.8%",
      status: "Compliant",
      updated: "2026-10-02",
      id: "RPT-NIST-CSF",
    },
    {
      name: "PCI-DSS v4.0 Cardholder Environment Audit",
      standard: "Payment Security Standards Council",
      score: "100%",
      status: "Certified",
      updated: "2026-09-15",
      id: "RPT-PCI-DSS",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            Compliance Audits & Defense Executive Briefings
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Generated audit trails, zero-trust posture certificates, incident post-mortems, and regulatory compliance reports.
        </p>
      </div>

      {/* Executive Briefing Banner */}
      <div className="p-6 rounded-2xl glass-panel-glow border border-cyan-400/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
            LATEST COMPILATION • 24H DEFENSIVE RECAP
          </span>
          <h2 className="text-lg font-bold text-slate-100">
            CyberShieldX Q4 Comprehensive Incident Defense Briefing
          </h2>
          <p className="text-slate-300 text-xs max-w-2xl font-sans">
            Autonomous threat detection successfully neutralized 1,284 unauthorized vectors. All 142 core infrastructure
            nodes remained 100% operational with 0 data breaches recorded.
          </p>
        </div>

        <button
          onClick={() => handleExport("Executive Briefing")}
          className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold uppercase hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer"
        >
          <Download className="w-4 h-4 text-black" />
          <span>{downloading === "Executive Briefing" ? "Exporting PDF..." : "Export Briefing (PDF)"}</span>
        </button>
      </div>

      {/* Compliance Frameworks Table */}
      <div className="rounded-xl glass-panel p-5 border border-cyan-500/20">
        <h3 className="font-mono font-bold text-sm text-slate-100 mb-4 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Regulatory & Security Framework Compliance
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Framework / Standard</th>
                <th className="py-3 px-3">Standard Authority</th>
                <th className="py-3 px-3">Compliance Score</th>
                <th className="py-3 px-3">Verification</th>
                <th className="py-3 px-3">Last Verified</th>
                <th className="py-3 px-3 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {complianceReports.map((rpt) => (
                <tr key={rpt.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-slate-200">
                    <div>{rpt.name}</div>
                    <div className="text-[10px] text-slate-500">{rpt.id}</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{rpt.standard}</td>
                  <td className="py-3.5 px-3 font-bold text-cyan-300">{rpt.score}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold uppercase">
                      {rpt.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">{rpt.updated}</td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleExport(rpt.name)}
                      className="p-1.5 rounded-lg bg-black/50 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-colors"
                      title="Download Audit Package"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
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
