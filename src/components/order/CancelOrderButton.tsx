"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { cancelOrderAction } from "@/lib/api/order-actions";

interface CancelOrderButtonProps {
  orderId: number;
}

export default function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleCancel() {
    if (!confirm("注文をキャンセルしますか？")) return;

    try {
      await cancelOrderAction(orderId);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "キャ���セルに失敗しました");
    }
  }

  return (
    <div>
      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
      <Button variant="danger" onClick={handleCancel}>
        注文をキャンセル
      </Button>
    </div>
  );
}
