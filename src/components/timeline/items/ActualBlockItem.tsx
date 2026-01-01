"use client";

import React from "react";
import { motion } from "framer-motion";
import { type ActivityBlock, type ProcessedBlock, getTopPosition } from "../types";
import { getAppIconUrl, getAppColor } from "../../../lib/appUtils";

/**
 * 実績ログのホバー時に表示される詳細ラベル
 */
const FloatingLabel = ({ title, meta, visible }: { title: string; meta?: string; visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -10, scale: 0.95 }}
    animate={visible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -5, scale: 0.95 }}
    className="absolute left-14 top-0 z-[400] pointer-events-none whitespace-nowrap"
  >
    <div className="bg-slate-900/90 backdrop-blur-md text-white shadow-2xl rounded-2xl px-4 py-2 border border-white/10">
      <div className="text-[12px] font-bold tracking-tight">{title}</div>
      {meta && <div className="text-[10px] text-slate-400 font-medium mt-0.5">{meta}</div>}
    </div>
  </motion.div>
);

/**
 * 各アクティビティのアイコンを表示する円形コンポーネント
 */
const AppIcon = ({ title, isSelected, isMuted }: { title: string; isSelected: boolean; isMuted: boolean }) => {
  const iconUrl = getAppIconUrl(title);
  const appColor = getAppColor(title);
  
  return (
    <motion.div
      animate={{
        opacity: isMuted ? 0.3 : 1,
        scale: isSelected ? 1.15 : 1,
      }}
      className={`relative w-11 h-11 rounded-[16px] flex items-center justify-center transition-all duration-300 z-50 overflow-hidden bg-white shadow-sm border-2 ${
        isSelected ? "border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "border-slate-100"
      }`}
    >
      <div className={`absolute inset-0 flex items-center justify-center text-[14px] font-black text-white uppercase ${appColor} opacity-10`}>
        {title.charAt(0)}
      </div>
      {iconUrl && <img src={iconUrl} className="w-full h-full p-2.5 object-contain z-10 relative bg-white" alt="" />}
    </motion.div>
  );
};

type Props = {
  block: ProcessedBlock;
  isSelected: boolean;
  isDetailed: boolean;
  isHovered: boolean;
  isActive: boolean;
  timelineOffset: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
};

/**
 * ActualBlockItem (実績ログ・槍コンポーネント)
 */
export default function ActualBlockItem({
  block,
  isSelected,
  isDetailed,
  isHovered,
  isActive,
  timelineOffset,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: Props) {
  const top = getTopPosition(block.start) - timelineOffset;
  const height = getTopPosition(block.end) - getTopPosition(block.start);
  
  // レーン移動の計算
  const laneOffset = isDetailed ? (block.lane || 0) * 52 : -16;

  return (
    <motion.div
      initial={{ opacity: 0, left: "-32px" }} 
      animate={{ 
        opacity: isActive ? 1 : 0.4, 
        left: `${laneOffset}px`,
        zIndex: isSelected || (isDetailed && isHovered) ? 450 : (isActive ? 410 : 120),
      }}
      transition={{
        left: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="absolute flex flex-col items-center pointer-events-auto group"
      style={{ top, height, width: '44px' }}
    >
      {/* 上部アイコンエリア */}
      <div className="sticky top-0 h-0 flex justify-center">
        <div className="relative -top-5">
          <AppIcon title={block.title} isSelected={isSelected} isMuted={!isActive} />
          {isDetailed && (
            <FloatingLabel 
              title={block.title} 
              meta={block.meta} 
              visible={isHovered} 
            />
          )}
        </div>
      </div>

      {/* 垂直の「槍」ライン (貫通モーション付き) */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: "100%", 
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1 // アイコン出現の瞬間に合わせて開始
        }}
        className={`w-1.5 rounded-full origin-top transition-colors duration-500 ${
          isActive 
            ? (isSelected || isHovered 
                ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                : "bg-emerald-400/60"
              ) 
            : "bg-emerald-400/40"
        }`} 
      />
    </motion.div>
  );
}