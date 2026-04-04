import type { Product, PaginatedProducts } from "@/types";
import { api } from "./client";

export async function getProductsPaginated(params?: {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.sort) query.set("sort", params.sort);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return api.get<PaginatedProducts>(`/products${qs ? `?${qs}` : ""}`);
}

export async function getProducts(): Promise<Product[]> {
  const res = await getProductsPaginated({ limit: 100 });
  return res.data.filter((p) => p.quantity > 0);
}

export function getProduct(id: number): Promise<Product> {
  return api.get<Product>(`/products/${id}`);
}

export function createProduct(data: {
  name: string;
  description: string;
  price_in_cents: number;
  image_color: string;
  quantity: number;
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
    quantity: number;
  },
): Promise<Product> {
  return api.put<Product>(`/products/${id}`, data);
}

export function deleteProduct(id: number): Promise<void> {
  return api.delete<void>(`/products/${id}`);
}
