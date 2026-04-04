"use client";

import { useState } from "react";
import Link from "next/link";
import type { CartItem } from "@/types";
import PriceDisplay from "@/components/ui/PriceDisplay";
import QuantitySelector from "@/components/ui/QuantitySelector";
import {
  updateCartItemAction,
  removeCartItemAction,
} from "@/lib/api/cart-actions";

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  async function handleQuantityChange(newQuantity: number) {
    setQuantity(newQuantity);
    await updateCartItemAction(item.id, newQuantity);
  }

  async function handleRemove() {
    await removeCartItemAction(item.id);
  }

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 last:border-b-0">
      {/* Image */}
      <Link href={`/products/${item.product_id}`} className="shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gradient-to-br from-stone-300 to-stone-400" />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.product_id}`}
          className="text-sm font-semibold text-stone-800 hover:text-teal-700 transition-colors line-clamp-2"
        >
          {item.product_name}
        </Link>
        <div className="mt-1">
          <PriceDisplay price={item.product_price_in_cents} size="sm" />
        </div>
        <div className="mt-3 flex items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onChange={handleQuantityChange}
            max={10}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-stone-400 hover:text-red-500 transition-colors"
          >
            削除
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="shrink-0 text-right">
        <PriceDisplay
          price={item.product_price_in_cents * quantity}
          size="sm"
        />
      </div>
    </div>
  );
}
