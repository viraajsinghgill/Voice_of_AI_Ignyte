"use client";

import React, { useState, useEffect } from "react";
import { FraudIncident, CallStep, ConversationTurn, LanguageCode } from "@/types/fraud";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  Volume2,
  VolumeX,
  ShieldAlert,
  UserCheck,
  Lock,
  Headphones,
  CheckCircle2,
  AlertCircle,
  Globe,
} from "lucide-react";

interface VoiceAgentLiveProps {
  incident: FraudIncident;
  isCallActive: boolean;
  onEndCall: () => void;
  onTriggerPush: () => void;
  isPushApproved: boolean;
  onFreezeCard: () => void;
  isCardFrozen: boolean;
  onEscalateHuman: () => void;
  isEscalated: boolean;
  turns: ConversationTurn[];
  currentStepIndex: number;
  onCustomerResponse: (response: string, intent: "fraud" | "legitimate" | "human" | "optout") => void;
  language: LanguageCode;
  onToggleLanguage: (lang: LanguageCode) => void;
}

export const VoiceAgentLive: React.FC<VoiceAgentLiveProps> = ({
  incident,
  isCallActive,
  onEndCall,
  isPushApproved,
  isCardFrozen,
  isEscalated,
  turns,
  currentStepIndex,
  onCustomerResponse,
  language,
  onToggleLanguage,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Play audio voice synthesis for the latest agent utterance
  useEffect(() => {
    if (turns.length === 0 || isMuted || !isCallActive) return;
    const lastTurn = turns[turns.length - 1];
    if (lastTurn.speaker === "agent" && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(language === "ar" && lastTurn.textAr ? lastTurn.textAr : lastTurn.text);
      utterance.lang = language === "ar" ? "ar-AE" : "en-US";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [turns, isMuted, isCallActive, language]);

  const steps: CallStep[] = [
    {
      stepNumber: 1,
      title: "Mandatory Opening AI Disclosure",
      description: "AI declares its identity before accepting caller input.",
      status: currentStepIndex > 0 ? "completed" : currentStepIndex === 0 ? "active" : "pending",
    },
    {
      stepNumber: 2,
      title: "Zero-Knowledge Biometric Challenge",
      description: "Dispatches out-of-band push to mobile app. Zero secrets asked.",
      status: isPushApproved ? "completed" : currentStepIndex === 1 ? "active" : "pending",
    },
    {
      stepNumber: 3,
      title: "Transaction Triangulation",
      description: "Recites merchant & amount for customer confirmation.",
      status: currentStepIndex > 2 ? "completed" : currentStepIndex === 2 ? "active" : "pending",
    },
    {
      stepNumber: 4,
      title: "Protective Scoped Card Freeze",
      description: "Executes idempotent temporary lock via core banking API.",
      status: isCardFrozen ? "completed" : currentStepIndex === 3 ? "active" : "pending",
    },
    {
      stepNumber: 5,
      title: "Warm Handover to Fraud Specialist (H)",
      description: "SIP REFER transfer for permanent card cancellation & dispute.",
      status: isEscalated ? "completed" : currentStepIndex === 4 ? "active" : "pending",
      isHumanGate: true,
    },
  ];

  return (
    <div className="bg-[#0e1626] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      {/* Top Bar: Call Status & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              isCallActive
                ? "bg-emerald-500 text-slate-950 animate-pulse"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {isCallActive ? <PhoneCall className="w-5 h-5" /> : <PhoneOff className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">
                {isCallActive ? "Live Telephony Stream (Twilio SIP / WebRTC)" : "Agent Idle (Waiting for Trigger)"}
              </span>
              {isCallActive && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  CONNECTED
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {isCallActive
                ? `Calling ${incident.customerName} (${incident.customerPhone})`
                : "Select an incident above to launch outbound intervention"}
            </p>
          </div>
        </div>

        {/* Dialect Switcher & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Language Switch */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => onToggleLanguage("en")}
              className={`px-2.5 py-1 rounded-md transition ${
                language === "en" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => onToggleLanguage("ar")}
              className={`px-2.5 py-1 rounded-md transition ${
                language === "ar" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              رمسة إماراتية (Arabic)
            </button>
          </div>

          {/* Mute Voice Audio */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg border text-xs transition ${
              isMuted
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
            }`}
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* End Call Button */}
          {isCallActive && (
            <button
              onClick={onEndCall}
              className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition"
              title="Terminate Call"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Steps & Real-Time Waveform */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 py-4 flex-1">
        {/* Left Column: 5-Step Workflow State Machine */}
        <div className="lg:col-span-5 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Deterministic Workflow Nodes (Box I & K)
          </h3>
          {steps.map((step) => {
            const isCurrent = step.status === "active";
            const isDone = step.status === "completed";
            return (
              <div
                key={step.stepNumber}
                className={`p-3 rounded-xl border transition-all ${
                  isCurrent
                    ? "bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-950/40"
                    : isDone
                    ? "bg-slate-900/40 border-slate-800/80 opacity-80"
                    : "bg-slate-950/40 border-slate-800/40 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isDone
                          ? "bg-emerald-500 text-slate-950"
                          : isCurrent
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.stepNumber}
                    </span>
                    <span className="text-xs font-bold text-white">{step.title}</span>
                  </div>
                  {step.isHumanGate && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      (H) Gate
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 ml-7 leading-tight">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Active Voice Stream & Transcript */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950/70 border border-slate-800/80 rounded-xl p-4">
          {/* Animated Audio Waveform & Status */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 h-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-emerald-400 rounded-full ${
                      isPlayingAudio && isCallActive ? "wave-bar" : "h-1.5 bg-slate-700"
                    }`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-300">
                {isPlayingAudio && isCallActive
                  ? "Eleven v3 Voice Synthesizing..."
                  : isCallActive
                  ? "Scribe v2 STT Listening..."
                  : "Audio Channel Ready"}
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
              {language === "ar" ? "رمسة إماراتية (Gulf)" : "En-US (Banking)"}
            </span>
          </div>

          {/* Transcript Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 py-3 pr-1 max-h-[220px]">
            {turns.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-500">
                <Mic className="w-8 h-8 mb-2 opacity-30 text-slate-400" />
                <p className="text-xs">No active conversation. Launch a call to view the real-time verified dialogue.</p>
              </div>
            ) : (
              turns.map((turn) => {
                const isAgent = turn.speaker === "agent";
                return (
                  <div
                    key={turn.id}
                    className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
                      <span>{isAgent ? "Aegis AI Security" : incident.customerName}</span>
                      <span>•</span>
                      <span>{turn.timestamp}</span>
                    </div>
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        isAgent
                          ? "bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-tl-sm"
                          : "bg-emerald-600/90 text-white rounded-tr-sm"
                      }`}
                    >
                      <p>{language === "ar" && turn.textAr ? turn.textAr : turn.text}</p>
                      {turn.toolCall && (
                        <div className="mt-2 pt-2 border-t border-slate-700/60 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                          <Lock className="w-3 h-3 text-emerald-400" />
                          <span>Tool Executed: {turn.toolCall.name}()</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Customer Response Interactive Control Bar */}
          {isCallActive && (
            <div className="mt-3 pt-3 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Simulate Customer Spoken Utterance (Voice / Speech-to-Text):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  disabled={!isPushApproved || isCardFrozen}
                  onClick={() =>
                    onCustomerResponse(
                      language === "ar" ? "لا مش أنا! وقف البطاقة فوراً!" : "No, that wasn't me! Freeze my card right now!",
                      "fraud"
                    )
                  }
                  className={`p-2 rounded-lg text-xs font-bold text-center border transition ${
                    isPushApproved && !isCardFrozen
                      ? "bg-red-500/20 border-red-500/40 text-red-300 hover:bg-red-500/30 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  "No! Freeze Card!"
                </button>

                <button
                  disabled={!isPushApproved || isCardFrozen}
                  onClick={() =>
                    onCustomerResponse(
                      language === "ar" ? "أيوه أنا سويت هالعملية، شكراً." : "Yes, I made this purchase, thank you.",
                      "legitimate"
                    )
                  }
                  className={`p-2 rounded-lg text-xs font-bold text-center border transition ${
                    isPushApproved && !isCardFrozen
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                      : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  "Yes, I authorized it"
                </button>

                <button
                  onClick={() =>
                    onCustomerResponse(
                      language === "ar" ? "أريد أتكلم مع موظف بشري فوراً." : "I want to speak with a human agent.",
                      "human"
                    )
                  }
                  className="p-2 rounded-lg text-xs font-medium text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
                >
                  "Transfer to Human"
                </button>

                <button
                  onClick={() =>
                    onCustomerResponse(
                      language === "ar" ? "هذا إزعاج، لا تتصلون فيني." : "Stop calling me, this is spam.",
                      "optout"
                    )
                  }
                  className="p-2 rounded-lg text-xs font-medium text-center bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 transition"
                >
                  "Opt-Out / Disconnect"
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
