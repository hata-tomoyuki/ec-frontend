import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
              品質にこだわった商品を、
              <br />
              あなたのもとへ。
            </h1>
            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              厳選されたアイテムを取り揃えたオンラインストアです。
              ファッション、家電、食品まで幅広くお届けします。
            </p>
            <Button href="/products" variant="secondary" size="lg">
              商品を見る
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900">カテゴリ</h2>
          <Link
            href="/categories"
            className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                <div
                  className={`aspect-[4/3] bg-gradient-to-br ${category.image_color} flex items-center justify-center`}
                >
                  <span className="text-white font-medium text-sm">
                    {category.product_count}商品
                  </span>
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-stone-800 group-hover:text-teal-700 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-stone-900">おすすめ商品</h2>
            <Link
              href="/products"
              className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              title: "安心の品質",
              description:
                "厳選した商品のみを取り扱い、品質管理を徹底しています。",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              ),
            },
            {
              title: "迅速な配送",
              description:
                "ご注文から最短翌日にお届け。全国送料無料でお届けします。",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              ),
            },
            {
              title: "簡単返品",
              description:
                "商品到着後30日以内なら、理由を問わず返品・交換が可能です。",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                />
              ),
            },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-semibold text-stone-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-stone-500">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
