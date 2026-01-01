"use client";

import React from "react";
import AppHeader from "../../app/AppHeader";

type Props = {
  children: React.ReactNode;
  onOpenCalendar: () => void;
};

export default function MainLayout({ children, onOpenCalendar }: Props) {
  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 antialiased overflow-hidden selection:bg-blue-100">
      <AppHeader onToggleCalendar={onOpenCalendar} />

      <main className="flex-1 p-6 overflow-hidden">
        {/* 最大幅を広げて 2カラムのゆとりを確保 */}
        <div className="w-full max-w-[1600px] mx-auto h-full">
          {children}
        </div>
      </main>
    </div>
  );
}