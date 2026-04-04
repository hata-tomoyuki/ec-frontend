import { notFound } from "next/navigation";
import {
  mockCategories,
  getCategoryById,
  getProductsByCategory,
} from "@/data/mock";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";

export async function generateStaticParams() {
  return mockCategories.map((c) => ({ id: String(c.id) }));
}

export default async function CategoryDetailPage({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "カテゴリ一覧", href: "/categories" },
          { label: category.name },
        ]}
      />

      {/* Category header */}
      <div
        className={`mt-8 rounded-xl bg-gradient-to-br ${category.image_color} p-8 sm:p-12 text-white`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-white/80">{category.description}</p>
      </div>

      {/* Products */}
      <div className="mt-8">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            title="商品がありません"
            description="このカテゴリにはまだ商品がありません。"
            actionLabel="商品一覧を見る"
            actionHref="/products"
          />
        )}
      </div>
    </div>
  );
}
