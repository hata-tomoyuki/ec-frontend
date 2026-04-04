import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryById,
  getProductsByCategory,
  formatPrice,
} from "@/data/mock";
import AdminCategoryForm from "@/components/admin/AdminCategoryForm";

export default async function AdminCategoryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(Number(id));

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(Number(id));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">カテゴリを編集</h1>
      <AdminCategoryForm category={category} />

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <div className="px-6 py-4 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900">
            紐づく商品（{products.length}件）
          </h2>
        </div>
        {products.length === 0 ? (
          <div className="text-center py-8 text-stone-500">
            このカテゴリに商品はありません
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-6 font-medium text-stone-600">
                    商品名
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-stone-600">
                    価格
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-stone-600">
                    在庫
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50"
                  >
                    <td className="py-3 px-6">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-stone-800 hover:text-teal-700 font-medium"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-3 px-6 text-right text-stone-800">
                      {formatPrice(product.price_in_cents)}
                    </td>
                    <td className="py-3 px-6 text-right text-stone-800">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
