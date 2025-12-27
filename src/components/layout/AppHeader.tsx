// クライアントコンポーネントとして動作させる指定
"use client";

{/* Propの型定義 */ }
type Props = {
    onToggleCalendar: () => void;
};

{/* コンポーネント本体 */ }
export default function AppHeader({ onToggleCalendar }: Props) {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-100">
            {/* ロゴ：少し文字間を広げてスタイリッシュに */}
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
                Calendar<span className="text-blue-600">App</span>
            </h1>

            {/* ボタン：グラデーションとシャドウで立体感を出す */}
            <button
                onClick={onToggleCalendar}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium 
                            hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5
                            active:scale-95 transition-all duration-200 ease-in-out"
            >
                日付を選択
            </button>
        </header>
    );
}