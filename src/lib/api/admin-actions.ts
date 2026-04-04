"use server";

import { revalidatePath } from "next/cache";
import { createProduct, updateProduct, deleteProduct } from "./products";
import { createCategory, updateCategory, deleteCategory } from "./categories";
import { updateOrderStatus } from "./orders";
import type { OrderStatus } from "@/types";

export async function createProductAction(data: {
  name: string;
  description: string;
  price_in_cents: number;
  image_color: string;
  quantity: number;
}) {
  await createProduct(data);
  revalidatePath("/admin/products");
}

export async function updateProductAction(
  id: number,
  data: {
    name: string;
    description: string;
    price_in_cents: number;
    image_color: string;
    quantity: number;
  },
) {
  await updateProduct(id, data);
  revalidatePath("/admin/products");
}

export async function deleteProductAction(id: number) {
  await deleteProduct(id);
  revalidatePath("/admin/products");
}

export async function createCategoryAction(data: {
  name: string;
  description: string;
  image_color: string;
}) {
  await createCategory(data);
  revalidatePath("/admin/categories");
}

export async function updateCategoryAction(
  id: number,
  data: {
    name: string;
    description: string;
    image_color: string;
  },
) {
  await updateCategory(id, data);
  revalidatePath("/admin/categories");
}

export async function deleteCategoryAction(id: number) {
  await deleteCategory(id);
  revalidatePath("/admin/categories");
}

export async function updateOrderStatusAction(id: number, status: OrderStatus) {
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}
