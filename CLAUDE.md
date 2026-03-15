# 仮想お遍路ウォーカー — CLAUDE.md

## プロジェクト概要
歩数計（スマホのヘルスケアアプリ）と連携し、実際の歩数に応じて四国八十八ヶ所を仮想的に巡礼するPWAアプリ。

## ファイル構成
```
henro-walker/
├── index.html     メインUI（HTML/CSS）
├── app.js         ロジック（地図描画・歩数管理・UI更新）
├── sw.js          Service Worker（オフラインキャッシュ）
├── manifest.json  PWAマニフェスト
├── icons/         アプリアイコン（192x192, 512x512 PNG）
└── CLAUDE.md      このファイル
```

## 技術スタック
- 純粋なHTML/CSS/JS（フレームワークなし）
- SVGで地図を描画（外部CDN依存なし）
- localStorage で歩数を永続化
- Service Worker でオフライン対応

## 主要データ
- `TEMPLES`: 88ヶ所の緯度・経度・名称（app.js）
- `CUM_DIST`: 各寺院間の累計距離（ハバーサイン計算）
- `TOTAL_KM`: 全行程 約1,200km
- 歩幅換算: 1歩 = 0.75m（調整可能）

## 今後の実装タスク（優先度順）

### Phase 1 — 基本強化
- [ ] アイコン画像の生成（icons/icon-192.png, icon-512.png）
- [ ] 各札所をタップすると詳細情報（本尊・真言・縁起）を表示
- [ ] 達成した札所に「納経スタンプ」を打つ演出

### Phase 2 — ヘルスケア連携
- [ ] iOS: WKWebView + Swift Bridge で HealthKit と接続
  - `HKQuantityTypeIdentifierStepCount` を日次集計
  - `window.webkit.messageHandlers.getHealthKitSteps.postMessage({})`
- [ ] Android: WebView + Kotlin Bridge で Health Connect と接続
  - `StepsRecord` を日次集計
  - `Android.getHealthConnectSteps()`
- [ ] 最後に同期した日付を記録し、重複加算を防ぐ

### Phase 3 — UX向上
- [ ] 日別歩数履歴グラフ（過去30日）
- [ ] 到着時のプッシュ通知（「第X番に到着しました」）
- [ ] 四国の地図を拡大縮小できるようにする
- [ ] 結願（88番到達）時のお祝い演出

### Phase 4 — ネイティブアプリ化（任意）
- [ ] Capacitor.js でiOS/Androidアプリにラップ
- [ ] App Store / Google Play への申請

## 開発メモ
- 地図はSVGポリゴン描画（外部マップAPI不使用）
- 緯度経度の範囲: 経度 132.3〜135.0, 緯度 32.55〜34.75
- お遍路全行程の正確なルートデータが必要な場合は国土地理院の歩道データを参照
