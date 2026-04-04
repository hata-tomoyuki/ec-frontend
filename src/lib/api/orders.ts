import type { Order, OrderRow, OrderStatus } from "@/types";
import { api } from "./client";

export function getOrders(): Promise<OrderRow[]> {
  return api.get<OrderRow[]>("/orders");
}

export function getOrder(id: number): Promise<OrderRow[]> {
  return api.get<OrderRow[]>(`/orders/${id}`);
}

export function placeOrder(
  items: { product_id: number; quantity: number }[],
): Promise<OrderRow[]> {
  return api.post<OrderRow[]>("/orders", { items });
}

export function cancelOrder(id: number): Promise<void> {
  return api.put<void>(`/orders/${id}/cancel`);
}

export function getAdminOrders(): Promise<OrderRow[]> {
  return api.get<OrderRow[]>("/admin/orders");
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
        }
        ],
        total: row.quantity * row.price_in_cents,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }
      ordersMap.set(row.id, order)
    } else {
      order.items.push({
        product_id: row.product_id,
        quantity: row.quantity,
        price_in_cents: row.price_in_cents,
      })
      order.total += row.quantity * row.price_in_cents;
    }
  }
  return Array.from(ordersMap.values());
}
