"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@/types";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

interface AdminCategoryFormProps {
  category?: Category;
}

export default function AdminCategoryForm({
  category,
}: AdminCategoryFormProps) {
  const router = useRouter();
  const isEdit = !!category;

  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: API呼び出し
    console.log("Submit category:", { name, description });
    router.push("/admin/categories");
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="カテゴリ名"
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
            rows={3}
            className="block w-full rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
          />
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit">{isEdit ? "更新する" : "追加する"}</Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin/categories")}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Card>
  );
}
