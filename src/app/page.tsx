"use client";

import { useState } from "react";

/**
 * 子コンポーネントをインポート
 * パスはプロジェクトの構造に合わせて適宜調整してください
 */
import AppHeader from "../components/layout/AppHeader";
import DetailPanel from "../components/layout/DetailPanel";
import CalendarPanel from "../components/layout/CalendarPanel";

export default function Page() {
  /**
   * カレンダーモーダルの開閉状態
   */
  const [calendarOpen, setCalendarOpen] = useState(false);

  /**
   * 選択された日付（初期値を今日にする場合は new Date() を入れてもOK）
   */
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-100">
      
      {/* アプリヘッダー 
        z-indexを考慮し、メインコンテンツより上に配置
      */}
      <header className="sticky top-0 z-30 w-full">
        <AppHeader onToggleCalendar={() => setCalendarOpen(true)} />
      </header>

      {/* メインコンテンツエリア 
        overflow-hidden で画面全体のスクロールを制御しつつ、
        DetailPanel 内で個別にスクロールさせる構成を想定
      */}
      <main className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
          {/* DetailPanel に選択された日付を渡すことで、
            その日の詳細を表示できるようになります
          */}
          <DetailPanel selectedDate={selectedDate} />
        </div>
      </main>

      {/* カレンダーパネル（モーダル）
        createPortal を使用しているため、DOM構造上の配置場所はここでも問題ありません
      */}
      <CalendarPanel
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setCalendarOpen(false); // 日付を選んだら自動で閉じる
        }}
      />
      
    </div>
  );
}