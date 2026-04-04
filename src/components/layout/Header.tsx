"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/products", label: "商品一覧" },
  { href: "/categories", label: "カテゴリ" },
];

interface HeaderProps {
  cartItemCount?: number;
}

export default function Header({ cartItemCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-teal-700">
              BECAUSE
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-600 hover:text-teal-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <CartIcon count={cartItemCount} />
            <UserMenu />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
