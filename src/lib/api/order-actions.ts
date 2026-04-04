"use server";

import { revalidatePath } from "next/cache";
import { placeOrder, cancelOrder } from "./orders";
import { clearCart } from "./cart";

export async function placeOrderAction(
  items: { product_id: number; quantity: number }[],
) {
  await placeOrder(items);
  await clearCart();
  revalidatePath("/account/orders");
  revalidatePath("/cart");
}

export async function cancelOrderAction(id: number) {
  await cancelOrder(id);
  revalidatePath("/account/orders");
}
