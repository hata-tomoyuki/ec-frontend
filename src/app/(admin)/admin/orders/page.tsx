import { getAdminOrders, groupOrderRows } from "@/lib/api/orders";
import AdminOrderTable from "@/components/admin/AdminOrderTable";

export default async function AdminOrdersPage() {
  const rows = await getAdminOrders();
  const orders = groupOrderRows(rows);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-stone-900">注文管理</h1>
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <AdminOrderTable orders={orders} />
      </div>
    </div>
  );
}
