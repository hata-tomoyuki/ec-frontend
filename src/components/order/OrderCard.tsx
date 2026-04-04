import Link from "next/link";
import type { Order } from "@/types";
import { formatPrice } from "@/data/mock";
import StatusBadge from "@/components/ui/StatusBadge";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const date = new Date(order.created_at).toLocaleDateString("ja-JP");

  return (
    <Link href={`/account/orders/${order.id}`} className="block group">
      <div className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-mono text-stone-500">
            注文 #{order.id}
          </span>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-stone-500">{date}</span>
          <span className="font-bold text-stone-900">
            {formatPrice(order.total)}
          </span>
        </div>
        <p className="mt-2 text-sm text-stone-500">
          {order.items.length}点の商品
        </p>
      </div>
    </Link>
  );
}
