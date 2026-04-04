import type { CartItem } from "@/types";
import { api } from "./client";

export function getCart(): Promise<CartItem[]> {
  return api.get<CartItem[]>("/cart");
}

export function addCartItem(
  productId: number,
  quantity: number,
): Promise<CartItem> {
  return api.post<CartItem>("/cart/items", {
    product_id: productId,
    quantity,
  });
}

export function updateCartItem(
  itemId: number,
  quantity: number,
): Promise<CartItem> {
  return api.put<CartItem>(`/cart/items/${itemId}`, { quantity });
}

export function removeCartItem(itemId: number): Promise<void> {
  return api.delete<void>(`/cart/items/${itemId}`);
}

export function clearCart(): Promise<void> {
  return api.delete<void>("/cart");
}
