import { motion } from "framer-motion";

type Props = {
  day: number;
  year: number;
  month: number;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

export default function DayCell({
  day,
  year,
  month,
  selectedDate,
  onSelectDate,
}: Props) {
  const date = new Date(year, month, day);
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  const isSelected =
    selectedDate?.getFullYear() === year &&
    selectedDate?.getMonth() === month &&
    selectedDate?.getDate() === day;

  const today = new Date();
  const isToday =
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <motion.button
      onClick={() => onSelectDate(date)}
      initial={false}
      // ホバー・タップ時のアニメーション（Tailwindクラスと併用）
      whileTap={{ scale: 0.92 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2 }
      }}
      // 今日マークの光るアニメーション
      animate={isToday ? {
        boxShadow: [
          "0 0 0px rgba(59,130,246,0)",
          "0 0 12px rgba(59,130,246,0.4)",
          "0 0 0px rgba(59,130,246,0)"
        ],
      } : {}}
      transition={{ 
        boxShadow: { repeat: Infinity, duration: 2 },
        type: "spring", stiffness: 400, damping: 25 
      }}
      
      // Tailwind CSS v4 でのスタイリング
      className={`
        relative w-[46px] h-[44px] flex items-center justify-center
        text-sm rounded-xl cursor-pointer transition-all duration-200
        border-2 antialiased touch-none
        ${isSelected 
          ? "bg-blue-600 text-white border-blue-600 font-bold shadow-md shadow-blue-200 z-10" 
          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
        }
        ${!isSelected && isSunday ? "text-red-500" : ""}
        ${!isSelected && isSaturday ? "text-blue-500" : ""}
        ${!isSelected && !isSunday && !isSaturday ? "text-slate-700" : ""}
        ${isToday && !isSelected ? "ring-2 ring-blue-400 ring-offset-2" : ""}
      `}
    >
      <span className="relative z-10">
        {day}
      </span>

      {/* 今日の場合の下ドット（オプション：数字の横や下に小さなポッチを置くデザイン） */}
      {isToday && (
        <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-500"}`} />
      )}
    </motion.button>
  );
}