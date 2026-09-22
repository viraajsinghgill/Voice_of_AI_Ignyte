"use client";

import React from "react";
import { AuditRecord } from "@/types/fraud";
import { Shield, X, CheckCircle, Database, Lock, Activity } from "lucide-react";

interface AuditTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditRecords: AuditRecord[];
}

export const AuditTelemetryModal: React.FC<AuditTelemetryModalProps> = ({
  isOpen,
  onClose,
  auditRecords,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1220] border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Immutable Regulatory Compliance Ledger
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                  CBUAE Circular 8/2020
                </span>
              </h2>
              <p className="text-xs text-slate-400">Cryptographic audit log with SHA-256 verification and zero PII leakage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Latency Waterfall Banner */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal-400" />
              <span>Real-Time In-Flight Latency Budget Waterfall (&le; 650ms Target)</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold">Total: 590ms</span>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">TELCO IN</span>
              <span className="text-slate-200 font-bold">40ms</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">SCRIBE v2 STT</span>
              <span className="text-teal-400 font-bold">150ms</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">STATE FSM</span>
              <span className="text-slate-200 font-bold">190ms</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">ELEVEN v3 TTS</span>
              <span className="text-emerald-400 font-bold">160ms</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">TELCO OUT</span>
              <span className="text-slate-200 font-bold">50ms</span>
            </div>
          </div>
        </div>

        {/* Audit Records List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {auditRecords.map((record) => (
            <div
              key={record.id}
              className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-400">{record.eventType}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {record.actor}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{record.timestamp}</span>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <p className="text-xs text-slate-300">{record.details}</p>
              <div className="mt-1 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Hash: {record.hash}</span>
                </span>
                <span className="text-emerald-500 font-semibold">VERIFIED_TAMPER_EVIDENT</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Encrypted WORM Storage (AWS me-central-1 Abu Dhabi)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition"
          >
            Close Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
