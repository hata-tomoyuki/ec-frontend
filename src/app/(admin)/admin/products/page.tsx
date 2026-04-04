import { getProductsPaginated } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import Button from "@/components/ui/Button";
import AdminProductTable from "@/components/admin/AdminProductTable";
import ProductToolbar from "@/components/product/ProductToolbar";
import Pagination from "@/components/product/Pagination";

interface AdminProductsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 20;
  const sort = params.sort || undefined;
  const search = params.search || undefined;
  const categoryId = Number(params.category_id) || undefined;

  const [result, categories] = await Promise.all([
    getProductsPaginated({ page, limit, sort, search, category_id: categoryId }),
    getCategories(),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900">商品管理</h1>
        <Button href="/admin/products/new">商品を追加</Button>
      </div>
      <ProductToolbar categories={categories} />
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <AdminProductTable products={result.data} />
      </div>
      <Pagination total={result.total} page={result.page} limit={result.limit} />
    </div>
  );
}
