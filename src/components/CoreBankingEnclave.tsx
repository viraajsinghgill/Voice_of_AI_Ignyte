"use client";

import React from "react";
import { FraudIncident, CardStatus } from "@/types/fraud";
import {
  Server,
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  AlertOctagon,
  FileCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

interface CoreBankingEnclaveProps {
  incident: FraudIncident;
  cardStatus: CardStatus;
  isEscalated: boolean;
  onExecuteHumanAction: (actionName: string) => void;
}

export const CoreBankingEnclave: React.FC<CoreBankingEnclaveProps> = ({
  incident,
  cardStatus,
  isEscalated,
  onExecuteHumanAction,
}) => {
  return (
    <div className="bg-[#0e1626] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Institution Core Banking Enclave
            </h3>
            <p className="text-[11px] text-slate-400">Temenos T24 & OpenWay Way4 Integration</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
          mTLS / AES-256
        </span>
      </div>

      <div className="space-y-4 flex-1">
        {/* Card Ledger Status */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Card Ledger State</span>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                cardStatus === "TEMP_LOCKED"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : cardStatus === "PERMANENTLY_CANCELLED"
                  ? "bg-red-500/20 text-red-300 border border-red-500/40"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              }`}
            >
              {cardStatus === "TEMP_LOCKED" ? (
                <>
                  <Lock className="w-3 h-3" />
                  <span>TEMP_LOCKED (Frozen)</span>
                </>
              ) : cardStatus === "PERMANENTLY_CANCELLED" ? (
                <>
                  <AlertOctagon className="w-3 h-3" />
                  <span>PERMANENTLY_CANCELLED</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3 h-3" />
                  <span>ACTIVE / UNRESTRICTED</span>
                </>
              )}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-3">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">CARD TOKEN</span>
              <span className="text-slate-200 font-semibold">{incident.cardToken.substring(0, 14)}...</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">PREVENTED EXPOSURE</span>
              <span className="text-emerald-400 font-bold">
                {cardStatus === "TEMP_LOCKED" ? `${incident.currency} ${incident.amount.toLocaleString()}` : "0 AED"}
              </span>
            </div>
          </div>
        </div>

        {/* Human Approval Gate (H) Box */}
        <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3.5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>HUMAN APPROVAL GATE (H)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Strictly Gated
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-3 leading-tight">
            Per CBUAE rules, autonomous AI can only execute temporary freezes. Permanent actions require a licensed human fraud investigator.
          </p>

          {/* Action buttons inside human gate */}
          <div className="space-y-2">
            <button
              disabled={!isEscalated}
              onClick={() => onExecuteHumanAction("Issue Replacement Card & Permanent Cancellation")}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                isEscalated
                  ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  : "bg-slate-900/60 text-slate-600 border border-slate-800 cursor-not-allowed"
              }`}
            >
              <span>1. Cancel Card & Issue Replacement</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              disabled={!isEscalated}
              onClick={() => onExecuteHumanAction("Submit Visa/Mastercard Dispute Affidavit")}
              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                isEscalated
                  ? "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  : "bg-slate-900/60 text-slate-600 border border-slate-800 cursor-not-allowed"
              }`}
            >
              <span>2. File Chargeback Affidavit (Visa VROL)</span>
              <FileCheck className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Genesys Cloud Tier-2 Queue Status */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Tier-2 Fraud Queue (Genesys Cloud)</span>
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                isEscalated
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {isEscalated ? "ACTIVE CALL BRIDGED" : "STANDBY"}
            </span>
          </div>
          {isEscalated && (
            <div className="mt-2 text-[10px] text-teal-300 bg-teal-950/40 p-2 rounded border border-teal-800/40">
              Whisper Summary received: <em>"Customer identity verified via in-app push; temporary freeze executed."</em>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
