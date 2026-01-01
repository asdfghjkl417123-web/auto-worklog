"use client";

import { motion } from "framer-motion";

export default function FocusChartPanel() {
  return (
    <section className="flex-1 bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 flex flex-col min-h-[340px]">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
            Performance Curve
          </h3>
          <p className="text-[10px] text-slate-300 font-bold">集中度の推移と中断パターンの可視化</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <span className="text-[10px] font-black text-slate-500">Focus Level</span>
          </div>
          <span className="text-[10px] text-blue-500 font-black bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/50">
            REAL-TIME
          </span>
        </div>
      </div>
      
      {/* グラフエリア */}
      <div className="flex-1 w-full bg-slate-50/30 rounded-[32px] border border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 group hover:bg-slate-50/50 transition-colors">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-blue-100 transition-colors"
        >
          <svg className="w-8 h-8 text-slate-200 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        </motion.div>
        <p className="text-xs text-slate-400 font-bold tracking-tight">Performance data mapping...</p>
      </div>
    </section>
  );
}