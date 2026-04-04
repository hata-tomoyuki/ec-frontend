import { Suspense } from "react";
import { getProductsPaginated } from "@/lib/api/products";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ProductGrid from "@/components/product/ProductGrid";
import ProductToolbar from "@/components/product/ProductToolbar";
import Pagination from "@/components/product/Pagination";

export const metadata = {
  title: "商品一覧",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 20;
  const sort = (params.sort as string) || undefined;
  const search = (params.search as string) || undefined;

  const result = await getProductsPaginated({ page, limit, sort, search });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "商品一覧" }]}
      />
      <h1 className="text-2xl font-bold text-stone-900 mt-6 mb-4">全商品</h1>

      <Suspense fallback={null}>
        <ProductToolbar />
      </Suspense>

      {result.data.length === 0 ? (
        <p className="text-stone-500 text-center py-12">
          {search
            ? `「${search}」に一致する商品が見つかりませんでした。`
            : "商品がありません。"}
        </p>
      ) : (
        <>
          <p className="text-sm text-stone-500 mb-4">
            {result.total}件中 {(page - 1) * limit + 1}〜
            {Math.min(page * limit, result.total)}件を表示
          </p>
          <ProductGrid products={result.data} />
          <div className="mt-8">
            <Suspense fallback={null}>
              <Pagination
                total={result.total}
                page={result.page}
                limit={result.limit}
              />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
