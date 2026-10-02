"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ShieldAlert,
  Terminal,
  Activity,
  ChevronRight,
  ShieldCheck,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "shield-ai";
  text: string;
  timestamp: string;
  actionRecommendation?: string;
  details?: string[];
  metrics?: { label: string; value: string }[];
}

export default function ShieldAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "shield-ai",
      text: "Greetings, Analyst. I am ShieldAI, your neural threat copilot. I am actively monitoring 142 enterprise nodes, telemetry pipelines, and external adversarial feeds. How may I assist your defensive operations?",
      timestamp: "Just now",
      details: [
        "● Threat Engine: Online (XGBoost + SHAP v2.4)",
        "● Risk Level: High Anomaly in Auth Cluster",
        "● Active Incidents: 8 Pending Review",
      ],
    },
  ]);

  const quickPrompts = [
    "Why is the current security score low?",
    "What should I investigate first?",
    "Explain Incident #INC-2048",
    "Recommend defensive response for brute-force",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      let actionRec: string | undefined = undefined;
      let details: string[] | undefined = undefined;
      let metrics: { label: string; value: string }[] | undefined = undefined;

      const q = query.toLowerCase();

      if (q.includes("score") || q.includes("low") || q.includes("security score")) {
        aiResponseText =
          "The current security score stands at 94/100, which has decreased from 98/100 because three high-risk authentication anomalies and a lateral Kerberos probe were detected during the last monitoring cycle.";
        details = [
          "Authentication Security degraded to 91% due to 48 failed attempts on auth-srv-04.",
          "Threat Exposure is elevated to 89% from active bulletproof ASN AS49870 scanning.",
          "Network Security remains robust at 96% with WAF rules automatically dropping SQL injection probes.",
        ];
        metrics = [
          { label: "Overall Score", value: "94/100" },
          { label: "Auth Score", value: "91%" },
          { label: "Delta", value: "-4 pts (24h)" },
        ];
        actionRec =
          "Isolate Authentication Node auth-srv-04 and enforce hardware-bound FIDO2 credentials to recover +4 score points.";
      } else if (q.includes("investigate first") || q.includes("priority") || q.includes("what should i")) {
        aiResponseText =
          "You should immediately investigate Incident #INC-2048 because it carries the highest composite risk score (92/100, CRITICAL) and involves high-velocity credential stuffing targeting privileged IAM credentials.";
        details = [
          "Target: auth-cluster-04.corp.internal (Port 443 / 8443)",
          "Attacker: 194.26.29.112 (AS49870, Bucharest RO)",
          "SHAP Key Driver: Unusual Location (+31%) & Failed Velocity (+24%)",
        ];
        actionRec =
          "Click into Incident Center and trigger 'Execute Isolation Playbook' on auth-srv-04.";
      } else if (q.includes("inc-2048") || q.includes("explain")) {
        aiResponseText =
          "Incident #INC-2048 represents a distributed credential attack against the primary corporate OAuth cluster. Our SHAP model explains why this was flagged as critical:";
        details = [
          "1. Geographic Anomaly (+31% risk): Traffic originated from an IP subnet known for bulletproof hosting.",
          "2. Velocity Spike (+24% risk): 48 login failures inside a 22-second window.",
          "3. Device Fingerprint (+18% risk): Unrecognized TLS client hello JA3 cipher suite.",
          "4. Temporal Anomaly (+12% risk): Attempt occurred at 03:14 AM outside normal shift.",
        ];
        actionRec =
          "Enforce immediate Geo-IP CIDR block on AS49870 and invalidate active admin session tokens.";
      } else if (q.includes("brute-force") || q.includes("response") || q.includes("recommend")) {
        aiResponseText =
          "Recommended defense protocol for active brute-force activity:\n1. Rate-limit source IP at edge proxy to 3 req/min.\n2. Invalidate active OAuth refresh tokens for user accounts targeted in the cluster.\n3. Escalate MFA challenge tier to WebAuthn / FIDO2 physical keys.\n4. Micro-segment auth-srv-04 from internal database subnet.";
        actionRec = "Execute Playbook PB-402: Automated Credential Stuffing Containment.";
      } else {
        aiResponseText = `I have cross-referenced "${query}" with our zero-trust baseline telemetry. No critical policy violations were found in that specific vector, though overall perimeter vigilance is recommended given active external scanning.`;
        details = [
          "Correlation with MITRE ATT&CK Matrix: Verified",
          "Detection Engine Confidence: 96.8%",
          "Recommended Posture: Continue Active Monitoring",
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "shield-ai",
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionRecommendation: actionRec,
          details,
          metrics,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Holographic Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 text-black font-bold shadow-[0_0_25px_rgba(0,243,255,0.6)] hover:shadow-[0_0_35px_rgba(0,243,255,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-cyan-200"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-black" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-cyan-400 animate-ping" />
        </div>
        <span className="font-mono text-sm tracking-wider uppercase">ShieldAI Assistant</span>
      </button>

      {/* Holographic Assistant Drawer/Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-24 right-6 z-50 ${
            isExpanded ? "w-[92vw] max-w-2xl h-[750px]" : "w-[92vw] max-w-md h-[580px]"
          } rounded-2xl glass-panel-glow flex flex-col overflow-hidden border border-cyan-400/40 shadow-2xl transition-all duration-300 animate-in fade-in zoom-in-95`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-cyan-500/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-sm text-cyan-300">ShieldAI Neural Copilot</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                    ONLINE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">XAI Explainability Core v4.8</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-cyan-300 transition-colors"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-xl border ${
                    msg.sender === "user"
                      ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-100 rounded-tr-none"
                      : "bg-[#050f24]/90 border-slate-700/60 text-slate-200 rounded-tl-none shadow-md"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Optional Metrics Grid */}
                  {msg.metrics && (
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-2 border-t border-slate-800">
                      {msg.metrics.map((m, idx) => (
                        <div key={idx} className="bg-black/40 p-1.5 rounded border border-cyan-500/20 text-center">
                          <span className="text-[9px] text-slate-400 block">{m.label}</span>
                          <span className="text-cyan-300 font-bold text-xs">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet Details */}
                  {msg.details && (
                    <div className="mt-2.5 pt-2 border-t border-cyan-500/20 space-y-1 text-[11px] text-slate-300">
                      {msg.details.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Recommendation Banner */}
                  {msg.actionRecommendation && (
                    <div className="mt-3 p-2 rounded bg-amber-500/10 border border-amber-500/40 text-amber-300 text-[11px] flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-400">
                          Recommended Defensive Action
                        </span>
                        {msg.actionRecommendation}
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2">
                <Terminal className="w-3.5 h-3.5 animate-spin" />
                <span>ShieldAI analyzing neural telemetry...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 py-2 bg-black/40 border-t border-cyan-500/20 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-[10px] text-cyan-300 font-mono transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-black/80 border-t border-cyan-500/30 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask ShieldAI to explain anomalies, investigate, or defend..."
              className="flex-1 bg-[#071329] border border-cyan-500/30 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
