import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCart } from "@/lib/api/cart";

const sidebarLinks = [
  { href: "/account", label: "マイページ" },
  { href: "/account/orders", label: "注文履歴" },
  { href: "/account/addresses", label: "住所管理" },
  { href: "/account/profile", label: "プロフィール" },
  { href: "/account/password", label: "パスワード変更" },
];

async function getCartCount(): Promise<number> {
  try {
    const items = await getCart();
    return items.length;
  } catch {
    return 0;
  }
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartItemCount = await getCartCount();

  return (
    <>
      <Header cartItemCount={cartItemCount} />
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
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

          {/* Main content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
