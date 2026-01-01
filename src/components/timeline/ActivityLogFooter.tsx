"use client";

import React from "react";

const LEGEND_CONFIG = [
  { key: "actual", label: "Actual", dotClass: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" },
  { key: "plan", label: "Plan", dotClass: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]" },
  { key: "analysis", label: "Insight", dotClass: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]" },
] as const;

export default function ActivityLogFooter() {
  return (
    <footer className="fixed bottom-6 left-0 right-0 z-[500] flex justify-center px-6 pointer-events-none">
      <div className="w-full max-w-5xl h-10 bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] rounded-2xl flex items-center justify-between px-6 pointer-events-auto">
        <nav className="flex items-center gap-8">
          {LEGEND_CONFIG.map((item) => (
            <div key={item.key} className="flex items-center gap-2.5 group cursor-default">
              <div className={`w-1.5 h-1.5 rounded-full transition-transform duration-500 group-hover:scale-125 ${item.dotClass}`} />
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="h-3 w-[1px] bg-slate-200/50 rotate-[20deg]" />
          <div className="flex items-center gap-2.5">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-[0.3em]">System Active</span>
            <div className="relative w-1 h-1">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
              <div className="relative w-1 h-1 bg-emerald-500/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}