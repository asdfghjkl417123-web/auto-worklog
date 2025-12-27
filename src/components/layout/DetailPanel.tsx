// DetailPanel.tsx

type Props = {
  selectedDate: Date | null;
};

export default function DetailPanel({ selectedDate }: Props) {
  return (
    <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full overflow-y-auto">
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        {selectedDate 
          ? `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日の詳細`
          : "日付を選択してください"}
      </h3>
      
      {/* ここに詳細コンテンツを書いていく */}
      <div className="text-slate-500 text-sm">
        ここに選択した日のログや予定が表示されます。
      </div>
    </div>
  );
}