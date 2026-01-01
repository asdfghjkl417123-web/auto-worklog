"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { type ActivityBlock, type ProcessedBlock, PX_PER_MIN, getTopPosition } from "../types";
/**
 * カラー定数
 * 予定ブロックのテーマカラー（ブルー系）を一括管理
 */
const BLUE_BASE = "59, 130, 246"; // Tailwindの blue-500 相当
const SHADOW_BLUE_GLOW = "0 0 25px rgba(59, 130, 246, 0.5)";

type Props = {
  block: ProcessedBlock;      // 予定データ本体
  isSelected: boolean;        // 選択状態
  isDetailed: boolean;        // 詳細表示モード（実績ログ確認中など）か
  onBlockClick: (b: ActivityBlock) => void; // クリック時のコールバック
  timelineOffset: number;     // 表示位置計算用のオフセット
};

/**
 * PlanBlockItem (予定ブロック)
 * * ユーザーが事前に入力した「予定」をカード形式で表示します。
 * タイムラインの左側に配置され、背後でスケジュールをガイドする役割を持ちます。
 */
export default function PlanBlockItem({
  block,
  isSelected,
  isDetailed,
  onBlockClick,
  timelineOffset,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // --- 座標と時間の計算 ---
  const absoluteTop = getTopPosition(block.start);
  const absoluteEnd = getTopPosition(block.end);
  const top = absoluteTop - timelineOffset;
  
  // 視認性確保のため、短い予定でも最低15分分の高さを確保
  const height = Math.max(PX_PER_MIN * 15, absoluteEnd - absoluteTop);
  
  // 予定の継続時間を算出
  const durationMin = Math.round((block.end.getTime() - block.start.getTime()) / 60000);

  return (
    <motion.div
      layout
      layoutDependency={isSelected}
      role="button"
      onMouseEnter={() => !isDetailed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // 詳細モード中は実績ログの操作を優先するため、予定のクリックを無効化
        if (isDetailed) return;
        e.stopPropagation();
        onBlockClick(block);
      }}
      // --- アニメーション・スタイル設定 (ロジック維持) ---
      initial={{ 
        opacity: 0, 
        filter: "blur(12px)", 
        scale: 0.98, 
        x: 30 + ((block.laneOffset || 0) * 28) 
      }}
      animate={{
        // 実績確認（詳細モード）中は、邪魔にならないよう透明度を下げる
        opacity: isDetailed ? 0.4 : 1,
        filter: isDetailed ? "blur(2px)" : "blur(0px)",
        // 予定が重なった場合、右に少しずつずらして表示 (laneOffset)
        x: 30 + ((block.laneOffset || 0) * 28),
        // zIndexはAIブロック(350〜)より低い値に設定し、基本は背面に配置
        zIndex: isSelected ? 200 : 10,
        scale: isSelected ? 1.01 : (isHovered ? 1.015 : 1),
        y: isSelected ? -1 : (isHovered ? -2 : 0),
        
        // 状態に応じた動的なカラー設定
        backgroundColor: isSelected
          ? `rgba(${BLUE_BASE}, 0.25)`
          : (isHovered ? `rgba(${BLUE_BASE}, 0.15)` : `rgba(${BLUE_BASE}, 0.08)`),
        boxShadow: (isSelected || isHovered) ? SHADOW_BLUE_GLOW : "0 0 0px rgba(0,0,0,0)",
        borderColor: isSelected
          ? `rgba(${BLUE_BASE}, 0.8)`
          : (isHovered ? `rgba(${BLUE_BASE}, 0.4)` : `rgba(${BLUE_BASE}, 0.2)`),
      }}
      transition={{
        opacity: { duration: 0.3 },
        filter: { duration: 0.3 },
        scale: { type: "spring", stiffness: 300, damping: 25 },
        x: { type: "spring", stiffness: 500, damping: 30 },
        y: { type: "spring", stiffness: 500, damping: 30 },
      }}
      className="absolute border-[1.5px] rounded-2xl overflow-hidden outline-none backdrop-blur-md"
      style={{
        top,
        height,
        width: '74%', // AIブロック（右側）と重なりつつも左端を確保
        borderLeft: `5px solid rgb(${BLUE_BASE})`, // 左端にアクセントライン
        pointerEvents: isDetailed ? "none" : "auto",
      }}
    >
      {/* 表面に光沢感を出すオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
      
      {/* テキストコンテンツ */}
      <div className="px-5 py-3 flex flex-col justify-center h-full relative z-10">
        <span className={`text-[13.5px] font-bold truncate tracking-tight transition-colors ${
          isSelected ? "text-blue-900" : "text-blue-950/90"
        }`}>
          {block.title}
        </span>
        
        {/* 十分な高さがある場合のみ、時間バッジを表示 */}
        {height > 42 && (
          <div className="flex items-center mt-1.5 gap-2 text-blue-600">
            <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded border bg-white/40 border-blue-500/10">
              {durationMin}m
            </span>
            <span className="text-[8px] font-black tracking-wider uppercase opacity-60">
              Plan
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}