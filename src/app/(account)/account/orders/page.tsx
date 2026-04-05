import { getOrders } from "@/lib/api/orders";
import OrderCard from "@/components/order/OrderCard";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "注文履歴",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">注文履歴</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="注文履歴がありません"
          description="まだ注文がありません。商品をチェックしてみましょう。"
          actionLabel="商品を見る"
          actionHref="/products"
        />
      )}
    </div>
  );
}
