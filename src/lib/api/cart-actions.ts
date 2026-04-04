"use server";

import { revalidatePath } from "next/cache";
import {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "./cart";

export async function addCartItemAction(productId: number, quantity: number) {
  await addCartItem(productId, quantity);
  revalidatePath("/cart");
}

export async function updateCartItemAction(itemId: number, quantity: number) {
  await updateCartItem(itemId, quantity);
  revalidatePath("/cart");
}

export async function removeCartItemAction(itemId: number) {
  await removeCartItem(itemId);
  revalidatePath("/cart");
}

export async function clearCartAction() {
  await clearCart();
  revalidatePath("/cart");
}
