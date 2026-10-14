"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Sparkles, Radio, FileText, CheckCircle2, Zap } from "lucide-react";

interface HeaderProps {
  onOpenAudit: () => void;
  onOpenCanvas: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAudit, onOpenCanvas }) => {
  const [grantInfo, setGrantInfo] = useState<{
    tier: string;
    characterLimit: number;
    characterCount: number;
    agentId?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/elevenlabs")
      .then((res) => res.json())
      .then((data) => {
        if (data.configured) {
          setGrantInfo({
            tier: data.tier,
            characterLimit: data.characterLimit,
            characterCount: data.characterCount,
            agentId: data.agentId,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="border-b border-slate-800 bg-[#0b1120]/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-950/50">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                PROJECT SENTINEL
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Track 1: Banking
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Emirates Digital Bank</span>
              <span className="text-slate-600">•</span>
              <span>Real-Time Fraud Voice Intervention</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono text-[11px]">CBUAE Governed</span>
            </p>
          </div>
        </div>

        {/* Live Status Gauges & Actions */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
          {/* ElevenLabs Grant Tier Live Telemetry */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold">
              ElevenLabs Grant:{" "}
              <strong className="text-white font-mono">
                {grantInfo ? `${(grantInfo.characterLimit / 1000000).toFixed(1)}M Chars` : "33.0M Chars"}
              </strong>
            </span>
          </div>

          {/* ElevenLabs Scribe v2 Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Scribe v2 STT (<span className="text-emerald-400 font-mono">150ms</span>)</span>
          </div>

          {/* Latency Gauge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Latency: <strong className="text-white font-mono">590ms</strong></span>
          </div>

          {/* Action: Audit Logs */}
          <button
            onClick={onOpenAudit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Audit Ledger</span>
          </button>

          {/* Action: View Canvas */}
          <button
            onClick={onOpenCanvas}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition font-medium shadow-md shadow-emerald-950/40"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Idea Canvas</span>
          </button>
        </div>
      </div>
    </header>
  );
};
