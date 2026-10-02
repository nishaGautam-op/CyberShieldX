"use client";

import React, { useState } from "react";
import {
  Upload,
  Globe,
  Terminal,
  Activity,
  FileCode,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Zap,
  Cpu,
} from "lucide-react";
import { analyzeSecurityInput, DetectionResult } from "@/lib/ml-engine";
import { SAMPLE_LOGS } from "@/lib/data/mockSecurityData";
import ShapExplanationView from "./ShapExplanationView";
import confetti from "canvas-confetti";

export default function ThreatLogAnalyzer() {
  const [activeTab, setActiveTab] = useState<"log" | "url" | "ip" | "payload">("log");
  const [inputContent, setInputContent] = useState<string>(SAMPLE_LOGS[0].content);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult>(() =>
    analyzeSecurityInput("log", SAMPLE_LOGS[0].content)
  );

  const handleRunAnalysis = (type = activeTab, content = inputContent) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeSecurityInput(type, content);
      setResult(res);
      setIsAnalyzing(false);

      if (res.riskScore >= 70) {
        // Red pulse
      } else {
        try {
          confetti({
            particleCount: 40,
            spread: 50,
            origin: { y: 0.7 },
            colors: ["#00f3ff", "#10b981"],
          });
        } catch (e) {}
      }
    }, 800);
  };

  const handleLoadSample = (sample: typeof SAMPLE_LOGS[0]) => {
    setActiveTab("log");
    setInputContent(sample.content);
    handleRunAnalysis("log", sample.content);
  };

  return (
    <div className="space-y-6">
      {/* Input Console */}
      <div className="rounded-xl glass-panel p-6 border border-cyan-500/20">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold font-mono text-slate-100 uppercase tracking-wider">
              AI Threat Detection & Anomaly Lab
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                setActiveTab("log");
                setInputContent(SAMPLE_LOGS[0].content);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === "log"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Security Log</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("url");
                setInputContent("https://auth-verify-security.cloud-tokens.xyz/v2/login?session=malicious");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === "url"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>URL Analyzer</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("ip");
                setInputContent("194.26.29.112");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === "ip"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>IP Threat Check</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("payload");
                setInputContent(`{"transaction_id": "TXN-902", "query": "1042' UNION SELECT username, password_hash FROM admin_users--"}`);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === "payload"
                  ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,243,255,0.4)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Payload / API</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="my-3 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-mono text-slate-500 shrink-0">Sample Telemetry:</span>
          {SAMPLE_LOGS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className="shrink-0 px-2.5 py-1 rounded bg-black/40 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-cyan-300 transition-colors"
            >
              {sample.name}
            </button>
          ))}
        </div>

        {/* Textarea Input */}
        <div className="relative mt-2">
          <textarea
            rows={5}
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder={
              activeTab === "log"
                ? "Paste raw syslog, auth log, WAF log or audit event JSON here..."
                : activeTab === "url"
                ? "Enter suspicious target URL or domain for heuristic deconstruction..."
                : activeTab === "ip"
                ? "Enter suspicious IP address or CIDR range..."
                : "Enter JSON payload, HTTP headers, or SQL query snippet..."
            }
            className="w-full bg-[#030712] border border-cyan-500/30 rounded-xl p-3.5 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <span className="text-[11px] font-mono text-slate-500">
              Inference Mode: XGBoost + SHAP Neural Attribution Pipeline
            </span>

            <button
              onClick={() => handleRunAnalysis()}
              disabled={isAnalyzing || !inputContent.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>Computing Neural Risk Vectors...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Analyze with CyberShieldX Engine</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detection Result Banner (Formatted exactly as requested in Requirement 9) */}
      <div
        className={`rounded-xl glass-panel p-6 border transition-all ${
          result.severity === "CRITICAL"
            ? "border-red-500/50 bg-red-950/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
            : result.severity === "HIGH"
            ? "border-amber-500/50 bg-amber-950/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
            : "border-cyan-500/40 bg-cyan-950/10 shadow-[0_0_25px_rgba(0,243,255,0.15)]"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-1">
              INFERENCE TELEMETRY REPORT
            </span>
            <h3 className="text-xl font-mono font-extrabold text-slate-100 flex items-center gap-2.5">
              {result.severity === "CRITICAL" || result.severity === "HIGH" ? (
                <ShieldAlert className="w-6 h-6 text-red-400" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-cyan-400" />
              )}
              {result.threat}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">{result.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Risk Score</span>
              <span
                className={`text-xl font-bold ${
                  result.riskScore >= 70 ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {result.riskScore}/100
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Severity</span>
              <span
                className={`text-sm font-bold uppercase ${
                  result.severity === "CRITICAL"
                    ? "text-red-400"
                    : result.severity === "HIGH"
                    ? "text-amber-400"
                    : "text-cyan-400"
                }`}
              >
                {result.severity}
              </span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Confidence</span>
              <span className="text-sm font-bold text-cyan-300">{result.confidence.toFixed(1)}%</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-black/50 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 block uppercase">Status</span>
              <span className="text-sm font-bold text-slate-200">{result.status}</span>
            </div>
          </div>
        </div>

        {/* Explainability Breakdown */}
        <div className="mt-6">
          <ShapExplanationView
            threatTitle={result.threat}
            reasons={result.reasons}
            shapFeatures={result.shapFeatures}
            riskScore={result.riskScore}
            confidence={result.confidence}
          />
        </div>

        {/* Recommended Defense Action Box */}
        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Recommended Defensive Mitigation:
          </div>
          <p className="text-slate-300 leading-relaxed">{result.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}
