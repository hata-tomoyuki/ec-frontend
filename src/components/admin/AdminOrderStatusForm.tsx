"use client";

import { useState } from "react";
import type { OrderStatus } from "@/types";
import { orderStatusOptions } from "@/data/mock";
import Button from "@/components/ui/Button";

interface AdminOrderStatusFormProps {
  currentStatus: OrderStatus;
  orderId: string;
}

export default function AdminOrderStatusForm({
  currentStatus,
  orderId,
}: AdminOrderStatusFormProps) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: API呼び出し
    console.log("Update order status:", { orderId, status });
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="space-y-1.5">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-stone-700"
        >
          ステータス
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as OrderStatus)}
          className="block w-48 rounded-lg border border-stone-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700"
        >
          {orderStatusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" size="md" disabled={status === currentStatus}>
        更新
      </Button>
    </form>
  );
}
