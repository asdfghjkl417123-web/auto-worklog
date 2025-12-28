"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "../calendar/Calendar";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

type ViewMode = "days" | "months";

export default function CalendarPanel({
  open,
  onClose,
  selectedDate,
  onSelectDate,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState<1 | -1>(1);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("days");

  // クライアントサイドでのマウント確認
  useEffect(() => {
    setMounted(true);
  }, []);

  // モーダルが開かれたときに表示状態をリセット・同期
  useEffect(() => {
    if (open) {
      const targetDate = selectedDate || new Date();
      setCurrentMonth(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
      setViewMode("days");
    }
  }, [open, selectedDate]);

  // 月一覧から月を選択した時のハンドラ（微小な遅延で高級感を演出）
  const handleMonthSelect = (monthIndex: number) => {
    // 1. まず内部の状態（表示月）を更新
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    
    // 2. 150msだけ待ってから「日表示」に戻す
    // これにより、月ボタンのタップアニメーションが完結してから画面が切り替わる
    setTimeout(() => {
      setViewMode("days");
    }, 150);
  };

  // 日付を選択した時のハンドラ
  const handleDateSelect = (date: Date) => {
    onSelectDate(date);
    // 200msのタメを作ってからモーダルを閉じる
    // 「選んだ」という実感をユーザーに残すための余韻
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* オーバーレイ：背景のぼかしもアニメーションさせる */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/40 cursor-pointer"
          />

          {/* モーダル本体 */}
          <motion.div
            key="modal"
            // y: 0%（中央より少し下）から -50%（中央）へふわっと浮かび上がらせる
            initial={{ x: "-50%", y: "0%", opacity: 0, scale: 0.95 }}
            animate={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
            exit={{ x: "-50%", y: "0%", opacity: 0, scale: 0.95 }}
            // しっとりとした重みのあるスプリング設定
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 28, 
              mass: 0.8 
            }}
            className="fixed top-1/2 left-1/2 z-[10000] w-[92%] max-w-[420px] bg-slate-50 rounded-[48px] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* ヘッダーセクション */}
            <header className="flex flex-col items-center pt-8 pb-2">
              {/* ドラッグハンドル風の装飾 */}
              <div className="w-10 h-1.5 bg-slate-300/60 rounded-full mb-6" />
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                {viewMode === "days" ? "日付を選択" : "月を選択"}
              </h2>
            </header>

            {/* カレンダーコンテンツ */}
            <div className="pb-8 px-2">
              <Calendar
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                direction={direction}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onSelectDate={handleDateSelect}
                onSelectMonth={handleMonthSelect}
                onGoToToday={() => {
                  const today = new Date();
                  const todayFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                  
                  if (todayFirstDay.getTime() > currentMonth.getTime()) {
                    setDirection(1);
                  } else if (todayFirstDay.getTime() < currentMonth.getTime()) {
                    setDirection(-1);
                  } else {
                    return;
                  }

                  setViewMode("days");
                  setCurrentMonth(todayFirstDay);
                }}
                onPrevMonth={(isYear) => {
                  setDirection(-1);
                  const offset = isYear ? 12 : 1;
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - offset, 1));
                }}
                onNextMonth={(isYear) => {
                  setDirection(1);
                  const offset = isYear ? 12 : 1;
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
                }}
              />
            </div>

            {/* フッターセクション */}
            <footer className="flex justify-center pb-8">
              <button
                onClick={onClose}
                className="px-8 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-all rounded-full hover:bg-slate-100 active:scale-95"
              >
                キャンセル
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}