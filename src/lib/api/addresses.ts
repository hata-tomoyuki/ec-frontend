import type { Address } from "@/types";
import { api } from "./client";

export async function getAddresses(): Promise<Address[]> {
  const data = await api.get<Address[] | null>("/addresses");
  return data ?? [];
}

export function getAddress(id: number): Promise<Address> {
  return api.get<Address>(`/addresses/${id}`);
}

export function createAddress(data: {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}): Promise<Address> {
  return api.post<Address>("/addresses", data);
}

export function updateAddress(
  id: number,
  data: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  },
): Promise<Address> {
  return api.put<Address>(`/addresses/${id}`, data);
}

export function deleteAddress(id: number): Promise<void> {
  return api.delete<void>(`/addresses/${id}`);
}
