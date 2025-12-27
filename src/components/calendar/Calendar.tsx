import { useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import DayCell from "./DayCell";

/**
 * カレンダーコンポーネントのプロパティ型定義
 */
type Props = {
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  direction: 1 | -1;
};

// レイアウト維持のための定数
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

// アニメーションの定義
const calendarVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '30%' : '-30%',
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-30%' : '30%',
    opacity: 0,
    filter: "blur(4px)",
    transition: { duration: 0.2 }
  }),
};

/**
 * メインのカレンダーコンポーネント
 */
export default function Calendar({
  currentMonth,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  direction,
}: Props) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // カレンダーの日付計算をメモ化
  const days = useMemo(() => {
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDayOfWeek).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  }, [year, month]);

  return (
    <div className="flex flex-col items-center w-full max-w-[380px] mx-auto p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
      
      {/* ヘッダー部分：年月と操作ボタン */}
      <div className="w-full flex justify-between items-center h-14 mb-4">
        <div className="flex items-center gap-2">
          <NavButton onClick={onPrevMonth} label="前の月へ" icon="◀" offset="-1px" />
          <button className="px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-500 rounded hover:bg-slate-200 transition-colors">追加1</button>
        </div>

        <h2 className="text-xl font-bold text-slate-800 tracking-tight tabular-nums">
          {year}年 <span className="text-blue-600">{month + 1}月</span>
        </h2>

        <div className="flex items-center gap-2">
          <button className="px-2 py-1 text-[10px] font-bold bg-slate-100 text-slate-500 rounded hover:bg-slate-200 transition-colors">追加2</button>
          <NavButton onClick={onNextMonth} label="次の月へ" icon="▶" offset="1px" />
        </div>
      </div>

      {/* 曜日ラベル */}
      <div className="grid grid-cols-7 gap-2 w-full mb-2">
        {WEEKDAYS.map((d, i) => (
          <div 
            key={d} 
            className={`text-center text-xs font-bold ${
              i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-slate-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* 日付グリッド（アニメーション付き） */}
      <div className="relative w-full overflow-hidden min-h-[300px]">
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
                  <DayCell
                    day={day}
                    year={year}
                    month={month}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                  />
                </div>
              ) : (
                <div key={`empty-${i}`} className="w-[46px] h-[46px]" />
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * ナビゲーションボタン（◀ / ▶）コンポーネント
 */
function NavButton({ 
  onClick, 
  label, 
  icon, 
  offset 
}: { 
  onClick: () => void, 
  label: string, 
  icon: string, 
  offset: string 
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#f8fafc" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 bg-white shadow-sm transition-all hover:border-blue-200"
    >
      <span className="text-xs" style={{ transform: `translateX(${offset})` }}>
        {icon}
      </span>
    </motion.button>
  );
}