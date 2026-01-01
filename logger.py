import time
import json
import os
import datetime
import win32gui
import win32process
import psutil
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

# --- 設定 ---
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
PLAN_FILE = 'src/data/plans.json'
ACTUAL_FILE = 'src/data/actuals.json'

CHECK_INTERVAL = 2    # 2秒ごとにチェック
IDLE_THRESHOLD = 600   # 10分アクセスがなければ「放置」とみなしてブロックを締める

def get_active_window_info():
    try:
        window = win32gui.GetForegroundWindow()
        title = win32gui.GetWindowText(window)
        _, pid = win32process.GetWindowThreadProcessId(window)
        app_name = psutil.Process(pid).name()
        return title, app_name
    except:
        return None, None

def save_json(filepath, data):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

class ActivityTracker:
    def __init__(self):
        self.actual_logs = []
        self.current_session = None

    def finalize_session(self):
        """現在のセッションを確定させてリストに加える"""
        if self.current_session:
            # 最後にアクセスがあった時間を終了時刻として採用
            self.current_session["end"] = self.current_session["last_active_at"]
            # 不要な作業用フィールドを削除
            final_log = {k: v for k, v in self.current_session.items() if k != "last_active_at"}
            self.actual_logs.append(final_log)
            self.current_session = None
            save_json(ACTUAL_FILE, self.actual_logs)

    def track(self):
        title, app = get_active_window_info()
        now_dt = datetime.datetime.now()
        now_str = now_dt.isoformat()

        if not app: return

        if self.current_session:
            # アプリが変わったか、あるいは長時間放置されたか
            idle_duration = (now_dt - datetime.datetime.fromisoformat(self.current_session["last_active_at"])).total_seconds()
            
            if self.current_session["title"] == app:
                # 同じアプリを使っている
                if idle_duration > IDLE_THRESHOLD:
                    # 放置しすぎたので一旦締める
                    print(f"[{now_dt.strftime('%H:%M:%S')}] 放置検知: {self.current_session['title']} を終了")
                    self.finalize_session()
                else:
                    # アクティブなので最終アクセスを更新（ブロックを仮延長）
                    self.current_session["last_active_at"] = now_str
                    # タイトル（タブ名）が変わっていれば更新
                    if title: self.current_session["meta"] = title
            else:
                # アプリが切り替わったので前のを確定
                self.finalize_session()

        # 新しいセッションの開始
        if not self.current_session:
            print(f"[{now_dt.strftime('%H:%M:%S')}] 新規アクセス: {app}")
            self.current_session = {
                "id": f"log-{int(time.time())}",
                "type": "actual",
                "start": now_str,
                "last_active_at": now_str, # 作業用の最終アクセス時刻
                "title": app,
                "meta": title
            }

def main():
    # 予定の取得（ここは前回のロジックと同じでOK）
    # save_plans() ... (省略)
    
    tracker = ActivityTracker()
    print(f"--- 監視開始（アクセス頻度ベース） ---")
    print(f"設定: {IDLE_THRESHOLD}秒操作がないと自動でブロックを確定します")

    try:
        while True:
            tracker.track()
            time.sleep(CHECK_INTERVAL)
    except KeyboardInterrupt:
        tracker.finalize_session()
        print("\n監視を終了しました。")

if __name__ == "__main__":
    main()