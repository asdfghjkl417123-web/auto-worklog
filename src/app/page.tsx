"use client";

import { useState, useCallback } from "react";
import MainLayout from "../components/layout/MainLayout";
import DetailPanel from "../components/layout/DetailPanel";
import CalendarPanel from "../components/calendar/CalendarPanel";
import ActivityLogPanel from "../components/timeline/ActivityLogPanel";
import FocusChartPanel from "../components/layout/FocusChartPanel";
import type { ActivityBlock } from "../components/timeline/types";

export default function Page() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedBlock, setSelectedBlock] = useState<ActivityBlock | null>(null);

  /**
   * 日付選択時のハンドラ
   * DateNavigatorからもCalendarPanelからもこれを使います
   */
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setSelectedBlock(null); // 日付が変わったら選択解除
  }, []);

  const handleBlockClick = useCallback((block: ActivityBlock) => {
    setSelectedBlock((prev) => (prev?.id === block.id ? null : block));
  }, []);

  const clearBlockSelection = useCallback(() => {
    setSelectedBlock(null);
  }, []);

  return (
    <MainLayout onOpenCalendar={() => setIsCalendarOpen(true)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-140px)] overflow-hidden p-2">
        
        {/* 左側：分析・詳細エリア (7/12) */}
        <aside className="lg:col-span-7 flex flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar min-h-0">
          <DetailPanel 
            selectedDate={selectedDate} 
            selectedBlock={selectedBlock} 
          />
          <FocusChartPanel />
        </aside>

        {/* 右側：ログエリア (5/12) */}
        {/* ActivityLogPanel 内で DateNavigator を使うよう、onDateChange を追加 */}
        <ActivityLogPanel 
          selectedDate={selectedDate}
          selectedBlock={selectedBlock}
          onBlockClick={handleBlockClick}
          onClearSelection={clearBlockSelection}
          onDateChange={handleDateSelect} 
        />
      </div>

      {/* モーダル形式のカレンダー（必要に応じて併用） */}
      <CalendarPanel
        open={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
    </MainLayout>
  );
}