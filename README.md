# 永井行政書士事務所 サイトデモ

行政書士事務所サイトを想定した Next.js 実装デモです。  
Home / 取扱業務 / 料金表 / 事務所案内 / お問い合わせ を公開しています。

## 公開URL
- 本番: https://nagai-gyosei-shoshi-jimusho-demo.vercel.app
- GitHub: https://github.com/ko-nagai-0801/nagai-gyosei-shoshi-jimusho-demo

## 技術スタック
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- ESLint
- Vercel (デプロイ)

## ページ構成
- `/` ホーム
- `/works` 取扱業務・支援事例
- `/pricing` 料金表（詳細条件 / オプション費用 / 支払条件 / キャンセルポリシー / 請求書サンプル / 適格請求書番号）
- `/about` 事務所案内
- `/contact` お問い合わせ

## ローカル開発
```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## 品質チェック
```bash
npm run lint
npm run build
```

## 環境変数
- `NEXT_PUBLIC_SITE_URL`
  - OGP / canonical 生成の基準URL
  - 未設定時は本番URL (`https://nagai-gyosei-shoshi-jimusho-demo.vercel.app`) を使用

## 実装メモ
- Hero は full-bleed 実装（親の `max-width` 制約を受けない）
- フォーム送信はUIデモ（外部送信は未接続）
- 料金表の請求書サンプルは表示専用（実PDFは未配置）

## 開発ルール
- コミットメッセージは日本語で記述する
- `main` ブランチはデプロイ対象のため、lint/build通過後に反映する
