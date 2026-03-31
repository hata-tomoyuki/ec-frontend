import { notFound } from "next/navigation";
import { mockProducts, getProductById, getProductsByCategory } from "@/data/mock";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductDetailInfo from "@/components/product/ProductDetailInfo";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductGrid from "@/components/product/ProductGrid";

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category_id)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "商品一覧", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image placeholder */}
        <div
          className={`aspect-square rounded-xl bg-gradient-to-br ${product.image_color} flex items-center justify-center`}
        >
          <span className="text-white/70 text-lg font-medium">
            商品画像
          </span>
        </div>

        {/* Product info */}
        <div className="space-y-8">
          <ProductDetailInfo product={product} />
          <AddToCartButton productId={product.id} stock={product.stock} />
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-stone-900 mb-6">
            関連商品
          </h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
