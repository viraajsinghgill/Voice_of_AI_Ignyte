"use client";

import React, { useState } from "react";
import { FraudIncident } from "@/types/fraud";
import {
  Smartphone,
  ShieldCheck,
  Fingerprint,
  CheckCircle2,
  XCircle,
  Bell,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface MobileAppSimulatorProps {
  incident: FraudIncident;
  isPushActive: boolean;
  isPushApproved: boolean;
  onApprovePush: () => void;
  onRejectPush: () => void;
}

export const MobileAppSimulator: React.FC<MobileAppSimulatorProps> = ({
  incident,
  isPushActive,
  isPushApproved,
  onApprovePush,
  onRejectPush,
}) => {
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);

  const handleApprove = () => {
    setIsBiometricScanning(true);
    setTimeout(() => {
      setIsBiometricScanning(false);
      onApprovePush();
    }, 700);
  };

  return (
    <div className="bg-[#0e1626] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Mobile Handset Enclave
            </h3>
            <p className="text-[11px] text-slate-400">Zero-Knowledge Out-of-Band Push Challenge</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          iOS Secure Enclave PKI
        </span>
      </div>

      {/* Simulated Smartphone Frame */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-[280px] bg-slate-950 border-4 border-slate-800 rounded-[36px] p-3 shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
          {/* Top Speaker / Dynamic Island */}
          <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          </div>

          {/* App Header */}
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-900 text-[10px] text-slate-400">
            <span className="font-bold text-white tracking-wide">Emirates Digital</span>
            <span className="font-mono">100% Battery</span>
          </div>

          {/* Main Handset Screen Body */}
          <div className="flex-1 flex flex-col items-center justify-center py-2 px-1">
            {isPushApproved ? (
              <div className="text-center p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">Identity Verified</h4>
                <p className="text-[10px] text-slate-300 leading-tight">
                  Biometric FaceID signature verified. Voice agent authenticated without voice secrets.
                </p>
                <div className="mt-2 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 p-1 rounded">
                  ES256_HW_KEY_SIGNED
                </div>
              </div>
            ) : isPushActive ? (
              <div className="w-full bg-slate-900 border border-amber-500/50 rounded-2xl p-3 shadow-xl animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-2 text-amber-400">
                  <Bell className="w-4 h-4 animate-bounce" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Urgent Security Alert</span>
                </div>

                <div className="text-[11px] text-slate-200 mb-2 leading-tight">
                  Did you attempt <strong className="text-white font-mono">{incident.currency} {incident.amount.toLocaleString()}</strong> at{" "}
                  <strong className="text-white">{incident.merchantName}</strong>?
                </div>

                <div className="text-[10px] font-mono text-slate-400 mb-3 bg-slate-950 p-1.5 rounded border border-slate-800">
                  Card •••• {incident.cardLastFour} · {incident.location}
                </div>

                {isBiometricScanning ? (
                  <div className="flex flex-col items-center justify-center py-3">
                    <Fingerprint className="w-8 h-8 text-teal-400 animate-pulse" />
                    <span className="text-[10px] text-teal-300 mt-1 font-semibold">Scanning FaceID...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleApprove}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition flex items-center justify-center gap-1 shadow-md shadow-emerald-950/50"
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={onRejectPush}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] transition flex items-center justify-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      <span>Decline</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500 p-4">
                <Lock className="w-8 h-8 mx-auto mb-2 opacity-30 text-slate-400" />
                <p className="text-[11px]">Mobile app idle on home screen.</p>
                <p className="text-[10px] text-slate-600 mt-1">Waiting for Voice Agent challenge dispatch...</p>
              </div>
            )}
          </div>

          {/* Bottom Nav Mockup */}
          <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2"></div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>Why this matters:</strong> Attackers cannot intercept voice audio to extract OTPs or passwords.
        </span>
      </div>
    </div>
  );
};
