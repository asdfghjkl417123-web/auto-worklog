"use client";

import { useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import DayCell from "./DayCell";
import MonthCell from "./MonthCell";

/**
 * カレンダーコンポーネントのプロパティ型定義
 */
type Props = {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: (isYear?: boolean) => void;
  onNextMonth: (isYear?: boolean) => void;
  onGoToToday: () => void;
  direction: 1 | -1;
  viewMode: "days" | "months";
  onViewModeChange: (mode: "days" | "months") => void;
  onSelectMonth: (month: number) => void;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const MONTHS_LABEL = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

/**
 * カレンダー切り替え時のアニメーション定義
 * 高級感を出すためにブラーとマイルドなスプリングを適用
 */
const calendarVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '20%' : '-20%',
    opacity: 0,
    filter: "blur(8px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 220, damping: 28 },
      opacity: { duration: 0.3 },
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-20%' : '20%',
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: 0.25, ease: "easeInOut" }
  }),
};

export default function Calendar({
  currentMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onGoToToday,
  direction,
  viewMode,
  onViewModeChange,
  onSelectMonth,
}: Props) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrev = () => onPrevMonth(viewMode === "months");
  const handleNext = () => onNextMonth(viewMode === "months");

  const days = useMemo(() => {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [
      ...Array(firstDayOfWeek).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  }, [year, month]);

  return (
    <div className="flex flex-col items-center w-full max-w-[380px] mx-auto p-5 bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 font-sans overflow-hidden">

      {/* ヘッダー部分 */}
      <div className="w-full flex items-center h-20 mb-6">
        {/* 左操作エリア */}
        <div className="flex items-center gap-1.5 w-[100px] justify-start">
          <NavButton onClick={handlePrev} label={viewMode === "days" ? "前の月へ" : "前の年へ"} icon="◀" offset="-1px" />
          <ActionButton onClick={onGoToToday}>今日</ActionButton>
        </div>

        {/* 中央年月表示 */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex justify-center items-center h-4 w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={year}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className="text-[11px] font-bold text-slate-400 tracking-[0.2em] tabular-nums min-w-[60px] text-center"
              >
                {year}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative flex items-center justify-center h-8 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              {viewMode === "days" ? (
                <motion.div
                  key="month-main"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-baseline justify-center"
                >
                  <span className="text-3xl font-black text-slate-800 tabular-nums tracking-tighter inline-block min-w-[1.8rem] text-center">
                    {month + 1}
                  </span>
                  <span className="text-[10px] font-bold text-blue-500 ml-1 uppercase">
                    Month
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="month-select-label"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center items-center"
                >
                  <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full tracking-[0.15em] uppercase border border-blue-100/50">
                    Select
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 右操作エリア */}
        <div className="flex items-center gap-1.5 w-[100px] justify-end">
          <ActionButton onClick={() => onViewModeChange(viewMode === "days" ? "months" : "days")}>
            {viewMode === "days" ? "一覧" : "戻る"}
          </ActionButton>
          <NavButton onClick={handleNext} label={viewMode === "days" ? "次の月へ" : "次の年へ"} icon="▶" offset="1px" />
        </div>
      </div>

      {/* 曜日ラベルエリア */}
      <div className={`grid grid-cols-7 gap-2 w-full mb-2 transition-all duration-500 ease-out ${
          viewMode === "days" ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}>
        {WEEKDAYS.map((d, i) => (
          <div key={d} className={`text-center text-[11px] font-bold ${
            i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'
          }`}>
            {d}
          </div>
        ))}
      </div>

      {/* カレンダー本体メインエリア */}
      <div className="relative w-full min-h-[320px]">
        <AnimatePresence mode="wait">
          {viewMode === "days" ? (
            <motion.div
              key="days-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={`${year}-${month}`}
                  custom={direction}
                  variants={calendarVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-7 gap-2 w-full"
                >
                  {days.map((day, i) =>
                    day ? (
                      <div key={`${year}-${month}-${day}`} className="flex justify-center items-center">
                        <DayCell day={day} year={year} month={month} selectedDate={selectedDate} onSelectDate={onSelectDate} />
                      </div>
                    ) : (
                      <div key={`empty-${i}`} className="w-[46px] h-[44px]" />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="months-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={`months-grid-${year}`}
                  custom={direction}
                  variants={calendarVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-3 gap-3 w-full py-2"
                >
                  {MONTHS_LABEL.map((label, i) => (
                    <MonthCell key={label} monthIndex={i} year={year} label={label} isCurrentView={month === i} onSelect={onSelectMonth} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * 内部コンポーネント: ナビゲーションボタン（◀ ▶）
 */
function NavButton({ onClick, label, icon, offset }: { onClick: () => void, label: string, icon: string, offset: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#f8fafc", y: -1 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-100 text-slate-400 bg-white shadow-sm hover:border-blue-100 hover:text-blue-500 transition-colors"
    >
      <span className="text-[10px]" style={{ transform: `translateX(${offset})` }}>{icon}</span>
    </motion.button>
  );
}

/**
 * 内部コンポーネント: アクションボタン（今日、一覧など）
 */
function ActionButton({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: "#f8fafc", y: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-3.5 py-2 text-[10px] font-black text-slate-500 bg-white rounded-2xl border border-slate-200 transition-all hover:border-blue-200 hover:text-blue-600 shadow-sm whitespace-nowrap uppercase tracking-wider"
    >
      {children}
    </motion.button>
  );
}