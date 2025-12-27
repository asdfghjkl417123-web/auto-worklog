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

export default function CalendarPanel({
  open,
  onClose,
  selectedDate,
  onSelectDate,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [direction, setDirection] = useState<1 | -1>(1);
  const [mounted, setMounted] = useState(false);

  // クライアントサイドでのマウントを確認
  useEffect(() => {
    setMounted(true);
  }, []);

  // モーダルが開かれたときに表示する月を同期
  useEffect(() => {
    if (open) {
      const targetDate = selectedDate || new Date();
      setCurrentMonth(new Date(targetDate.getFullYear(), targetDate.getMonth(), 1));
    }
  }, [open, selectedDate]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* オーバーレイ：背景のぼかしと暗転 */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md cursor-pointer"
          />

          {/* モーダル本体：中央配置とスプリングアニメーション */}
          <motion.div
            key="modal"
            initial={{ x: "-50%", y: "60%", opacity: 0, scale: 0.9 }}
            animate={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
            exit={{ x: "-50%", y: "60%", opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed top-1/2 left-1/2 z-[10000] w-[92%] max-w-[420px] bg-slate-50 rounded-[48px] shadow-2xl overflow-hidden border border-white/20"
          >
            {/* ヘッダー */}
            <header className="flex flex-col items-center pt-8 pb-2">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full mb-6 opacity-50" />
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                日付を選択
              </h2>
            </header>
            
            {/* カレンダー本体：Calendar.tsx側でマージン等を調整しているため、ここではシンプルに配置 */}
            <div className="pb-8 px-2">
              <Calendar
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                direction={direction}
                onSelectDate={(date) => {
                  onSelectDate(date);
                  // onClose(); // 日付選択時に自動で閉じる場合はコメントアウトを外す
                }}
                onPrevMonth={() => {
                  setDirection(-1);
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
                }}
                onNextMonth={() => {
                  setDirection(1);
                  setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
                }}
              />
            </div>

            {/* フッター（閉じるボタンなどが必要な場合） */}
            <footer className="flex justify-center pb-6">
              <button 
                onClick={onClose}
                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
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