import type { Category, Product } from "@/types";
import { api } from "./client";

export function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/categories");
}

export function getCategory(id: number): Promise<Category> {
  return api.get<Category>(`/categories/${id}`);
}

export async function getCategoryProducts(id: number): Promise<Product[]> {
  const products = await api.get<Product[]>(`/categories/${id}/products`);
  return products.filter((p) => p.quantity > 0);
}

export function createCategory(data: {
  name: string;
  description: string;
  image_color: string;
}): Promise<Category> {
  return api.post<Category>("/categories", data);
}

export function updateCategory(
  id: number,
  data: {
    name: string;
    description: string;
    image_color: string;
  },
): Promise<Category> {
  return api.put<Category>(`/categories/${id}`, data);
}

export function deleteCategory(id: number): Promise<void> {
  return api.delete<void>(`/categories/${id}`);
}

export function addProductToCategory(
  categoryId: number,
  productId: number,
): Promise<void> {
  return api.post<void>(`/categories/${categoryId}/products`, {
    product_id: productId,
  });
}

export function removeProductFromCategory(
  categoryId: number,
  productId: number,
): Promise<void> {
  return api.delete<void>(`/categories/${categoryId}/products/${productId}`);
}
