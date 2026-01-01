"use client";

import React, { useMemo, useState, useEffect } from "react";
// Timeline.tsx や PlanBlockItem.tsx の冒頭
import { 
  type ActivityBlock,   // 「type」を付ける
  type ProcessedBlock, 
  PX_PER_HOUR, 
  getTopPosition 
} from "./types"; // PlanBlockItemなら ../types

// 分離した子コンポーネントをインポート
import PlanBlockItem from "./items/PlanBlockItem";
import AIBlockItem from "./items/AIBlockItem";
import ActualBlockItem from "./items/ActualBlockItem";

type Props = {
  date: Date;                     // 表示対象の日付
  blocks: ActivityBlock[];        // すべてのアクティビティデータ
  onBlockClick: (block: ActivityBlock | null) => void; // ブロック選択時のハンドラ
  selectedBlockId?: string;       // 現在選択されているブロックのID
};

/**
 * Timeline コンポーネント
 * タイムラインの土台（グリッド）を描画し、予定・AI分析・実績の各ブロックを適切な位置に配置します。
 */
export default function Timeline({ date, blocks, onBlockClick, selectedBlockId }: Props) {
  // 現在時刻のステート（NOWライン表示用）
  const [now, setNow] = useState(new Date());
  
  // 表示モード：compact（初期状態） / detailed（実績ログを詳しく見る状態）
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');
  
  // マウスホバーの状態管理
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLogAreaHovered, setIsLogAreaHovered] = useState(false);

  // 1分ごとに現在時刻を更新
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  /**
   * 1. 表示対象日のブロックのみを抽出
   */
  const dailyBlocks = useMemo(() => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return blocks.filter(b => b.start <= endOfDay && b.end >= startOfDay);
  }, [blocks, date]);

  /**
   * 2. タイムラインの表示範囲（高さ・オフセット）を計算
   * データが存在する時間帯に合わせて、動的に表示領域を調整します。
   */
  const { startTime, timelineOffset, totalHeight } = useMemo(() => {
    const d = new Date(date);
    if (dailyBlocks.length === 0) {
      d.setHours(0, 0, 0, 0);
      return { startTime: d, timelineOffset: 0, totalHeight: 24 * PX_PER_HOUR };
    }
    
    const earliestMs = Math.min(...dailyBlocks.map(b => b.start.getTime()));
    const latestMs = Math.max(...dailyBlocks.map(b => b.end.getTime()));
    
    // データの前後1時間を余白として含める
    const startH = Math.max(0, new Date(earliestMs).getHours() - 1);
    const endH = Math.min(23, new Date(latestMs).getHours() + 1);
    
    const sTime = new Date(date);
    sTime.setHours(startH, 0, 0, 0);
    const offset = startH * PX_PER_HOUR;
    const height = ((endH + 1) * PX_PER_HOUR) - offset;

    return { startTime: sTime, timelineOffset: offset, totalHeight: height };
  }, [dailyBlocks, date]);

  /**
   * 3. 重なり検知ロジック（レーン割り当て）
   * 同じ時間に重なっているブロックを横に並べるための lane 情報を追加します。
   */
  const processedData = useMemo(() => {
    const plans = dailyBlocks.filter(b => b.type !== "actual");
    const actuals = dailyBlocks.filter(b => b.type === "actual");

    return dailyBlocks.map((block): ProcessedBlock => {
      if (block.type === "actual") {
        // 実績ログの重なりをカウント
        const lane = actuals.filter(o => 
          o.id !== block.id && block.start < o.end && block.end > o.start &&
          actuals.indexOf(o) < actuals.indexOf(block)
        ).length;
        return { ...block, lane };
      }
      // 予定・AI分析の重なりをカウント
      const laneOffset = plans.filter(o =>
        o.id !== block.id && block.start < o.end && block.end > o.start &&
        (o.start < block.start || (o.start.getTime() === block.start.getTime() && o.id < block.id))
      ).length;
      return { ...block, laneOffset };
    });
  }, [dailyBlocks]);

  // 選択中のブロックが「予定」タイプかどうかを判定
  const isPlanSelected = useMemo(() => 
    dailyBlocks.find(b => b.id === selectedBlockId)?.type === "plan", 
  [dailyBlocks, selectedBlockId]);

  // 絶対時刻を現在のタイムライン上の相対座標に変換
  const getRelativeTop = (targetDate: Date) => getTopPosition(targetDate) - timelineOffset;

  return (
    <div
      className="relative w-full overflow-hidden cursor-default transition-all duration-700"
      style={{ minHeight: `${totalHeight + 40}px`, paddingTop: '20px' }}
      onClick={() => { setViewMode('compact'); onBlockClick(null); }}
    >
      {/* 背景：時間軸グリッド */}
      <div className="absolute inset-0 pointer-events-none" style={{ top: '20px' }}>
        {Array.from({ length: 26 }).map((_, i) => {
          const relTop = (i * PX_PER_HOUR) - (startTime.getHours() * PX_PER_HOUR);
          if (relTop < -20 || relTop > totalHeight + 20) return null;
          
          let label = `${String(i % 24).padStart(2, '0')}:00`;
          if (i === 24) label = "24:00";

          return (
            <div key={i} className="absolute w-full border-t border-slate-300/50" style={{ top: relTop }}>
              <span className="absolute left-2 -top-3.5 text-[14px] font-black text-slate-500/80 font-mono italic">
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* メイン：各ブロックの描画エリア */}
      <div className="relative h-full ml-16 mr-4 pt-12">
        {processedData.map((block) => {
          const isSelected = selectedBlockId === block.id;
          const isDetailed = viewMode === 'detailed';

          // A. 予定(Plan)
          if (block.type === "plan") {
            return (
              <PlanBlockItem 
                key={block.id} 
                block={block} 
                isSelected={isSelected} 
                isDetailed={isDetailed} 
                onBlockClick={onBlockClick} 
                timelineOffset={timelineOffset} 
              />
            );
          }

          // B. AI分析(reconstructed)
          if (block.type === "reconstructed") {
            return (
              <AIBlockItem 
                key={block.id} 
                block={block} 
                isSelected={isSelected} 
                isDetailed={isDetailed} 
                onBlockClick={onBlockClick} 
                forceBehind={isPlanSelected} 
                timelineOffset={timelineOffset} 
              />
            );
          }

          // C. 実績(actual - 槍)
          return (
            <ActualBlockItem 
              key={block.id}
              block={block}
              isSelected={isSelected}
              isDetailed={isDetailed}
              isHovered={hoveredId === block.id}
              isActive={isDetailed || isLogAreaHovered || isSelected}
              timelineOffset={timelineOffset}
              onMouseEnter={() => { 
                setIsLogAreaHovered(true); 
                if (isDetailed) setHoveredId(block.id); 
              }}
              onMouseLeave={() => { 
                setIsLogAreaHovered(false); 
                setHoveredId(null); 
              }}
              onClick={(e) => { 
                e.stopPropagation(); 
                // 詳細モードなら選択、コンパクトモードなら詳細へ切り替え
                isDetailed ? onBlockClick(block) : setViewMode('detailed'); 
              }}
            />
          );
        })}
      </div>

      {/* 現在時刻 (NOW) ライン */}
      {date.toDateString() === new Date().toDateString() && (
        <div 
          className="absolute left-0 right-0 z-[500] pointer-events-none flex items-center transition-all duration-1000" 
          style={{ top: getRelativeTop(now) }}
        >
          <div className="w-full border-t-2 border-rose-500/40" />
          <div className="absolute left-4 bg-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-lg">
            NOW
          </div>
        </div>
      )}
    </div>
  );
}