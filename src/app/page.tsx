"use client";

import { useState, useCallback } from "react";

/**
 * 子コンポーネント
 * プロジェクトの構造に合わせてパスを適宜調整してください
 */
import AppHeader from "../components/layout/AppHeader";
import DetailPanel from "../components/layout/DetailPanel";
import CalendarPanel from "../components/layout/CalendarPanel";

export default function Page() {
  /**
   * カレンダーモーダルの開閉状態
   */
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /**
   * 選択された日付
   * 初期値を「今日」に設定することで、DetailPanelが最初からデータを表示できます
   */
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /**
   * ハンドラーのメモ化
   * 不要な再レンダリングを防ぎ、アニメーションの滑らかさを維持します
   */
  const openCalendar = useCallback(() => setIsCalendarOpen(true), []);
  const closeCalendar = useCallback(() => setIsCalendarOpen(false), []);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    // CalendarPanel 側で 200ms の遅延実行を行っているため、
    // ここで即座に閉じるとアニメーションが途切れる可能性があります。
    // そのため、パネルを閉じる制御は CalendarPanel 側の onClose に任せるのがスムーズです。
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100">
      
      {/* アプリヘッダー
          z-indexはモーダル(9999)より低く、コンテンツより高い位置に設定
      */}
      <header className="sticky top-0 z-30 w-full">
        <AppHeader onToggleCalendar={openCalendar} />
      </header>

      {/* メインコンテンツエリア 
          画面高さいっぱいに広がり、内部でスクロールを制御する構成
      */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
          
          {/* 詳細パネル 
              選択された日付に基づいた情報を表示
          */}
          <DetailPanel selectedDate={selectedDate} />
          
        </div>
      </main>

      {/* カレンダーパネル（モーダル）
          createPortalにより、DOM上は body 直下にレンダリングされます
      */}
      <CalendarPanel
        open={isCalendarOpen}
        onClose={closeCalendar}
        selectedDate={selectedDate}
        onSelectDate={handleDateSelect}
      />
      
    </div>
  );
}