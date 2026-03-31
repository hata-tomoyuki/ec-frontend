import type { CartItem } from "@/types";
import { formatPrice, getCartTotal } from "@/data/mock";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = getCartTotal(items);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-6">
      <h2 className="text-lg font-bold text-stone-900 mb-4">注文概要</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-stone-600">小計</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-600">送料</span>
          <span className="font-medium text-emerald-600">無料</span>
        </div>
        <div className="border-t border-stone-200 pt-3 flex justify-between">
          <span className="font-bold text-stone-900">合計</span>
          <span className="font-bold text-lg text-stone-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <div className="mt-6">
        <Button href="/checkout" size="lg" className="w-full">
          レジに進む
        </Button>
      </div>
    </div>
  );
}
