"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/products", label: "商品一覧" },
  { href: "/categories", label: "カテゴリ" },
  { href: "/cart", label: "カート" },
  { href: "/account", label: "マイページ" },
  { href: "/account/orders", label: "注文履歴" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-stone-600 hover:text-teal-700 transition-colors"
        aria-label="メニュー"
      >
        {open ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setOpen(false)}
          />
          <nav className="absolute top-full left-0 right-0 bg-white border-b border-stone-200 shadow-lg z-50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-stone-700 hover:bg-stone-50 border-b border-stone-100 last:border-b-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
