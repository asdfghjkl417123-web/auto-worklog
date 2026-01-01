// src/data/sampleBlocks.ts
import type { ActivityBlock } from "../components/timeline/types";

export const SAMPLE_BLOCKS: ActivityBlock[] = [
  // --- 09:00 - 10:30: 朝からマルチブッキング ---
  { id: "p1", type: "plan", start: new Date("2025-12-30T09:00"), end: new Date("2025-12-30T10:00"), title: "全社朝礼" },
  { id: "p1_2", type: "plan", start: new Date("2025-12-30T09:15"), end: new Date("2025-12-30T09:45"), title: "チーム進捗確認" },
  { id: "p1_3", type: "plan", start: new Date("2025-12-30T09:30"), end: new Date("2025-12-30T10:30"), title: "新機能要件ヒアリング" },

  // AI分析: 朝の会議ラッシュ
  { id: "r1", type: "reconstructed", start: new Date("2025-12-30T09:00"), end: new Date("2025-12-30T10:30"), title: "コンテキスト・スイッチ：同期コスト", meta: "3つの会議とチャットが並行。実質的な作業時間は極めて低いです。" },

  { id: "a1", type: "actual", start: new Date("2025-12-30T09:00"), end: new Date("2025-12-30T10:30"), title: "Teams.exe", meta: "3つの会議をザッピング" },
  { id: "a2", type: "actual", start: new Date("2025-12-30T09:05"), end: new Date("2025-12-30T09:40"), title: "Outlook.exe", meta: "急ぎの承認依頼対応" },
  { id: "a3", type: "actual", start: new Date("2025-12-30T09:10"), end: new Date("2025-12-30T10:00"), title: "Slack.exe", meta: "各所からのメンション" },
  { id: "a4", type: "actual", start: new Date("2025-12-30T09:20"), end: new Date("2025-12-30T09:50"), title: "Chrome.exe", meta: "カレンダー調整" },
  { id: "a5", type: "actual", start: new Date("2025-12-30T09:45"), end: new Date("2025-12-30T10:45"), title: "Notion.exe", meta: "議事録爆速メモ" },

  // --- 11:00 - 13:00: 設計 ＆ 緊急バグ修正 ---
  { id: "p2", type: "plan", start: new Date("2025-12-30T11:00"), end: new Date("2025-12-30T13:00"), title: "APIスキーマ詳細設計" },
  { id: "p2_sub", type: "plan", start: new Date("2025-12-30T11:30"), end: new Date("2025-12-30T12:00"), title: "【緊急】本番データパッチ承認" },

  // AI分析: 調査とパッチ対応
  { id: "r2", type: "reconstructed", start: new Date("2025-12-30T11:15"), end: new Date("2025-12-30T12:45"), title: "インシデント・レスポンス", meta: "DB調査とブラウザ参照の同期から、緊急パッチの影響範囲特定を検知。" },

  { id: "a6", type: "actual", start: new Date("2025-12-30T11:00"), end: new Date("2025-12-30T13:30"), title: "Figma.exe", meta: "UIプロトタイプ確認" },
  { id: "a7", type: "actual", start: new Date("2025-12-30T11:10"), end: new Date("2025-12-30T12:30"), title: "DBeaver.exe", meta: "本番DB調査" },
  { id: "a8", type: "actual", start: new Date("2025-12-30T11:20"), end: new Date("2025-12-30T12:45"), title: "Chrome.exe", meta: "Swaggerドキュメント参照" },
  { id: "a9", type: "actual", start: new Date("2025-12-30T11:40"), end: new Date("2025-12-30T12:20"), title: "Excel.exe", meta: "データ移行リスト作成" },
  { id: "a10", type: "actual", start: new Date("2025-12-30T12:00"), end: new Date("2025-12-30T13:00"), title: "Postman.exe", meta: "APIエンドポイント検証" },

  // --- 14:00 - 17:00: 実装・レビュー・定例 ---
  { id: "p3", type: "plan", start: new Date("2025-12-30T14:00"), end: new Date("2025-12-30T16:00"), title: "バックエンド実装" },
  { id: "p3_2", type: "plan", start: new Date("2025-12-30T15:00"), end: new Date("2025-12-30T15:30"), title: "他チーム合同コードレビュー" },
  { id: "p3_3", type: "plan", start: new Date("2025-12-30T15:30"), end: new Date("2025-12-30T17:00"), title: "週次定例ステータス報告" },
  { id: "p3_4", type: "plan", start: new Date("2025-12-30T16:30"), end: new Date("2025-12-30T17:30"), title: "1on1 ミーティング" },

  // AI分析: 高集中モード
  { id: "r3", type: "reconstructed", start: new Date("2025-12-30T14:00"), end: new Date("2025-12-30T16:30"), title: "フロー状態：機能実装", meta: "VSCodeの占有率が高く、極めて高い生産性を記録。会議中も裏でコーディングを継続。" },

  { id: "a11", type: "actual", start: new Date("2025-12-30T14:00"), end: new Date("2025-12-30T18:00"), title: "Code.exe", meta: "ひたすらコーディング" },
  { id: "a12", type: "actual", start: new Date("2025-12-30T14:10"), end: new Date("2025-12-30T17:30"), title: "WindowsTerminal.exe", meta: "Docker logs -f & hot reload" },
  { id: "a13", type: "actual", start: new Date("2025-12-30T14:30"), end: new Date("2025-12-30T17:00"), title: "Chrome.exe", meta: "GitHub PR & Stack Overflow" },
  { id: "a14", type: "actual", start: new Date("2025-12-30T15:00"), end: new Date("2025-12-30T17:30"), title: "Teams.exe", meta: "MTGに出たり入ったり" },
  { id: "a15", type: "actual", start: new Date("2025-12-30T15:15"), end: new Date("2025-12-30T16:45"), title: "Slack.exe", meta: "並行してレビューコメント回答" },
  { id: "a16", type: "actual", start: new Date("2025-12-30T15:45"), end: new Date("2025-12-30T16:15"), title: "Spotify.exe", meta: "集中用BGM" },
  { id: "a17", type: "actual", start: new Date("2025-12-30T16:00"), end: new Date("2025-12-30T17:15"), title: "Docker.exe", meta: "コンテナ再構築" },

  // --- 18:00 - 20:00: リリース作業 ---
  { id: "p4", type: "plan", start: new Date("2025-12-30T18:00"), end: new Date("2025-12-30T19:00"), title: "ステージングデプロイ" },
  { id: "p4_2", type: "plan", start: new Date("2025-12-30T18:30"), end: new Date("2025-12-30T20:00"), title: "QAチーム合同テスト" },

  // AI分析: デプロイ実況
  { id: "r4", type: "reconstructed", start: new Date("2025-12-30T18:15"), end: new Date("2025-12-30T20:30"), title: "リリース・監視フェーズ", meta: "TerminalとSlackの稼働率から、パイプライン監視とQAとの連携を検知。" },

  { id: "a18", type: "actual", start: new Date("2025-12-30T18:00"), end: new Date("2025-12-30T20:30"), title: "Chrome.exe", meta: "CircleCI & AWS Console" },
  { id: "a19", type: "actual", start: new Date("2025-12-30T18:10"), end: new Date("2025-12-30T19:40"), title: "Slack.exe", meta: "デプロイ実況" },
  { id: "a20", type: "actual", start: new Date("2025-12-30T18:20"), end: new Date("2025-12-30T20:00"), title: "WindowsTerminal.exe", meta: "デプロイスクリプト監視" },
  { id: "a21", type: "actual", start: new Date("2025-12-30T18:45"), end: new Date("2025-12-30T20:15"), title: "Postman.exe", meta: "回帰テスト実行" },
  { id: "a22", type: "actual", start: new Date("2025-12-30T19:10"), end: new Date("2025-12-30T20:40"), title: "Code.exe", meta: "微修正とコミット" },

  // --- 21:00 - 23:00: 深夜作業 ---
  // AI分析: リファクタリング
  { id: "r5", type: "reconstructed", start: new Date("2025-12-30T21:00"), end: new Date("2025-12-30T22:30"), title: "セルフ・メンテナンス", meta: "日中の負債を解消するリファクタリング。自律的な品質向上時間。" },

  { id: "a23", type: "actual", start: new Date("2025-12-30T21:00"), end: new Date("2025-12-30T22:30"), title: "Code.exe", meta: "明日のためのリファクタリング" },
  { id: "a24", type: "actual", start: new Date("2025-12-30T21:15"), end: new Date("2025-12-30T22:00"), title: "Chrome.exe", meta: "技術ブログ読み漁り" },
  { id: "a25", type: "actual", start: new Date("2025-12-30T22:30"), end: new Date("2025-12-30T23:00"), title: "Slack.exe", meta: "最後に1通送ってログアウト" },

 // src/data/sampleBlocks.ts
// --- 12月31日(水): 年越し保守とラストスパート ---
  // --- 09:00 - 11:30: 納め作業 ＆ 駆け込み依頼 ---
  { id: "31p1", type: "plan", start: new Date("2025-12-31T09:00"), end: new Date("2025-12-31T10:00"), title: "年末最終同期MTG" },
  { id: "31p1_2", type: "plan", start: new Date("2025-12-31T09:15"), end: new Date("2025-12-31T10:30"), title: "2026年インフラ予算最終確認" },
  { id: "31p1_3", type: "plan", start: new Date("2025-12-31T10:00"), end: new Date("2025-12-31T11:30"), title: "【緊急】年末年始オンコール体制の最終調整" },

  // AI分析: リソース調整
  { id: "31r1", type: "reconstructed", start: new Date("2025-12-31T09:00"), end: new Date("2025-12-31T11:00"), title: "防御的プランニング：可用性確保", meta: "オンコールシフトとバックアップ計画の重複確認。リスク回避に全リソースを割いています。" },

  { id: "31a1", type: "actual", start: new Date("2025-12-31T09:00"), end: new Date("2025-12-31T11:00"), title: "Teams.exe", meta: "インフラチームと密連携" },
  { id: "31a2", type: "actual", start: new Date("2025-12-31T09:10"), end: new Date("2025-12-31T10:20"), title: "Excel.exe", meta: "オンコール表の最終更新" },
  { id: "31a3", type: "actual", start: new Date("2025-12-31T09:30"), end: new Date("2025-12-31T11:45"), title: "Slack.exe", meta: "各部署からの挨拶と最終調整" },
  { id: "31a4", type: "actual", start: new Date("2025-12-31T10:00"), end: new Date("2025-12-31T12:00"), title: "Chrome.exe", meta: "AWS / Google Cloud Console" },

  // --- 13:00 - 16:30: 執念のバグ掃討 ＆ 自動化 ---
  { id: "31p2", type: "plan", start: new Date("2025-12-31T13:00"), end: new Date("2025-12-31T16:00"), title: "技術債務の強制清算：大掃除" },
  { id: "31p2_sub", type: "plan", start: new Date("2025-12-31T14:00"), end: new Date("2025-12-31T15:30"), title: "1月1日0時予約投稿機能の最終テスト" },

  // AI分析: 攻撃的メンテナンス
  { id: "31r2", type: "reconstructed", start: new Date("2025-12-31T13:15"), end: new Date("2025-12-31T16:45"), title: "大掃除：デッドコード削除", meta: "古いコンポーネントの削除と、2026年に向けた依存ライブラリの更新を同時実行。" },

  { id: "31a6", type: "actual", start: new Date("2025-12-31T13:00"), end: new Date("2025-12-31T17:00"), title: "Code.exe", meta: "ひたすらリファクタリング" },
  { id: "31a7", type: "actual", start: new Date("2025-12-31T13:20"), end: new Date("2025-12-31T16:00"), title: "WindowsTerminal.exe", meta: "npm prune && rm -rf node_modules" },
  { id: "31a8", type: "actual", start: new Date("2025-12-31T14:00"), end: new Date("2025-12-31T16:30"), title: "Chrome.exe", meta: "Zenn / Qiita の年末まとめ読み" },
  { id: "31a9", type: "actual", start: new Date("2025-12-31T14:30"), end: new Date("2025-12-31T15:30"), title: "Postman.exe", meta: "予約APIの疎通確認" },
  { id: "31a10", type: "actual", start: new Date("2025-12-31T15:00"), end: new Date("2025-12-31T17:00"), title: "Spotify.exe", meta: "紅白歌合戦プレイリスト" },

  // --- 18:00 - 21:00: 年越しデプロイ ＆ 監視 ---
  { id: "31p3", type: "plan", start: new Date("2025-12-31T18:00"), end: new Date("2025-12-31T20:00"), title: "お正月キャンペーン・フラグON" },
  { id: "31p3_2", type: "plan", start: new Date("2025-12-31T19:00"), end: new Date("2025-12-31T21:00"), title: "年越し前ラスト・ヘルスチェック" },

  // AI分析: 監視フェーズ
  { id: "31r3", type: "reconstructed", start: new Date("2025-12-31T18:15"), end: new Date("2025-12-31T21:30"), title: "リリース・ウォッチ：トラフィック急増", meta: "特定のアプリの稼働率から、年越し特有のアクセス集中に向けたスケーリングを検知。" },

  { id: "31a11", type: "actual", start: new Date("2025-12-31T18:00"), end: new Date("2025-12-31T22:00"), title: "Chrome.exe", meta: "Datadog / New Relic 監視" },
  { id: "31a12", type: "actual", start: new Date("2025-12-31T18:10"), end: new Date("2025-12-31T21:00"), title: "Slack.exe", meta: "デプロイ実況（実家から）" },
  { id: "31a13", type: "actual", start: new Date("2025-12-31T18:30"), end: new Date("2025-12-31T20:30"), title: "WindowsTerminal.exe", meta: "kubectl get pods -w" },
  { id: "31a14", type: "actual", start: new Date("2025-12-31T20:00"), end: new Date("2025-12-31T21:30"), title: "Code.exe", meta: "最終動作確認用の微修正" },

  // --- 22:30 - 23:59: カウントダウン・バグ修正 ---
  // AI分析: 執念
  { id: "31r4", type: "reconstructed", start: new Date("2025-12-31T22:30"), end: new Date("2025-12-31T23:59"), title: "最終決戦：デッドロック解消", meta: "極限状態でのデータベース・クエリ最適化。2026年を正常な状態で迎えるための闘い。" },

  { id: "31a15", type: "actual", start: new Date("2025-12-31T22:30"), end: new Date("2025-12-31T23:55"), title: "DBeaver.exe", meta: "高負荷クエリの特定とKill" },
  { id: "31a16", type: "actual", start: new Date("2025-12-31T22:45"), end: new Date("2025-12-31T23:50"), title: "Code.exe", meta: "2026年の著作権表示(C)一斉更新" },
  { id: "31a17", type: "actual", start: new Date("2025-12-31T23:45"), end: new Date("2025-12-31T23:59"), title: "Slack.exe", meta: "年越し直前の完了報告送信準備" },

  // src/data/sampleBlocks.ts
// --- 01月01日(木): 元旦の監視と静かなる技術探求 ---

  // --- 00:00 - 02:00: 年越し直後のクリティカル監視 ---
  { id: "0101_p1", type: "plan", start: new Date("2026-01-01T00:00"), end: new Date("2026-01-01T01:30"), title: "新年トラフィック・スパイク監視" },
  
  // AI分析: スパイク対応
  { id: "0101_r1", type: "reconstructed", start: new Date("2026-01-01T00:00"), end: new Date("2026-01-01T02:00"), title: "おめでとうございます：自動スケーリングの監視", meta: "新年の挨拶に伴うメッセージトラフィックの急増を検知。インフラが正常にオートスケールしたことを確認しました。" },

  { id: "0101_a1", type: "actual", start: new Date("2026-01-01T00:00"), end: new Date("2026-01-01T01:30"), title: "Chrome.exe", meta: "AWS CloudWatch & Datadog" },
  { id: "0101_a2", type: "actual", start: new Date("2026-01-01T00:05"), end: new Date("2026-01-01T01:00"), title: "Slack.exe", meta: "「無事完走しました」スタンプの嵐" },
  { id: "0101_a3", type: "actual", start: new Date("2026-01-01T00:15"), end: new Date("2026-01-01T02:15"), title: "WindowsTerminal.exe", meta: "docker stats & server logs" },

  // --- 10:00 - 13:00: 誰もいないSlackでの「こっそり」修正 ---
  { id: "0101_p2", type: "plan", start: new Date("2026-01-01T10:00"), end: new Date("2026-01-01T12:00"), title: "新年バッチ処理の正常性確認" },
  
  // AI分析: ステルス・メンテナンス
  { id: "0101_r2", type: "reconstructed", start: new Date("2026-01-01T10:30"), end: new Date("2026-01-01T12:30"), title: "静かなる修正：日付処理バグ", meta: "2026年への切り替わりで発生した軽微なフォーマット不備を、誰にも気づかれずに修正完了。" },

  { id: "0101_a4", type: "actual", start: new Date("2026-01-01T10:00"), end: new Date("2026-01-01T13:00"), title: "Code.exe", meta: "日付処理ロジックの修正" },
  { id: "0101_a5", type: "actual", start: new Date("2026-01-01T10:30"), end: new Date("2026-01-01T12:00"), title: "Postman.exe", meta: "修正済みAPIの疎通テスト" },
  { id: "0101_a6", type: "actual", start: new Date("2026-01-01T11:00"), end: new Date("2026-01-01T13:30"), title: "Chrome.exe", meta: "GitHub Actions の実行監視" },

  // --- 15:00 - 19:00: 新年最初の技術的冒険 ---
  { id: "0101_p3", type: "plan", start: new Date("2026-01-01T15:00"), end: new Date("2026-01-01T18:00"), title: "2026年メイン技術スタックの選定研究" },
  
  // AI分析: 高集中インプット
  { id: "0101_r3", type: "reconstructed", start: new Date("2026-01-01T15:00"), end: new Date("2026-01-01T19:30"), title: "フロー状態：技術ロードマップ策定", meta: "通知が皆無の状態を活かし、極めて深いレベルでのリサーチを検知。新技術への期待値が高いです。" },

  { id: "0101_a7", type: "actual", start: new Date("2026-01-01T14:00"), end: new Date("2026-01-01T19:00"), title: "Chrome.exe", meta: "Next.js 16 (Alpha) / Bun / Rust 関連の調査" },
  { id: "0101_a8", type: "actual", start: new Date("2026-01-01T14:30"), end: new Date("2026-01-01T20:00"), title: "Code.exe", meta: "プロトタイプ・プロジェクトの雛形作成" },
  { id: "0101_a9", type: "actual", start: new Date("2026-01-01T15:00"), end: new Date("2026-01-01T18:00"), title: "WindowsTerminal.exe", meta: "新ランタイムのインストール実験" },
  { id: "0101_a10", type: "actual", start: new Date("2026-01-01T16:00"), end: new Date("2026-01-01T19:00"), title: "Notion.exe", meta: "2026年の個人開発目標の書き出し" },
  { id: "0101_a11", type: "actual", start: new Date("2026-01-01T17:00"), end: new Date("2026-01-01T20:30"), title: "Spotify.exe", meta: "Lo-fi Hip Hop for Focus" },

  // --- 21:00 - 23:00: 深夜のバックグラウンド整理 ---
  { id: "0101_a12", type: "actual", start: new Date("2026-01-01T21:00"), end: new Date("2026-01-01T22:30"), title: "Slack.exe", meta: "溜まったメンションを明日に備えて整理" },
  { id: "0101_a13", type: "actual", start: new Date("2026-01-01T21:30"), end: new Date("2026-01-01T23:00"), title: "Chrome.exe", meta: "技術ブログの下書き作成" },


// --- 01月02日(金): 孤独な大改修とプロトタイピング ---
  // --- 10:00 - 13:00: 深い集中：アーキテクチャの刷新 ---
  { id: "0102_p1", type: "plan", start: new Date("2026-01-02T10:00"), end: new Date("2026-01-02T12:00"), title: "コア・エンジンの非同期化改修" },

  // AI分析: 構造改革
  { id: "0102_r1", type: "reconstructed", start: new Date("2026-01-02T10:00"), end: new Date("2026-01-02T13:30"), title: "ハイパー・フォーカス：内部構造の刷新", meta: "通知がゼロの状態を最大限利用。依存関係の深いディレクトリの移動と型定義の再構築を検知。" },

  { id: "0102_a1", type: "actual", start: new Date("2026-01-02T10:00"), end: new Date("2026-01-02T14:00"), title: "Code.exe", meta: "ファイル100個以上の移動と修正" },
  { id: "0102_a2", type: "actual", start: new Date("2026-01-02T10:15"), end: new Date("2026-01-02T13:30"), title: "WindowsTerminal.exe", meta: "tsc --watch & vitest" },
  { id: "0102_a3", type: "actual", start: new Date("2026-01-02T10:30"), end: new Date("2026-01-02T12:30"), title: "Chrome.exe", meta: "TypeScript 5.x 仕様確認" },
  { id: "0102_a4", type: "actual", start: new Date("2026-01-02T11:00"), end: new Date("2026-01-02T13:00"), title: "Spotify.exe", meta: "集中用テクノ・ミックス" },

  // --- 14:00 - 18:30: 創造的爆発：新機能プロトタイプ製作 ---
  { id: "0102_p2", type: "plan", start: new Date("2026-01-02T14:00"), end: new Date("2026-01-02T18:00"), title: "AI統合インターフェースの試作" },

  // AI分析: プロトタイピング
  { id: "0102_r2", type: "reconstructed", start: new Date("2026-01-02T14:30"), end: new Date("2026-01-02T19:00"), title: "創造的フロー：実験的実装", meta: "既存コードベースにとらわれない高速なトライ＆エラーを検知。30分に一度のローカルビルドを記録。" },

  { id: "0102_a5", type: "actual", start: new Date("2026-01-02T14:00"), end: new Date("2026-01-02T19:30"), title: "Code.exe", meta: "プロンプトエンジニアリングの実装" },
  { id: "0102_a6", type: "actual", start: new Date("2026-01-02T14:15"), end: new Date("2026-01-02T18:45"), title: "WindowsTerminal.exe", meta: "bun run dev (実験環境)" },
  { id: "0102_a7", type: "actual", start: new Date("2026-01-02T14:30"), end: new Date("2026-01-02T19:00"), title: "Chrome.exe", meta: "Anthropic / OpenAI API Docs" },
  { id: "0102_a8", type: "actual", start: new Date("2026-01-02T15:00"), end: new Date("2026-01-02T17:30"), title: "Figma.exe", meta: "新UIのワイヤーフレーム作成" },
  { id: "0102_a9", type: "actual", start: new Date("2026-01-02T16:00"), end: new Date("2026-01-02T19:45"), title: "Slack.exe", meta: "独り言チャンネルへのメモ投稿" },

  // --- 20:00 - 23:00: 来週の地獄に向けた準備 ---
  { id: "0102_p3", type: "plan", start: new Date("2026-01-02T21:00"), end: new Date("2026-01-02T22:00"), title: "休暇明けデプロイ計画の再確認" },

  // AI分析: 予測的メンテナンス
  { id: "0102_r3", type: "reconstructed", start: new Date("2026-01-02T20:30"), end: new Date("2026-01-02T22:30"), title: "プレ・エンジン始動：タスク整理", meta: "休暇明けの業務再開をスムーズにするため、未消化のレビュー依頼とJiraチケットを整理中。" },

  { id: "0102_a10", type: "actual", start: new Date("2026-01-02T20:00"), end: new Date("2026-01-02T22:00"), title: "Chrome.exe", meta: "GitHub PRレビュー（他人のコード）" },
  { id: "0102_a11", type: "actual", start: new Date("2026-01-02T20:30"), end: new Date("2026-01-02T22:45"), title: "Notion.exe", meta: "仕事始めのToDoリスト作成" },
  { id: "0102_a12", type: "actual", start: new Date("2026-01-02T22:00"), end: new Date("2026-01-02T23:15"), title: "Slack.exe", meta: "明日の自分へのリマインダー設定" },

  // src/data/sampleBlocks.ts
// --- 01月03日(土): 休暇最終日のアクセル全開 ---
  // --- 10:00 - 13:00: 開発環境の破壊と再生 ---
  { id: "0103_p1", type: "plan", start: new Date("2026-01-03T10:00"), end: new Date("2026-01-03T11:30"), title: "開発コンテナの完全再構築" },

  // AI分析: 環境の最適化
  { id: "0103_r1", type: "reconstructed", start: new Date("2026-01-03T10:00"), end: new Date("2026-01-03T12:30"), title: "メンテナンス：依存関係の同期", meta: "npmパッケージの脆弱性対応と、Dockerイメージの軽量化を検知。明日からの開発速度を最大化する準備です。" },

  { id: "0103_a1", type: "actual", start: new Date("2026-01-03T10:00"), end: new Date("2026-01-03T13:00"), title: "WindowsTerminal.exe", meta: "docker-compose build --no-cache" },
  { id: "0103_a2", type: "actual", start: new Date("2026-01-03T10:15"), end: new Date("2026-01-03T12:00"), title: "Chrome.exe", meta: "GitHub Advisory Database 確認" },
  { id: "0103_a3", type: "actual", start: new Date("2026-01-03T11:00"), end: new Date("2026-01-03T13:30"), title: "Code.exe", meta: "設定ファイル (.env / tsconfig) の微調整" },

  // --- 14:00 - 17:00: ステルス・タスク消化 ---
  { id: "0103_p2", type: "plan", start: new Date("2026-01-03T14:00"), end: new Date("2026-01-03T16:00"), title: "月曜朝一のリリース準備" },

  // AI分析: 不安解消のコーディング
  { id: "0103_r2", type: "reconstructed", start: new Date("2026-01-03T14:00"), end: new Date("2026-01-03T17:30"), title: "プレ・エンジン始動：コードレビュー", meta: "溜まっていた20件以上のプルリクエストを走査。明日からのチーム稼働を阻害しないための先行処理を検知。" },

  { id: "0103_a4", type: "actual", start: new Date("2026-01-03T14:00"), end: new Date("2026-01-03T18:00"), title: "Chrome.exe", meta: "GitHub PRレビューの嵐" },
  { id: "0103_a5", type: "actual", start: new Date("2026-01-03T14:30"), end: new Date("2026-01-03T17:00"), title: "Slack.exe", meta: "予約送信メッセージの作成" },
  { id: "0103_a6", type: "actual", start: new Date("2026-01-03T15:00"), end: new Date("2026-01-03T18:30"), title: "Code.exe", meta: "ドキュメント(README)の更新" },
  { id: "0103_a7", type: "actual", start: new Date("2026-01-03T16:00"), end: new Date("2026-01-03T18:00"), title: "Spotify.exe", meta: "さらば正月：哀愁のジャズ" },

  // --- 19:00 - 23:00: 地獄の月曜日へのカウントダウン ---
  { id: "0103_p3", type: "plan", start: new Date("2026-01-03T19:00"), end: new Date("2026-01-03T20:00"), title: "1月第1週の全タスク整理" },
  { id: "0103_p3_2", type: "plan", start: new Date("2026-01-03T19:30"), end: new Date("2026-01-03T20:30"), title: "新年キックオフのスライド作成" },
  { id: "0103_p3_3", type: "plan", start: new Date("2026-01-03T20:00"), end: new Date("2026-01-03T21:30"), title: "Q1目標設定セルフレビュー" },

  // AI分析: 心理的準備
  { id: "0103_r3", type: "reconstructed", start: new Date("2026-01-03T19:00"), end: new Date("2026-01-03T22:30"), title: "オーバークロック：始動準備完了", meta: "カレンダー、Notion、Slack、PowerPointを同時並行。凄まじい密度で仕事モードへ脳を切り替えています。" },

  { id: "0103_a8", type: "actual", start: new Date("2026-01-03T19:00"), end: new Date("2026-01-03T22:00"), title: "Notion.exe", meta: "2026年Q1ロードマップ清書" },
  { id: "0103_a9", type: "actual", start: new Date("2026-01-03T19:15"), end: new Date("2026-01-03T21:00"), title: "PowerPnt.exe", meta: "キックオフ資料作成" },
  { id: "0103_a10", type: "actual", start: new Date("2026-01-03T19:30"), end: new Date("2026-01-03T22:30"), title: "Slack.exe", meta: "全チャンネルの未読消化" },
  { id: "0103_a11", type: "actual", start: new Date("2026-01-03T20:00"), end: new Date("2026-01-03T23:00"), title: "Chrome.exe", meta: "Jiraチケットの優先順位付け" },
  { id: "0103_a12", type: "actual", start: new Date("2026-01-03T21:30"), end: new Date("2026-01-03T23:30"), title: "Code.exe", meta: "明日の自分へのTODOコメント書き" },

  // src/data/sampleBlocks.ts
// --- 01月04日(日): 仕事始め・情報の洪水 ---
  // --- 09:00 - 12:00: 新年キックオフ ＆ 挨拶の猛嵐 ---
  { id: "04p1", type: "plan", start: new Date("2026-01-04T09:00"), end: new Date("2026-01-04T10:00"), title: "全社新年キックオフ" },
  { id: "04p1_2", type: "plan", start: new Date("2026-01-04T09:15"), end: new Date("2026-01-04T10:15"), title: "プロダクトチーム同期" },
  { id: "04p1_3", type: "plan", start: new Date("2026-01-04T09:30"), end: new Date("2026-01-04T11:00"), title: "休暇中のアラート・インシデント総点検" },
  { id: "04p1_4", type: "plan", start: new Date("2026-01-04T10:00"), end: new Date("2026-01-04T11:30"), title: "新年初デプロイ判定会" },
  { id: "04p1_5", type: "plan", start: new Date("2026-01-04T11:00"), end: new Date("2026-01-04T12:00"), title: "1on1: Q1キャリア面談" },

  // AI分析: コンテキスト・スイッチの限界
  { id: "04r1", type: "reconstructed", start: new Date("2026-01-04T09:00"), end: new Date("2026-01-04T12:30"), title: "情報過負荷：同期コストの爆発", meta: "未読Slack 800件、メール150件を処理しながら5つの会議を並行。注意力が極度に分散しています。" },

  { id: "04a1", type: "actual", start: new Date("2026-01-04T09:00"), end: new Date("2026-01-04T12:30"), title: "Teams.exe", meta: "3つの会議に同時参加（マイク操作の神技）" },
  { id: "04a2", type: "actual", start: new Date("2026-01-04T09:05"), end: new Date("2026-01-04T13:00"), title: "Slack.exe", meta: "全方位への新年の挨拶とスタンプ連打" },
  { id: "04a3", type: "actual", start: new Date("2026-01-04T09:30"), end: new Date("2026-01-04T12:00"), title: "Outlook.exe", meta: "溜まった招待の承認と調整" },
  { id: "04a4", type: "actual", start: new Date("2026-01-04T10:00"), end: new Date("2026-01-04T11:30"), title: "Chrome.exe", meta: "Jira / Confluence の波を確認" },
  { id: "04a5", type: "actual", start: new Date("2026-01-04T11:15"), end: new Date("2026-01-04T12:45"), title: "Notion.exe", meta: "Q1目標の叩き台作成" },

  // --- 13:30 - 17:00: 現実への帰還：溜まったPRの解消 ---
  { id: "04p2", type: "plan", start: new Date("2026-01-04T14:00"), end: new Date("2026-01-04T16:00"), title: "バックログ・リファインメント" },

  // AI分析: 技術的負債の返済
  { id: "04r2", type: "reconstructed", start: new Date("2026-01-04T13:30"), end: new Date("2026-01-04T17:30"), title: "高密度レビュー：コードの同期", meta: "休暇中に積まれたプルリクエストを高速処理。チーム全体の開発サイクルを再始動させています。" },

  { id: "04a6", type: "actual", start: new Date("2026-01-04T13:30"), end: new Date("2026-01-04T18:00"), title: "Chrome.exe", meta: "GitHub上で30件のPRをレビュー" },
  { id: "04a7", type: "actual", start: new Date("2026-01-04T14:00"), end: new Date("2026-01-04T17:00"), title: "Code.exe", meta: "ローカル環境での動作検証" },
  { id: "04a8", type: "actual", start: new Date("2026-01-04T14:30"), end: new Date("2026-01-04T17:30"), title: "WindowsTerminal.exe", meta: "最新masterのプルとビルド確認" },
  { id: "04a9", type: "actual", start: new Date("2026-01-04T15:00"), end: new Date("2026-01-04T18:30"), title: "Slack.exe", meta: "レビューコメントへのレスポンス" },

  // --- 18:30 - 21:00: 新年初デプロイの儀 ---
  { id: "04p3", type: "plan", start: new Date("2026-01-04T18:30"), end: new Date("2026-01-04T19:30"), title: "リリース作業：Winter Patch #1" },

  // AI分析: リリース監視
  { id: "04r3", type: "reconstructed", start: new Date("2026-01-04T18:45"), end: new Date("2026-01-04T20:30"), title: "デプロイ実況：正常稼働確認", meta: "2026年最初のデプロイ。パイプラインの正常稼働とエラーレートの静止を確認。" },

  { id: "04a10", type: "actual", start: new Date("2026-01-04T18:30"), end: new Date("2026-01-04T20:00"), title: "Chrome.exe", meta: "CircleCI / ArgoCD 監視" },
  { id: "04a11", type: "actual", start: new Date("2026-01-04T18:40"), end: new Date("2026-01-04T19:50"), title: "WindowsTerminal.exe", meta: "ssh 本番ログ監視" },
  { id: "04a12", type: "actual", start: new Date("2026-01-04T19:00"), end: new Date("2026-01-04T21:00"), title: "Slack.exe", meta: "リリース完了報告と労い" },
  { id: "04a13", type: "actual", start: new Date("2026-01-04T20:00"), end: new Date("2026-01-04T22:00"), title: "Spotify.exe", meta: "仕事始め完走の祝杯BGM" },

  // src/data/sampleBlocks.ts
// --- 01月05日(月): 通常稼働開始・開発スプリント再開 ---
  // --- 09:00 - 11:00: 週明けルーチン ＆ バッチ結果点検 ---
  { id: "05p1", type: "plan", start: new Date("2026-01-05T09:00"), end: new Date("2026-01-05T10:00"), title: "週次全社定例" },
  { id: "05p1_2", type: "plan", start: new Date("2025-01-05T09:30"), end: new Date("2025-01-05T10:30"), title: "月曜朝一のインフラ稼働確認" },

  // AI分析: 日常への回帰
  { id: "05r1", type: "reconstructed", start: new Date("2026-01-05T09:00"), end: new Date("2026-01-05T11:30"), title: "定常運用モード：週次リズムの再構築", meta: "休暇モードからの完全な脱却。主要メトリクスの確認と今週のタスクプライオリティの再設定を検知。" },

  { id: "05a1", type: "actual", start: new Date("2026-01-05T09:00"), end: new Date("2026-01-05T11:00"), title: "Teams.exe", meta: "全社定例を聴き流しながら作業" },
  { id: "05a2", type: "actual", start: new Date("2026-01-05T09:15"), end: new Date("2026-01-05T12:00"), title: "Slack.exe", meta: "今週のスケジュール調整とメンション対応" },
  { id: "05a3", type: "actual", start: new Date("2026-01-05T10:00"), end: new Date("2026-01-05T11:30"), title: "Chrome.exe", meta: "Datadog / Kibana で週明けのログ調査" },

  // --- 13:00 - 16:30: 午後の定例会議ラッシュ ---
  { id: "05p2", type: "plan", start: new Date("2026-01-05T13:00"), end: new Date("2026-01-05T14:00"), title: "Q1開発スプリント：プランニングMTG" },
  { id: "05p2_2", type: "plan", start: new Date("2026-01-05T13:30"), end: new Date("2026-01-05T15:00"), title: "バックエンド設計レビュー (緊急)" },
  { id: "05p2_3", type: "plan", start: new Date("2026-01-05T15:00"), end: new Date("2026-01-05T16:00"), title: "顧客要望フィードバック会" },
  { id: "05p2_4", type: "plan", start: new Date("2026-01-05T16:00"), end: new Date("2026-01-05T17:00"), title: "チーム内KPT (振り返り)" },

  // AI分析: 会議と内職のハイブリッド
  { id: "05r2", type: "reconstructed", start: new Date("2026-01-05T13:00"), end: new Date("2026-01-05T17:30"), title: "マルチタスク：合意形成とコード検討", meta: "会議中のマイクOFF時にVSCodeの活動が活発化。議論を聞きながら設計の妥当性をコードで検証しています。" },

  { id: "05a4", type: "actual", start: new Date("2026-01-05T13:00"), end: new Date("2026-01-05T17:00"), title: "Teams.exe", meta: "会議のハシゴ" },
  { id: "05a5", type: "actual", start: new Date("2026-01-05T13:30"), end: new Date("2026-01-05T17:30"), title: "Code.exe", meta: "会議の裏で設計のプロトタイピング" },
  { id: "05a6", type: "actual", start: new Date("2026-01-05T14:00"), end: new Date("2026-01-05T16:30"), title: "Miro.exe", meta: "新アーキテクチャの図解作成" },
  { id: "05a7", type: "actual", start: new Date("2026-01-05T15:30"), end: new Date("2026-01-05T18:00"), title: "Slack.exe", meta: "決定事項の即時共有" },

  // --- 18:00 - 22:00: 実装フェーズへの没入 ---
  { id: "05p3", type: "plan", start: new Date("2026-01-05T18:00"), end: new Date("2026-01-05T19:00"), title: "夕食兼自由作業時間（集中モード）" },

  // AI分析: 深夜の生産性スパイク
  { id: "05r3", type: "reconstructed", start: new Date("2026-01-05T18:00"), end: new Date("2026-01-05T22:30"), title: "フロー状態：機能実装本格化", meta: "会議のノイズから解放された後の圧倒的な出力。3時間で500行以上のコード生成を検知。" },

  { id: "05a8", type: "actual", start: new Date("2026-01-05T18:00"), end: new Date("2026-01-05T23:00"), title: "Code.exe", meta: "メイン機能のロジック実装" },
  { id: "05a9", type: "actual", start: new Date("2026-01-05T18:15"), end: new Date("2026-01-05T22:45"), title: "WindowsTerminal.exe", meta: "Unit Test & Local Build" },
  { id: "05a10", type: "actual", start: new Date("2026-01-05T19:00"), end: new Date("2026-01-05T22:00"), title: "Chrome.exe", meta: "GitHub Copilot / Stack Overflow" },
  { id: "05a11", type: "actual", start: new Date("2026-01-05T20:00"), end: new Date("2026-01-05T22:30"), title: "Spotify.exe", meta: "Deep Focus Playlist" },
  { id: "05a12", type: "actual", start: new Date("2026-01-05T22:30"), end: new Date("2026-01-05T23:15"), title: "Slack.exe", meta: "「本日はここまで」と報告" }
];