import { getProducts } from "@/lib/api/products";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/product/ProductGrid";

export const metadata = {
  title: "商品一覧",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "商品一覧" }]}
      />
      <h1 className="text-2xl font-bold text-stone-900 mt-6 mb-8">全商品</h1>
      <ProductGrid products={products} />
    </div>
  );
}
