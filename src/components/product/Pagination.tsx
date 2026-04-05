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

  const offset = 2;

  function generateDisplayNumbers(): (number | "...")[] {
    let start = Math.max(1, page - offset);
    let end = Math.min(totalPages, page + offset);

    if (page - offset < 1) {
      end = Math.min(totalPages, end + (1 - (page - offset)));
    }
    if (page + offset > totalPages) {
      start = Math.max(1, start - (page + offset - totalPages));
    }

    const pages: (number | "...")[] = [];

    // 先頭ページ + 省略記号
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // 省略記号 + 末尾ページ
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  }

  const pageItems = generateDisplayNumbers();

  const linkClass =
    "flex items-center justify-center rounded-full w-8 h-8 text-sm border border-teal-700 transition-colors hover:bg-teal-50";

  return (
    <div className="flex items-center justify-center gap-2">
      {page <= 1 ? (
        <span className="px-2 text-sm text-stone-300">前へ</span>
      ) : (
        <Link
          href={buildHref(page - 1)}
          className="px-2 text-sm text-teal-700 hover:underline"
        >
          前へ
        </Link>
      )}

      {pageItems.map((item, i) =>
        item === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-8 text-center text-stone-400"
          >
            ...
          </span>
        ) : (
          <Link
            href={buildHref(item)}
            key={item}
            className={`${linkClass} ${
              item === page
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-teal-700"
            }`}
          >
            {item}
          </Link>
        ),
      )}

      {page >= totalPages ? (
        <span className="px-2 text-sm text-stone-300">次へ</span>
      ) : (
        <Link
          href={buildHref(page + 1)}
          className="px-2 text-sm text-teal-700 hover:underline"
        >
          次へ
        </Link>
      )}
    </div>
  );
}
