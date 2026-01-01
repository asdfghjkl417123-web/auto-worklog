"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { type ActivityBlock, type ProcessedBlock, PX_PER_MIN, getTopPosition } from "../types";

/**
 * カラー定数
 * AI分析ブロックのテーマカラー（ローズ/ピンク系）を一括管理
 */
const PINK_BASE = "244, 63, 94"; // Tailwindの rose-500 相当
const SHADOW_PINK_GLOW = "0 0 25px rgba(244, 63, 94, 0.5)";

type Props = {
  block: ProcessedBlock;      // AIが再構成したアクティビティデータ
  isSelected: boolean;        // 選択状態
  isDetailed: boolean;        // 他の要素（実績ログなど）が詳細表示中か
  onBlockClick: (b: ActivityBlock) => void; // クリックハンドラ
  forceBehind: boolean;       // 予定ブロックが選択された際などに背面に送るフラグ
  timelineOffset: number;     // 表示位置計算用のオフセット
};

/**
 * AIBlockItem (AI分析ブロック)
 * * 散らばったログからAIが推論した「一連の活動」をカード形式で表示します。
 * ✦（キラキラマーク）を冠したデザインが特徴です。
 */
export default function AIBlockItem({
  block,
  isSelected,
  isDetailed,
  onBlockClick,
  forceBehind,
  timelineOffset,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  // --- 座標と時間の計算 ---
  const absoluteTop = getTopPosition(block.start);
  const absoluteEnd = getTopPosition(block.end);
  const top = absoluteTop - timelineOffset;
  
  // 短すぎるブロックでも最低15分分の高さ(PX)を確保して読みやすくする
  const height = Math.max(PX_PER_MIN * 15, absoluteEnd - absoluteTop);
  
  // 活動時間を分単位で算出
  const durationMin = Math.round((block.end.getTime() - block.start.getTime()) / 60000);

  return (
    <motion.div
      layout
      layoutDependency={isSelected}
      onMouseEnter={() => !isDetailed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // 詳細モード（実績ログ確認中など）はクリックを無効化
        if (isDetailed) return;
        e.stopPropagation();
        onBlockClick(block);
      }}
      // --- アニメーション設定 (ロジック維持) ---
      initial={{ opacity: 0, x: "100%" }}
      animate={{
        // 他の要素が詳細表示の時は背景に溶け込むように透明度を下げる
        opacity: forceBehind ? 0.3 : (isDetailed ? 0.2 : 1),
        // 重なりがある場合に右側に少しずらす
        x: ((block.laneOffset || 0) * 12),
        // 選択中 > ホバー中 > 通常 の順で重ね合わせを制御
        zIndex: isSelected ? 400 : (forceBehind ? 5 : (isHovered ? 400 : 350)),
        scale: isSelected ? 1.01 : (isHovered ? 1.015 : 1),
        y: isSelected ? -1 : (isHovered ? -2 : 0),
        
        // 状態に応じた動的なカラー設定
        backgroundColor: isSelected
          ? `rgba(${PINK_BASE}, 0.25)`
          : (isHovered ? `rgba(${PINK_BASE}, 0.15)` : `rgba(${PINK_BASE}, 0.08)`),
        boxShadow: (isSelected || isHovered) ? SHADOW_PINK_GLOW : "0 0 0px rgba(0,0,0,0)",
        borderColor: isSelected
          ? `rgba(${PINK_BASE}, 0.8)`
          : (isHovered ? `rgba(${PINK_BASE}, 0.4)` : `rgba(${PINK_BASE}, 0.2)`),
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 20,
        delay: 0.1, // 画面表示時に少し遅れて現れることでAIの分析感を演出
      }}
      className="absolute border-[1.5px] rounded-2xl overflow-hidden backdrop-blur-md"
      style={{
        top,
        height,
        left: '55%', // タイムラインの右半分に配置
        width: 'calc(45% - 8px)',
        borderLeft: `5px solid rgb(${PINK_BASE})`, // 左端にアクセントライン
        pointerEvents: isDetailed ? "none" : "auto",
      }}
    >
      {/* ガラスのような光沢感を与えるグラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
      
      {/* コンテンツエリア */}
      <div className="px-5 py-3 flex flex-col justify-center h-full relative z-10">
        <span className={`text-[13.5px] font-bold truncate tracking-tight ${
          isSelected ? "text-rose-900" : "text-rose-950/90"
        }`}>
          ✦ {block.title}
        </span>
        
        {/* 詳細モードでない、かつ十分な高さがある場合のみバッジを表示 */}
        {height > 42 && (
          <div className="flex items-center mt-1.5 gap-2 text-rose-600">
            <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded border bg-white/40 border-rose-500/10">
              {durationMin}m
            </span>
            <span className="text-[8px] font-black tracking-wider uppercase opacity-60">
              AI Analyzed
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}