import type { Product } from "@/types";
import { api } from "./client";

export function getProducts(): Promise<Product[]> {
  return api.get<Product[]>("/products");
}

export function getProduct(id: number): Promise<Product> {
  return api.get<Product>(`/products/${id}`);
}

export function createProduct(data: {
  name: string;
  description: string;
  price_in_cents: number;
  image_color: string;
}): Promise<Product> {
  return api.post<Product>("/products", data);
}

export function updateProduct(
  id: number,
  data: {
    name: string;
    description: string;
    price_in_cents: number;
    image_color: string;
  },
): Promise<Product> {
  return api.put<Product>(`/products/${id}`, data);
}

export function deleteProduct(id: number): Promise<void> {
  return api.delete<void>(`/products/${id}`);
}
