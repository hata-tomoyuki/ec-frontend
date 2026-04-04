import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">BECAUSE</h3>
            <p className="text-sm leading-relaxed">
              品質にこだわった商品を、あなたのもとへ。
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">ショップ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  商品一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition-colors"
                >
                  カテゴリ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              アカウント
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/account"
                  className="hover:text-white transition-colors"
                >
                  マイページ
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:text-white transition-colors"
                >
                  注文履歴
                </Link>
              </li>
              <li>
                <Link
                  href="/account/addresses"
                  className="hover:text-white transition-colors"
                >
                  住所管理
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">サポート</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-default">お問い合わせ</span>
              </li>
              <li>
                <span className="cursor-default">利用規約</span>
              </li>
              <li>
                <span className="cursor-default">プライバシーポリシー</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 BECAUSE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
