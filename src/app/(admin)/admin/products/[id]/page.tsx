import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ApiError } from "@/lib/api/client";
import AdminProductForm from "@/components/admin/AdminProductForm";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) notFound();
    throw e;
  }

  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">商品を編集</h1>
      <AdminProductForm product={product} categories={categories} />
    </div>
  );
}
