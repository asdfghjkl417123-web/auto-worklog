import { motion } from "framer-motion";

export type DayCellProps = {
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
}: DayCellProps) {
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
      whileTap={{ 
        scale: 1.2,
        transition: { type: "spring", stiffness: 400, damping: 10 } 
      }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.1 }
      }}
      animate={isToday ? {
        boxShadow: [
          "0 0 6px rgba(59,130,246,0.2)",
          "0 0 12px rgba(59,130,246,0.3)",
          "0 0 6px rgba(59,130,246,0.2)"
        ],
      } : {}}
      transition={{ 
        boxShadow: { repeat: Infinity, duration: 4, ease: "linear" },
        type: "spring",
        stiffness: 300, 
        damping: 28,
        mass: 1 
      }}
      className={`
        relative w-[46px] h-[44px] flex items-center justify-center
        text-sm rounded-xl cursor-pointer 
        border-2 antialiased touch-none
        ${isSelected 
          ? "bg-blue-600 text-white border-blue-600 font-bold shadow-md shadow-blue-200 z-10" 
          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
        }
        ${!isSelected && isSunday ? "text-red-500" : ""}
        ${!isSelected && isSaturday ? "text-blue-500" : ""}
        ${!isSelected && !isSunday && !isSaturday ? "text-slate-700" : ""}
        ${isToday && !isSelected ? "z-10 ring-2 ring-blue-400 ring-offset-2" : ""}
      `}
    >
      <span className="relative z-10">
        {day}
      </span>

      {isToday && (
        <span className={`absolute bottom-1.5 w-1 h-1 rounded-full ${isSelected ? "bg-white" : "bg-blue-500"}`} />
      )}
    </motion.button>
  );
}