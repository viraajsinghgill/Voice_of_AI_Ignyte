"use client";

import React from "react";
import { FileText, X, CheckCircle2, Award, ExternalLink } from "lucide-react";

interface IdeaCanvasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdeaCanvasModal: React.FC<IdeaCanvasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1220] border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                ElevenLabs IGNYTE Hackathon · Stage 1 Submission Canvas
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Track 1: Banking
                </span>
              </h2>
              <p className="text-xs text-slate-400">Team: Vinlabs · Real-Time Fraud Intervention</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-300">
          {/* Section 01 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <span className="text-emerald-400">01</span> The Opportunity
            </h3>
            
            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <strong className="text-slate-400 block mb-1">B · The idea in one line (25 words max · 0 adjectives):</strong>
              <blockquote className="text-emerald-300 font-semibold italic border-l-2 border-emerald-500 pl-3 py-1">
                "An agent that initiates outbound voice calls for retail banks, so that customers verify suspicious transactions and trigger card freezes before funds leave accounts."
              </blockquote>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
              <strong className="text-slate-400 block mb-1">D · Today's Baseline vs Target (Box M Cross-Checked):</strong>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono mt-1">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">TIME TO VOICE</span>
                  <span className="text-red-400 block">Baseline: 28 Mins</span>
                  <span className="text-emerald-400 font-bold">Target: &lt; 25 Sec</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">ALERT ENGAGEMENT</span>
                  <span className="text-red-400 block">Baseline: 14%</span>
                  <span className="text-emerald-400 font-bold">Target: &gt; 78%</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">FRAUD RECOVERY</span>
                  <span className="text-red-400 block">Baseline: 8%</span>
                  <span className="text-emerald-400 font-bold">Target: &gt; 64%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 03 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <span className="text-emerald-400">03</span> The Agent &amp; Guardrails
            </h3>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-2">
              <strong className="text-slate-400 block">I · The 5-Step Call Flow (Max 15 words/step):</strong>
              <ol className="list-decimal list-inside space-y-1.5 text-[11px]">
                <li><strong className="text-white">Opening Disclosure:</strong> "This is Emirates Bank AI Security calling regarding a suspicious card transaction on your account."</li>
                <li><strong className="text-white">Zero-Knowledge Challenge:</strong> "We sent a secure push notification to your banking app; please tap Approve to verify."</li>
                <li><strong className="text-white">Triangulation:</strong> Webhook confirms biometric approval; agent states merchant name, transaction amount, and timestamp for confirmation.</li>
                <li><strong className="text-white">Protective Freeze:</strong> Customer confirms transaction was unauthorized; agent executes immediate temporary card freeze via core banking tool.</li>
                <li><strong className="text-white">Human Escalation (H):</strong> Agent transfers call to human fraud specialist for replacement card and dispute filing.</li>
              </ol>
            </div>
          </div>

          {/* Section 04 */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <span className="text-emerald-400">04</span> Verification Checklist Enforced
            </h3>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Every ElevenLabs component ticked in J</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Each institution system named (Temenos, Falcon, Genesys)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Labelled arrows &amp; directional flows</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PII boundaries marked with filled dots (•)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Human approval gate (H) explicitly enforced</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dependency down &amp; circuit-breaking handled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
          <span className="text-slate-400">See STAGE_1_IDEA_CANVAS.md for complete submission text.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
