"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, Category } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import {
  createProductAction,
  updateProductAction,
} from "@/lib/api/admin-actions";

interface AdminProductFormProps {
  product?: Product;
  categories: Category[];
}

export default function AdminProductForm({
  product,
  categories,
}: AdminProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(
    product ? String(product.price_in_cents) : "",
  );
  const [stock, setStock] = useState(product ? String(product.quantity) : "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const data = {
      name,
      description,
      price_in_cents: Number(price),
      image_color: "from-stone-400 to-stone-600",
      quantity: Number(stock),
    };

    try {
      if (isEdit) await updateProductAction(product.id, data);
      else await createProductAction(data);
      router.push("/admin/products");
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存に失敗しました");
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="商品名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="space-y-1.5">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-stone-700"
          >
            説明
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="価格（円）"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <Input
            label="在庫数"
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-stone-700"
          >
            カテゴリ
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          >
            <option value="">選択してください</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">{isEdit ? "更新する" : "追加する"}</Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin/products")}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Card>
  );
}
