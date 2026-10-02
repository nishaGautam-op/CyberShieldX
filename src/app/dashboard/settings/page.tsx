"use client";

import React, { useState } from "react";
import { Settings, Sliders, Shield, Database, Cpu, CheckCircle2, Save, Terminal } from "lucide-react";
import confetti from "canvas-confetti";

export default function SettingsPage() {
  const [xgboostSensitivity, setXgboostSensitivity] = useState(85);
  const [shapCutoff, setShapCutoff] = useState(10);
  const [autoContain, setAutoContain] = useState(true);
  const [mfaEscalation, setMfaEscalation] = useState(true);
  const [geoBlocking, setGeoBlocking] = useState(true);
  const [fastApiEndpoint, setFastApiEndpoint] = useState("http://127.0.0.1:8000");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    try {
      confetti({
        particleCount: 35,
        spread: 45,
        colors: ["#00f3ff", "#10b981"],
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-mono font-extrabold text-slate-100">
            Defense Matrix Parameters & ML Calibration
          </h1>
        </div>
        <p className="text-xs font-mono text-slate-400">
          Configure model inference sensitivity, autonomous playbook thresholds, API connector endpoints,
          and backend integration variables.
        </p>
      </div>

      {/* ML Model Sensitivity Calibration */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 space-y-5 font-mono text-xs">
        <h3 className="font-bold text-sm text-cyan-300 uppercase tracking-wider flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          Neural Anomaly Classifier Calibration
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300">XGBoost Anomaly Sensitivity Threshold:</span>
              <span className="text-cyan-400 font-bold">{xgboostSensitivity}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="99"
              value={xgboostSensitivity}
              onChange={(e) => setXgboostSensitivity(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Higher values reduce false alarms; lower values flag micro-deviations in baseline traffic.
            </p>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-300">SHAP Feature Attribution Min Cutoff:</span>
              <span className="text-purple-400 font-bold">±{shapCutoff}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              value={shapCutoff}
              onChange={(e) => setShapCutoff(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Minimum percentage impact required for an telemetry attribute to appear in the XAI explanation view.
            </p>
          </div>
        </div>
      </div>

      {/* Autonomous Defense Policy Toggles */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-sm text-cyan-300 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          Autonomous Mitigation Policies
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <span className="font-bold text-slate-200 block">Auto-Microsegment Critical Hosts</span>
              <span className="text-[11px] text-slate-400 font-sans">
                Automatically sandbox internal nodes experiencing active credential stuffing.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoContain}
              onChange={(e) => setAutoContain(e.target.checked)}
              className="w-4 h-4 accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <span className="font-bold text-slate-200 block">Enforce Step-Up FIDO2 on Anomaly</span>
              <span className="text-[11px] text-slate-400 font-sans">
                Require biometric/hardware security key re-authentication for anomalous sessions.
              </span>
            </div>
            <input
              type="checkbox"
              checked={mfaEscalation}
              onChange={(e) => setMfaEscalation(e.target.checked)}
              className="w-4 h-4 accent-cyan-400"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-slate-800 cursor-pointer hover:border-slate-700">
            <div>
              <span className="font-bold text-slate-200 block">Bulletproof ASN Automatic Drop</span>
              <span className="text-[11px] text-slate-400 font-sans">
                Drop TCP handshakes originating from known malicious autonomous system ranges.
              </span>
            </div>
            <input
              type="checkbox"
              checked={geoBlocking}
              onChange={(e) => setGeoBlocking(e.target.checked)}
              className="w-4 h-4 accent-cyan-400"
            />
          </label>
        </div>
      </div>

      {/* Backend & Database Integration */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/20 space-y-4 font-mono text-xs">
        <h3 className="font-bold text-sm text-cyan-300 uppercase tracking-wider flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          Backend Architecture Connectors
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-slate-400 block mb-1">Python FastAPI ML Gateway Endpoint:</label>
            <input
              type="text"
              value={fastApiEndpoint}
              onChange={(e) => setFastApiEndpoint(e.target.value)}
              className="w-full bg-[#030816] border border-cyan-500/30 rounded-lg p-2.5 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[10px] text-emerald-400 block mt-1">
              ✓ Fallback simulator active; ready to bridge with `python backend/main.py`
            </span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {saved && (
          <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Defense policies persisted successfully!
          </span>
        )}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-mono font-bold text-xs uppercase hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)] cursor-pointer"
        >
          <Save className="w-4 h-4 text-black" />
          <span>Save Settings & Apply</span>
        </button>
      </div>
    </div>
  );
}
