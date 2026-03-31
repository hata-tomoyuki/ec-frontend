import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アカウント",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-teal-700">
            BECAUSE
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
