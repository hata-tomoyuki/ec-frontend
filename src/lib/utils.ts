import type { CartItem } from "@/types";

export function getCartTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
