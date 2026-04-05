import type { Order, OrderRow, OrderStatus } from "@/types";
import { api } from "./client";

export async function getOrders(): Promise<Order[]> {
  const res = await api.get<{ data: PaginatedOrderRow[] }>("/orders");
  return res.data.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    status: row.status,
    items: [],
    total: row.total_in_cents,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export async function getOrder(id: number): Promise<OrderRow[]> {
  const data = await api.get<OrderRow[] | null>(`/orders/${id}`);
  return data ?? [];
}

export function placeOrder(
  items: { product_id: number; quantity: number }[],
): Promise<OrderRow[]> {
  return api.post<OrderRow[]>("/orders", { items });
}

export function cancelOrder(id: number): Promise<void> {
  return api.put<void>(`/orders/${id}/cancel`);
}

interface PaginatedOrderRow {
  id: number;
  customer_id: number;
  status: OrderStatus;
  item_count: number;
  total_in_cents: number;
  created_at: string;
  updated_at: string;
}

export async function getAdminOrders(): Promise<Order[]> {
  const res = await api.get<{ data: PaginatedOrderRow[] }>("/admin/orders");
  return res.data.map((row) => ({
    id: row.id,
    customer_id: row.customer_id,
    status: row.status,
    items: [],
    total: row.total_in_cents,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

export async function getAdminOrder(id: number): Promise<OrderRow[]> {
  const data = await api.get<OrderRow[] | null>(`/admin/orders/${id}`);
  return data ?? [];
}

export function updateOrderStatus(
  id: number,
  status: OrderStatus,
): Promise<void> {
  return api.put<void>(`/admin/orders/${id}/status`, { status });
}

export function groupOrderRows(rows: OrderRow[]): Order[] {
  const ordersMap = new Map<number, Order>();
  for (const row of rows) {
    let order = ordersMap.get(row.id);
    if (!order) {
      order = {
        id: row.id,
        customer_id: row.customer_id,
        status: row.status,
        items: [
          {
            product_id: row.product_id,
            quantity: row.quantity,
            price_in_cents: row.price_in_cents,
          },
        ],
        total: row.quantity * row.price_in_cents,
        created_at: row.created_at,
        updated_at: row.updated_at,
      };
      ordersMap.set(row.id, order);
    } else {
      order.items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price_in_cents: row.price_in_cents,
      });
      order.total += row.quantity * row.price_in_cents;
    }
  }
  return Array.from(ordersMap.values()).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
