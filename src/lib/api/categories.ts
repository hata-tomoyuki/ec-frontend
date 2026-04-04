import type { Category, Product } from "@/types";
import { api } from "./client";


export function getCategories(): Promise<Category[]> {
    return api.get<Category[]>("/categories");
}

export function getCategory(id: number): Promise<Category> {
    return api.get<Category>(`/categories/${id}`)
}

export function getCategoryProducts(id: number): Promise<Product[]> {
    return api.get<Product[]>(`/categories/${id}/products`);
}

export function createCategory(data: {
    name: string;
    description: string;
    image_color: string;
}): Promise<Category> {
    return api.post<Category>("/categories", data);
}

export function updateCategory(id: number, data: {
    name: string;
    description: string;
    image_color: string;
}): Promise<Category> {
    return api.put<Category>(`/categories/${id}`, data);
}

export function deleteCategory(id: number): Promise<void> {
    return api.delete<void>(`/categories/${id}`);
}
