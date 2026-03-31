import { notFound } from "next/navigation";
import { mockOrders, getOrderById, formatPrice } from "@/data/mock";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import OrderStatusTimeline from "@/components/order/OrderStatusTimeline";
import OrderItemRow from "@/components/order/OrderItemRow";

export async function generateStaticParams() {
  return mockOrders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  const date = new Date(order.created_at).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">注文詳細</h1>
          <p className="text-sm text-stone-500 mt-1">
            注文番号: {order.id} / {date}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="space-y-6">
        {/* Timeline */}
        <Card>
          <h2 className="text-sm font-bold text-stone-900 mb-4">
            注文ステータス
          </h2>
          <OrderStatusTimeline status={order.status} />
        </Card>

        {/* Items */}
        <Card>
          <h2 className="text-sm font-bold text-stone-900 mb-4">注文商品</h2>
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
          <div className="flex justify-between mt-4 pt-4 border-t border-stone-200">
            <span className="font-bold text-stone-900">合計</span>
            <span className="font-bold text-lg text-stone-900">
              {formatPrice(order.total)}
            </span>
          </div>
        </Card>

        {/* Shipping address */}
        <Card>
          <h2 className="text-sm font-bold text-stone-900 mb-2">配送先</h2>
          <p className="text-sm text-stone-600">
            〒{order.shipping_address.postal_code}{" "}
            {order.shipping_address.prefecture}
            {order.shipping_address.city}
            {order.shipping_address.line1}
            {order.shipping_address.line2 &&
              ` ${order.shipping_address.line2}`}
          </p>
        </Card>

        {/* Cancel button */}
        {order.status === "pending" && (
          <Button variant="danger">注文をキャンセル</Button>
        )}
      </div>
    </div>
  );
}
