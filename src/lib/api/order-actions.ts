"use server";

import { revalidatePath } from "next/cache";
import { cancelOrder } from "./orders";

export async function cancelOrderAction(id: number) {
  await cancelOrder(id);
  revalidatePath("/account/orders");
}
