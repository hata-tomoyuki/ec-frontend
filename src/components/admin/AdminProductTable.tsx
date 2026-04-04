"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/data/mock";
import { deleteProductAction } from "@/lib/api/admin-actions";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface AdminProductTableProps {
  products: Product[];
}

export default function AdminProductTable({
  products,
}: AdminProductTableProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    setConfirmDeleteId(null);
    try {
      await deleteProductAction(id);
    } catch (e) {
      console.error("Delete failed:", e);
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500">商品がありません</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              商品名
            </th>
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              カテゴリ
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              価格
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              在庫
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-stone-100 hover:bg-stone-50"
            >
              <td className="py-3 px-4">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="text-stone-800 hover:text-teal-700 font-medium"
                >
                  {product.name}
                </Link>
              </td>
              <td className="py-3 px-4 text-stone-600">
                {product.category_name}
              </td>
              <td className="py-3 px-4 text-right text-stone-800">
                {formatPrice(product.price_in_cents)}
              </td>
              <td className="py-3 px-4 text-right">
                {product.quantity <= 10 ? (
                  <Badge variant="warning">{product.quantity}</Badge>
                ) : (
                  <span className="text-stone-800">{product.quantity}</span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                {confirmDeleteId === product.id ? (
                  <span className="flex items-center justify-end gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
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
                      href={`/admin/products/${product.id}`}
                    >
                      編集
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setConfirmDeleteId(product.id)}
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
