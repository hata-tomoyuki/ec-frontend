import Link from "next/link";

const sidebarLinks = [
  { href: "/admin", label: "ダッシュボード" },
  { href: "/admin/products", label: "商品管理" },
  { href: "/admin/categories", label: "カテゴリ管理" },
  { href: "/admin/orders", label: "注文管理" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-30 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-xl font-bold text-white">
                BECAUSE
              </Link>
              <span className="px-2 py-0.5 text-xs font-medium bg-teal-600 rounded">
                管理画面
              </span>
            </div>
            <Link
              href="/"
              className="text-sm text-stone-300 hover:text-white transition-colors"
            >
              ストアに戻る
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-56 shrink-0">
            <nav className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm text-stone-700 hover:bg-stone-50 border-b border-stone-100 last:border-b-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </>
  );
}
