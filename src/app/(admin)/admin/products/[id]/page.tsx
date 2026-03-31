import { notFound } from "next/navigation";
import { getProductById, mockCategories } from "@/data/mock";
import AdminProductForm from "@/components/admin/AdminProductForm";

export default async function AdminProductEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">商品を編集</h1>
      <AdminProductForm product={product} categories={mockCategories} />
    </div>
  );
}
