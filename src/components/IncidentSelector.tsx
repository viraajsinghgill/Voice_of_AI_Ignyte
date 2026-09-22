"use client";

import React from "react";
import { FraudIncident } from "@/types/fraud";
import { AlertTriangle, MapPin, CreditCard, Flame, ArrowRight } from "lucide-react";

interface IncidentSelectorProps {
  incidents: FraudIncident[];
  selectedIncident: FraudIncident;
  onSelectIncident: (incident: FraudIncident) => void;
  isCallActive: boolean;
  onStartCall: () => void;
}

export const IncidentSelector: React.FC<IncidentSelectorProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  isCallActive,
  onStartCall,
}) => {
  return (
    <div className="bg-[#0e1626] border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              FICO Falcon · Real-Time Fraud Bus
            </h2>
            <p className="text-xs text-slate-400">Anomalous payment events triggering automated intervention</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-semibold">
          3 Urgent Incidents
        </span>
      </div>

      {/* Incident Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {incidents.map((incident) => {
          const isSelected = selectedIncident.id === incident.id;
          return (
            <div
              key={incident.id}
              onClick={() => !isCallActive && onSelectIncident(incident)}
              className={`relative cursor-pointer transition-all duration-200 rounded-xl p-3.5 border ${
                isSelected
                  ? "bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-950/40"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
              } ${isCallActive ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {/* Risk Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 font-semibold">{incident.id}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    incident.riskScore >= 900
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  Score: {incident.riskScore}/1000
                </span>
              </div>

              {/* Customer & Amount */}
              <div className="mb-2">
                <div className="text-sm font-bold text-white">{incident.customerName}</div>
                <div className="text-xs font-semibold text-emerald-400 font-mono">
                  {incident.currency} {incident.amount.toLocaleString()}
                </div>
              </div>

              {/* Merchant & Location */}
              <div className="space-y-1 text-[11px] text-slate-400">
                <div className="truncate flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3 text-slate-500 shrink-0" />
                  <span className="truncate">{incident.merchantName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{incident.location}</span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute bottom-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-slate-950">
                  <ArrowRight className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Action Bar */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Active target: <strong className="text-white">{selectedIncident.customerName}</strong> ({selectedIncident.customerPhone}) ·{" "}
            <span className="text-slate-400 font-mono">Card ending in •••• {selectedIncident.cardLastFour}</span>
          </span>
        </div>

        {!isCallActive ? (
          <button
            onClick={onStartCall}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs tracking-wide uppercase transition shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2"
          >
            <span>Initiate Outbound Call (&lt;25s Target)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Outbound Call In Progress...</span>
          </div>
        )}
      </div>
    </div>
  );
};
