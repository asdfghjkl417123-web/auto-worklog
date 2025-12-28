import { motion } from "framer-motion";

export type MonthCellProps = {
    monthIndex: number;
    year: number;
    label: string;
    isCurrentView: boolean;
    onSelect: (index: number) => void;
};

export default function MonthCell({
    monthIndex,
    year,
    label,
    isCurrentView,
    onSelect,
}: MonthCellProps) {
    const today = new Date();
    const isThisMonth =
        today.getMonth() === monthIndex && today.getFullYear() === year;

    return (
        <motion.button
            onClick={() => onSelect(monthIndex)}
            initial={false}
            // DayCellと一貫性を持たせつつ、大きなボタンに適したスケール感
            whileTap={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileHover={{
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            // 今月の呼吸エフェクトを少し強調
            animate={isThisMonth && !isCurrentView ? {
                boxShadow: [
                    "0 0 4px rgba(59,130,246,0.1)",
                    "0 0 16px rgba(59,130,246,0.3)",
                    "0 0 4px rgba(59,130,246,0.1)"
                ],
            } : {
                boxShadow: "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{
                boxShadow: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                }
            }}
            className={`
        relative h-16 flex items-center justify-center
        text-base font-bold rounded-2xl border-2 antialiased touch-none
        ${isCurrentView
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 z-10"
                    : "bg-white text-slate-700 border-transparent hover:bg-slate-50 hover:border-slate-200"
                }
        ${isThisMonth && !isCurrentView ? "ring-2 ring-blue-400 ring-offset-2" : ""}
      `}
        >
            <span className="relative z-10 tracking-tight">
                {label}
            </span>

            {/* 今月を示すドット：DayCellより少しだけ大きくしてバランス調整 */}
            {isThisMonth && (
                <span className={`
          absolute bottom-2.5 w-1.5 h-1.5 rounded-full 
          ${isCurrentView ? "bg-white" : "bg-blue-500"}
        `} />
            )}
        </motion.button>
    );
}