import { getCart } from "@/lib/api/cart";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "カート",
};

export default async function CartPage() {
  const items = await getCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-stone-900 mb-8">カート</h1>
        <EmptyState
          title="カートは空です"
          description="商品をカートに追加してください。"
          actionLabel="商品を見る"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "カート" }]}
      />
      <h1 className="text-2xl font-bold text-stone-900 mt-6 mb-8">
        カート ({items.length}点)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-6">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <CartSummary items={items} />
        </div>
      </div>
    </div>
  );
}
