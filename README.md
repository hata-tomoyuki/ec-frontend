# BECAUSE - E-Commerce フロントエンド

Next.js で構築された EC サイトのフロントエンド。現在はモックデータで動作し、バックエンド API との連携は後続タスクで対応予定。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS 4
- **UI**: 独自コンポーネント (Button, Card, Input, Badge 等)

## セットアップ

```bash
npm install
npm run dev    # 開発サーバー起動 (http://localhost:3000)
```

## スクリプト

```bash
npm run dev    # 開発サーバー
npm run build  # プロダクションビルド
npm run start  # プロダクションサーバー
npm run lint   # ESLint 実行
```

## ページ一覧

### ショップ

| パス | 内容 |
|------|------|
| `/` | トップページ |
| `/products` | 商品一覧 |
| `/products/[id]` | 商品詳細 |
| `/categories` | カテゴリ一覧 |
| `/categories/[id]` | カテゴリ別商品 |
| `/cart` | カート |
| `/checkout` | チェックアウト |
| `/checkout/complete` | 注文完了 |

### 認証

| パス | 内容 |
|------|------|
| `/login` | ログイン |
| `/register` | 新規登録 |

### アカウント

| パス | 内容 |
|------|------|
| `/account` | マイページ |
| `/account/profile` | プロフィール編集 |
| `/account/password` | パスワード変更 |
| `/account/orders` | 注文履歴 |
| `/account/orders/[id]` | 注文詳細 |
| `/account/addresses` | 住所一覧 |
| `/account/addresses/new` | 住所追加 |
| `/account/addresses/[id]` | 住所編集 |

### 管理画面

| パス | 内容 |
|------|------|
| `/admin` | ダッシュボード |
| `/admin/products` | 商品管理 |
| `/admin/products/new` | 商品追加 |
| `/admin/products/[id]` | 商品編集 |
| `/admin/categories` | カテゴリ管理 |
| `/admin/categories/new` | カテゴリ追加 |
| `/admin/categories/[id]` | カテゴリ編集 |
| `/admin/orders` | 注文管理 |
| `/admin/orders/[id]` | 注文詳細 |

## プロジェクト構成

```
src/
  app/
    (auth)/          # 認証（ログイン・登録）
    (shop)/          # ショップ（商品・カテゴリ・カート）
    (account)/       # アカウント・チェックアウト
    (admin)/         # 管理画面
  components/
    ui/              # 汎用 UI (Button, Card, Input, Badge 等)
    layout/          # レイアウト (Header, Footer, UserMenu 等)
    auth/            # 認証フォーム
    product/         # 商品関連
    cart/            # カート関連
    order/           # 注文関連
    account/         # アカウント関連
    admin/           # 管理画面関連
  data/
    mock.ts          # モックデータ
  types/
    index.ts         # 型定義
```
