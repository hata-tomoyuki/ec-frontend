"use client";

import { useState } from "react";
import Link from "next/link";
import type { Category } from "@/types";
import { deleteCategoryAction } from "@/lib/api/admin-actions";
import Button from "@/components/ui/Button";

interface AdminCategoryTableProps {
  categories: Category[];
}

export default function AdminCategoryTable({
  categories,
}: AdminCategoryTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    setConfirmDeleteId(null);
    try {
      await deleteCategoryAction(id);
    } catch (e) {
      console.error("Delete failed:", e);
    }
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500">
        カテゴリがありません
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              カテゴリ名
            </th>
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              説明
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              商品数
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b border-stone-100 hover:bg-stone-50"
            >
              <td className="py-3 px-4">
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="text-stone-800 hover:text-teal-700 font-medium"
                >
                  {category.name}
                </Link>
              </td>
              <td className="py-3 px-4 text-stone-600 max-w-xs truncate">
                {category.description}
              </td>
              <td className="py-3 px-4 text-right text-stone-800">
                {category.product_count}
              </td>
              <td className="py-3 px-4 text-right">
                {confirmDeleteId === category.id ? (
                  <span className="flex items-center justify-end gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      確認
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDeleteId(null)}
                    >
                      戻る
                    </Button>
                  </span>
                ) : (
                  <span className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      href={`/admin/categories/${category.id}`}
                    >
                      編集
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDeleteId(category.id)}
                    >
                      削除
                    </Button>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
