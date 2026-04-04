import Link from "next/link";
import { getCategories } from "@/lib/api/categories";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata = {
  title: "カテゴリ一覧",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "カテゴリ一覧" }]}
      />
      <h1 className="text-2xl font-bold text-stone-900 mt-6 mb-8">
        カテゴリ一覧
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="group"
          >
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div
                className={`aspect-[3/2] bg-gradient-to-br ${category.image_color} flex items-center justify-center`}
              >
                <span className="text-white/90 font-medium">
                  {category.product_count}商品
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-lg font-semibold text-stone-800 group-hover:text-teal-700 transition-colors mb-1">
                  {category.name}
                </h2>
                <p className="text-sm text-stone-500">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
