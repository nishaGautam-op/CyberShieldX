"use client";

import React, { useState } from "react";
import TopNav from "@/components/dashboard/TopNav";
import ShieldAiAssistant from "@/components/ai/ShieldAiAssistant";
import AttackSimulatorModal from "@/components/dashboard/AttackSimulatorModal";
import { INITIAL_INCIDENTS, Incident } from "@/lib/data/mockSecurityData";
import confetti from "canvas-confetti";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [threatCount, setThreatCount] = useState(1284);
  const [criticalCount, setCriticalCount] = useState(27);

  const handleLaunchAttack = (newIncident: Incident) => {
    setIncidents((prev) => [newIncident, ...prev]);
    setThreatCount((prev) => prev + 1);
    if (newIncident.severity === "critical") {
      setCriticalCount((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-100 flex flex-col font-sans selection:bg-[#00f3ff] selection:text-black">
      {/* Top SOC Navigation Bar */}
      <TopNav onSimulateAttack={() => setIsSimulatorOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Adversary Attack Simulator Modal */}
      <AttackSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onLaunchAttack={handleLaunchAttack}
      />

      {/* Floating ShieldAI Assistant */}
      <ShieldAiAssistant />
    </div>
  );
}
