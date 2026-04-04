"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
}

export default function Pagination({ total, page, limit }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  function buildHref(p: number): string {
    const params = new URLSearchParams(searchParams.toString());
    if (p <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(p));
    }
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4">
      {page-1 < 1 ?(
        <span className="text-center text-stone-300">前へ</span>
      ): (
        <Link href={buildHref(page-1)} className="text-center">前へ</Link>
      )}
      {[...Array(totalPages)].map((_, i) =>
        <Link href={buildHref(i+1)} key={i} className={`rounded-full aspect-square w-6 text-center border border-teal-700  ${i+1 === page ? "bg-teal-700 text-white" : "bg-white" }`}>{i+1}</Link>
      )}
      {page+1>totalPages ? (
        <span className="text-center text-stone-300">次へ</span>
      ) : (
        <Link href={buildHref(page+1)} className="text-center">次へ</Link>
      )}
    </div>
  )
}
