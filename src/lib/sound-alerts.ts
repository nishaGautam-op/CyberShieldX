"use client";

// Professional Web Audio API sound generator for SOC Threat Alerts
let audioCtx: AudioContext | null = null;
const playedIncidentIds = new Set<string>();

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("cybershieldx_sound_enabled");
  return stored !== null ? stored === "true" : true; // Default to enabled
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("cybershieldx_sound_enabled", enabled ? "true" : "false");
  if (enabled) {
    getAudioContext();
  }
}

/**
 * Synthesizes a futuristic, professional SOC threat alert sound using Web Audio API oscillators.
 * Short, distinct, high-tech, and non-annoying.
 */
export function playThreatAlertSound(
  severity: "critical" | "high" | "medium" | "low" = "critical",
  incidentId?: string
): boolean {
  if (!isSoundEnabled()) return false;

  // Prevent re-playing the same incident multiple times
  if (incidentId) {
    if (playedIncidentIds.has(incidentId)) {
      return false;
    }
    playedIncidentIds.add(incidentId);
  }

  const ctx = getAudioContext();
  if (!ctx) return false;

  try {
    const now = ctx.currentTime;

    if (severity === "critical") {
      // Professional Dual-Tone Urgent SOC Pulse (880Hz / 440Hz + low frequency resonance)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Bandpass filter for crisp futuristic digital sheen
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3, now);

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.exponentialRampToValueAtTime(587.33, now + 0.35); // D5
      osc1.frequency.setValueAtTime(880, now + 0.45);
      osc1.frequency.exponentialRampToValueAtTime(440, now + 1.1); // A4

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 1.1);

      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(55, now + 1.2);

      // Volume envelope: 2 rapid pulses
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.28, now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.04, now + 0.38);
      gainNode.gain.linearRampToValueAtTime(0.32, now + 0.45);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);

      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(gainNode);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
      subOsc.stop(now + 1.3);

      return true;
    } else if (severity === "high") {
      // High Severity: Double tech ping (660Hz -> 440Hz)
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.4);
      osc.frequency.setValueAtTime(660, now + 0.45);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.85);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.2, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.03, now + 0.38);
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.45);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.95);
      return true;
    } else {
      // Medium / Low: Subtle radar blip
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.45);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
      return true;
    }
  } catch (err) {
    return false;
  }
}
