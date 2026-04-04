import Link from "next/link";
import type { Order } from "@/types";
import { formatPrice } from "@/data/mock";
import StatusBadge from "@/components/ui/StatusBadge";

interface AdminOrderTableProps {
  orders: Order[];
}

export default function AdminOrderTable({ orders }: AdminOrderTableProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-stone-500">注文がありません</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              注文ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              顧客
            </th>
            <th className="text-left py-3 px-4 font-medium text-stone-600">
              ステータス
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              商品数
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              合計
            </th>
            <th className="text-right py-3 px-4 font-medium text-stone-600">
              注文日
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-stone-100 hover:bg-stone-50"
            >
              <td className="py-3 px-4">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="text-stone-800 hover:text-teal-700 font-medium"
                >
                  {order.id}
                </Link>
              </td>
              <td className="py-3 px-4 text-stone-600">{order.customer_id}</td>
              <td className="py-3 px-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="py-3 px-4 text-right text-stone-800">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className="py-3 px-4 text-right text-stone-800">
                {formatPrice(order.total)}
              </td>
              <td className="py-3 px-4 text-right text-stone-500">
                {new Date(order.created_at).toLocaleDateString("ja-JP")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
