"use client";

import React from "react";
import { format, isToday, addDays, getDay } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  selectedDate: Date;
  isAnySelected: boolean;
  onDateChange: (date: Date) => void;
  onClearSelection: () => void;
};

export default function ActivityLogHeader({
  selectedDate,
  isAnySelected,
  onDateChange,
  onClearSelection,
}: Props) {
  const isSelectedToday = isToday(selectedDate);
  const dayOfWeek = getDay(selectedDate);
  const weekProgress = ((dayOfWeek + 1) / 7) * 100;

  return (
    <header className="sticky top-0 z-[600] w-full h-24 flex items-center justify-center px-6 pointer-events-none">
      <div className="w-full max-w-5xl h-16 bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl grid grid-cols-[180px_1fr_180px] items-center px-4 pointer-events-auto">
        <div className="flex items-center gap-4 pl-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/80 mb-0.5">Timeline</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-slate-900 uppercase">{format(selectedDate, "MMM", { locale: ja })}</span>
              <span className="text-[10px] font-bold text-slate-400 tabular-nums">{format(selectedDate, "yyyy")}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <NavButton direction="left" onClick={() => onDateChange(addDays(selectedDate, -1))} />
          <div className="relative flex items-center justify-center min-w-[80px] h-12">
            <div className="absolute inset-x-0 -bottom-1 h-[3px] bg-slate-200/30 rounded-full overflow-hidden">
              <motion.div animate={{ width: `${weekProgress}%` }} className={`h-full rounded-full ${isSelectedToday ? 'bg-emerald-500' : 'bg-slate-400'}`} />
            </div>
            <span className={`text-4xl font-[1000] tabular-nums tracking-tighter leading-none z-10 ${isSelectedToday ? "text-emerald-600" : "text-slate-800"}`}>{format(selectedDate, "d")}</span>
          </div>
          <NavButton direction="right" onClick={() => onDateChange(addDays(selectedDate, 1))} />
        </div>

        <div className="flex items-center justify-end pr-2">
          <AnimatePresence mode="wait">
            {isAnySelected ? (
              <motion.button key="dismiss" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={onClearSelection} className="flex items-center gap-2 bg-slate-900 text-white pl-4 pr-3 py-2 rounded-2xl text-[10px] font-black tracking-widest active:scale-95 shadow-xl shadow-slate-200/50">
                DISMISS
                <div className="w-5 h-5 flex items-center justify-center rounded-lg bg-white/10"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M6 18L18 6M6 6l12 12" /></svg></div>
              </motion.button>
            ) : (
              !isSelectedToday && (
                <motion.button key="today" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onClick={() => onDateChange(new Date())} className="flex items-center gap-2 py-2 px-3 rounded-2xl hover:bg-emerald-50/50 transition-colors group">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 group-hover:text-emerald-600">GO TODAY</span>
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100/50 group-hover:bg-emerald-100/50 transition-colors"><svg className="w-3 h-3 text-slate-600 group-hover:text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></div>
                </motion.button>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  const isLeft = direction === 'left';
  return (
    <button onClick={onClick} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60 text-slate-300 hover:text-slate-900 transition-all active:scale-75 pointer-events-auto shadow-sm shadow-transparent hover:shadow-slate-200/50">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d={isLeft ? "M15.75 19.5L8.25 12l7.5-7.5" : "M8.25 4.5l7.5 7.5-7.5 7.5"} /></svg>
    </button>
  );
}