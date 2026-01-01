"use client";

import React, { useMemo } from "react";
import Timeline from "./Timeline";
import ActivityLogHeader from "./ActivityLogHeader";
import ActivityLogFooter from "./ActivityLogFooter";
import type { ActivityBlock } from "./types";
import { SAMPLE_BLOCKS } from "../../data/sampleBlocks";

type Props = {
  selectedDate: Date;
  selectedBlock: ActivityBlock | null;
  onBlockClick: (block: ActivityBlock) => void;
  onClearSelection: () => void;
  onDateChange: (date: Date) => void;
};

export default function ActivityLogPanel({
  selectedDate,
  selectedBlock,
  onBlockClick,
  onClearSelection,
  onDateChange,
}: Props) {
  const blocks = useMemo(() => SAMPLE_BLOCKS, [selectedDate]);
  const isAnySelected = !!selectedBlock;

  const handleTimelineInteraction = (block: ActivityBlock | null) => {
    if (block) {
      onBlockClick(block);
    } else {
      onClearSelection();
    }
  };

  return (
    <section className="relative flex flex-col h-full max-h-[92vh] overflow-hidden lg:col-span-5 bg-white backdrop-blur-3xl rounded-[40px] border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]">
      
      {/* --- LAYER 1: Floating Header --- */}
      <ActivityLogHeader
        selectedDate={selectedDate}
        isAnySelected={isAnySelected}
        onDateChange={onDateChange}
        onClearSelection={onClearSelection}
      />

      {/* --- LAYER 2: Main Content (Scrollable Area) --- */}
      {/* 背景を bg-slate-50 に変更 */}
      <div className="relative flex-1 overflow-y-auto select-none bg-slate-50 -mt-24 scrollbar-hide">
        
        {/* Decorative background: Dot grid (背景色に合わせて色と透明度を微調整) */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" 
          aria-hidden="true" 
        />

        {/* Timeline Content Wrapper */}
        <div className="relative z-10 min-h-full max-w-5xl px-4 pt-28 pb-32 mx-auto sm:px-10">
          <Timeline
            date={selectedDate}
            blocks={blocks}
            selectedBlockId={selectedBlock?.id}
            onBlockClick={handleTimelineInteraction}
          />
        </div>
      </div>

      {/* --- LAYER 3: Floating Footer --- */}
      <ActivityLogFooter />
      
    </section>
  );
}