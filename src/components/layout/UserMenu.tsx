"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
}

export default function UserMenu({ userName = "", userEmail = "" }: UserMenuProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    console.log("ログアウト");
    router.push("/login");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-2 text-stone-600 hover:text-teal-700 transition-colors"
        aria-label="アカウントメニュー"
      >
        <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center text-sm font-medium">
          {userName[0] || "?"}
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-stone-200 shadow-lg z-50 py-2">
            <div className="px-4 py-2 border-b border-stone-100">
              <p className="text-sm font-medium text-stone-800">
                {userName}
              </p>
              <p className="text-xs text-stone-500">{userEmail}</p>
            </div>
            <nav className="py-1">
              {[
                { href: "/account", label: "マイページ" },
                { href: "/account/orders", label: "注文履歴" },
                { href: "/account/addresses", label: "住所管理" },
                { href: "/account/profile", label: "プロフィール" },
                { href: "/admin", label: "管理画面" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-stone-100 py-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-50 transition-colors"
              >
                ログアウト
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
