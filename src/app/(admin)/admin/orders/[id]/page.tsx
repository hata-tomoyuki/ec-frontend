import { notFound } from "next/navigation";
import { getOrderById, formatPrice } from "@/data/mock";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import OrderItemRow from "@/components/order/OrderItemRow";
import AdminOrderStatusForm from "@/components/admin/AdminOrderStatusForm";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    notFound();
  }

  const addr = order.shipping_address;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-stone-900">注文 {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-stone-900 mb-4">
          ステータス更新
        </h2>
        <AdminOrderStatusForm currentStatus={order.status} orderId={order.id} />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-stone-900 mb-4">注文商品</h2>
        <div>
          {order.items.map((item) => (
            <OrderItemRow key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-end pt-4 mt-4 border-t border-stone-200">
          <p className="text-lg font-semibold text-stone-900">
            合計: {formatPrice(order.total)}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-stone-900 mb-3">配送先</h2>
          <div className="text-sm text-stone-600 space-y-1">
            <p>〒{addr.postal_code}</p>
            <p>
              {addr.prefecture}
              {addr.city}
              {addr.line1}
            </p>
            {addr.line2 && <p>{addr.line2}</p>}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-stone-900 mb-3">
            注文情報
          </h2>
          <div className="text-sm text-stone-600 space-y-1">
            <p>顧客ID: {order.user_id}</p>
            <p>
              注文日: {new Date(order.created_at).toLocaleDateString("ja-JP")}
            </p>
            <p>
              更新日: {new Date(order.updated_at).toLocaleDateString("ja-JP")}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
