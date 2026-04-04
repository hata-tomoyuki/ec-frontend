import type { OrderItem } from "@/types";
import { formatPrice } from "@/data/mock";

interface OrderItemRowProps {
  item: OrderItem;
}

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-b-0">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-stone-300 to-stone-400 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-800 line-clamp-1">
          商品ID: {item.product_id}
        </p>
        <p className="text-sm text-stone-500">
          {formatPrice(item.price_in_cents)} × {item.quantity}
        </p>
      </div>
      <p className="text-sm font-medium text-stone-800 shrink-0">
        {formatPrice(item.price_in_cents * item.quantity)}
      </p>
    </div>
  );
}
