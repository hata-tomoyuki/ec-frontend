import { notFound } from "next/navigation";
import { getOrder, groupOrderRows } from "@/lib/api/orders";
import { ApiError } from "@/lib/api/client";
import { formatPrice } from "@/data/mock";
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

  let rows;
  try {
    rows = await getOrder(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }

  const orders = groupOrderRows(rows);
  if (orders.length === 0) {
    notFound();
  }
  const order = orders[0];

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
          {order.items.map((item, index) => (
            <OrderItemRow key={index} item={item} />
          ))}
        </div>
        <div className="flex justify-end pt-4 mt-4 border-t border-stone-200">
          <p className="text-lg font-semibold text-stone-900">
            合計: {formatPrice(order.total)}
          </p>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-stone-900 mb-3">注文情報</h2>
        <div className="text-sm text-stone-600 space-y-1">
          <p>顧客ID: {order.customer_id}</p>
          <p>
            注文日: {new Date(order.created_at).toLocaleDateString("ja-JP")}
          </p>
          <p>
            更新日: {new Date(order.updated_at).toLocaleDateString("ja-JP")}
          </p>
        </div>
      </Card>
    </div>
  );
}
