"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ActivityBlock } from "../timeline/types";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

type Props = {
  selectedDate: Date | null;
  selectedBlock: ActivityBlock | null;
};

export default function DetailPanel({ selectedDate, selectedBlock }: Props) {
  if (!selectedDate) return null;

  // ダミーデータ（本来はPropsやAPIから取得）
  const stats = { focusTime: "5.5h", achievement: "85%" };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 relative overflow-hidden min-h-[400px] flex flex-col shrink-0">
      {/* 背景装飾：より広範囲に、透明度を下げて上品に */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />

      <AnimatePresence mode="wait">
        {!selectedBlock ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col h-full relative z-10"
          >
            {/* サマリーヘッダー */}
            <header className="flex justify-between items-start mb-8">
              <div>
                <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.25em] mb-1.5">Daily Insight</p>
                <h3 className="text-3xl font-[1000] text-slate-900 tracking-tighter">
                  {format(selectedDate, "M月d日", { locale: ja })}
                  <span className="text-sm font-bold text-slate-400 ml-2">
                    {format(selectedDate, "(eee)", { locale: ja })}
                  </span>
                </h3>
              </div>
              <div className="flex gap-2">
                {[
                  { label: "FOCUS", value: stats.focusTime },
                  { label: "SCORE", value: stats.achievement },
                ].map((s) => (
                  <div key={s.label} className="bg-white/60 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[8px] text-slate-400 font-black mb-0.5 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xs font-black text-slate-800 tabular-nums">{s.value}</p>
                  </div>
                ))}
              </div>
            </header>

            {/* AI 分析セクション */}
            <div className="bg-slate-900 rounded-[28px] p-6 text-white shadow-2xl shadow-blue-900/10 mb-6">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="relative">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping absolute" />
                  <div className="w-2 h-2 bg-blue-400 rounded-full relative" />
                </div>
                <span className="text-[10px] font-black text-blue-300 tracking-[0.2em] uppercase">System Analytics</span>
              </div>
              <p className="text-[15px] leading-relaxed text-slate-200 font-medium">
                午後の集中作業が <span className="text-blue-300 font-black border-b-2 border-blue-400/30">1時間延長</span> されました。明日は午後の枠を広めに確保する構成を推奨します。
              </p>
            </div>

            {/* 特徴グリッド */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <InsightCard 
                type="strength" 
                label="Strength" 
                text="メール処理を15分短縮。ルーティンの効率が向上しています。" 
              />
              <InsightCard 
                type="improve" 
                label="Improve" 
                text="緊急MTGによる中断あり。深集中への復帰に時間を要しました。" 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -20 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="relative z-10 flex flex-col h-full"
          >
            {/* 詳細ヘッダー */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
                    selectedBlock.type === 'reconstructed' ? 'bg-indigo-600 text-white' : 
                    selectedBlock.type === 'plan' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    {selectedBlock.type}
                  </span>
                  <span className="text-slate-400 text-xs font-black tabular-nums tracking-wide">
                    {format(selectedBlock.start, "HH:mm")} — {selectedBlock.end ? format(selectedBlock.end, "HH:mm") : "..."}
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-[1000] text-slate-900 tracking-tighter leading-tight">
                {selectedBlock.title}
              </h3>
            </div>

            {/* コンテキストカード */}
            <div className="space-y-5 flex-1">
              <div className="p-6 rounded-[28px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all duration-300">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Context</h4>
                <p className="text-[15px] text-slate-700 leading-relaxed font-medium italic">
                  "{selectedBlock.meta || "履歴は記録されていません。"}"
                </p>
              </div>

              {/* 信頼度メーター */}
              {selectedBlock.confidence !== undefined && (
                <div className="p-6 rounded-[28px] border border-indigo-100 bg-indigo-50/30">
                  <div className="flex justify-between items-end mb-3">
                    <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">System Confidence</h4>
                    <span className="text-2xl font-[1000] text-indigo-600 leading-none tabular-nums">
                      {Math.round(selectedBlock.confidence * 100)}<span className="text-xs ml-0.5">%</span>
                    </span>
                  </div>
                  <div className="h-2 w-full bg-indigo-100/50 rounded-full overflow-hidden p-[2px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedBlock.confidence * 100}%` }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-indigo-600 rounded-full relative shadow-[0_0_10px_rgba(79,70,229,0.4)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// サブコンポーネント：インサイトカード
function InsightCard({ type, label, text }: { type: 'strength' | 'improve', label: string, text: string }) {
  const styles = {
    strength: "bg-emerald-50/40 border-emerald-100/60 text-emerald-600",
    improve: "bg-amber-50/40 border-amber-100/60 text-amber-600"
  };

  return (
    <div className={`p-4 rounded-[24px] border ${styles[type]} transition-transform hover:scale-[1.02] duration-200`}>
      <span className="text-[9px] font-black uppercase tracking-wider">{label}</span>
      <p className="text-[11px] text-slate-700 font-bold mt-1.5 leading-snug">
        {text}
      </p>
    </div>
  );
}