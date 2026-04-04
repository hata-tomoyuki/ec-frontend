import { getProducts } from "@/lib/api/products";
import Button from "@/components/ui/Button";
import AdminProductTable from "@/components/admin/AdminProductTable";

export default async function AdminProductsPage() {
  const products = await getProducts();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">商品管理</h1>
        <Button href="/admin/products/new">商品を追加</Button>
      </div>
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <AdminProductTable products={products} />
      </div>
    </div>
  );
}
