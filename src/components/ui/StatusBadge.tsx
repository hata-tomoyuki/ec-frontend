import type { OrderStatus } from "@/types";
import Badge from "./Badge";

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "success" | "warning" | "danger" | "info";
  }
> = {
  pending: { label: "注文受付", variant: "warning" },
  confirmed: { label: "確認済み", variant: "info" },
  shipped: { label: "発送済み", variant: "info" },
  delivered: { label: "配達完了", variant: "success" },
  cancelled: { label: "キャンセル", variant: "danger" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
