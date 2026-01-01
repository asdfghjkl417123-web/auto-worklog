const LOCAL_ICONS: Record<string, string> = {
  "excel.exe": "/icons/apps/excel.png", "excel": "/icons/apps/excel.png",
  "winword.exe": "/icons/apps/word.png", "word": "/icons/apps/word.png",
  "powerpnt.exe": "/icons/apps/powerpoint.png", "powerpoint": "/icons/apps/powerpoint.png",
  "onenote.exe": "/icons/apps/onenote.png", "onenote": "/icons/apps/onenote.png",
  "outlook.exe": "/icons/apps/outlook.png", "outlook": "/icons/apps/outlook.png",
  "teams.exe": "/icons/apps/teams.png", "teams": "/icons/apps/teams.png",
  "chrome.exe": "/icons/apps/chrome.png", "chrome": "/icons/apps/chrome.png",
  "msedge.exe": "/icons/apps/edge.png", "edge": "/icons/apps/edge.png",
  "firefox.exe": "/icons/apps/firefox.png", "firefox": "/icons/apps/firefox.png",
  "code.exe": "/icons/apps/vscode.png", "vscode": "/icons/apps/vscode.png",
  "slack.exe": "/icons/apps/slack.png", "slack": "/icons/apps/slack.png",
  "notion.exe": "/icons/apps/notion.png", "notion": "/icons/apps/notion.png",
  "zoom.exe": "/icons/apps/zoom.png", "zoom": "/icons/apps/zoom.png",
  "eclipse.exe": "/icons/apps/eclipse_94656.png", "eclipse": "/icons/apps/eclipse_94656.png",
};

/**
 * クリーンなアプリ名を取得（自動検索のドメイン推測に使用）
 */
const getCleanName = (appName: string) => 
  appName.toLowerCase().split(/[\\/]/).pop()?.replace(/\s+/g, '').replace('.exe', '') || "";

/**
 * 枠線のスタイルを一括管理
 * 統一感を出すためにシンプルなグレーのボーダーに固定
 */
export const getAppBorderStyle = (): string => {
  return "border-slate-200/60";
};

/**
 * アイコンURLの取得（ローカル優先 ＞ なければ自動検索）
 */
export const getAppIconUrl = (appName: string): string | null => {
  if (!appName) return null;
  const cleanNameWithExe = appName.toLowerCase().split(/[\\/]/).pop()?.replace(/\s+/g, '') || "";
  
  // A. ローカルにあるか確認
  if (LOCAL_ICONS[cleanNameWithExe]) return LOCAL_ICONS[cleanNameWithExe];

  // B. なければ Google Favicon API でドメインとして検索
  const name = getCleanName(appName);
  return `https://www.google.com/s2/favicons?domain=${name}.com&sz=128`;
};

/**
 * 画像がない、または読み込み失敗時のフォールバック背景色
 */
export const getAppColor = (appName: string): string => {
  if (!appName) return "bg-slate-400";
  const colors = ["bg-rose-400", "bg-orange-400", "bg-amber-400", "bg-emerald-400", "bg-teal-400", "bg-sky-400", "bg-indigo-400", "bg-purple-400"];
  let hash = 0;
  for (let i = 0; i < appName.length; i++) hash = appName.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};