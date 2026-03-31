import Link from "next/link";
import {
  mockProducts,
  mockCategories,
  mockOrders,
  formatPrice,
} from "@/data/mock";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import StatusBadge from "@/components/ui/StatusBadge";

export default function AdminDashboardPage() {
  const pendingOrders = mockOrders.filter((o) => o.status === "pending");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-stone-900">ダッシュボード</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatsCard
          title="商品数"
          value={mockProducts.length}
          subtitle={`${mockCategories.length} カテゴリ`}
        />
        <AdminStatsCard
          title="カテゴリ数"
          value={mockCategories.length}
        />
        <AdminStatsCard title="注文数" value={mockOrders.length} />
        <AdminStatsCard
          title="未処理注文"
          value={pendingOrders.length}
          subtitle={pendingOrders.length > 0 ? "対応が必要です" : ""}
        />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900">最近の注文</h2>
          <Link
            href="/admin/orders"
            className="text-sm text-teal-700 hover:text-teal-800"
          >
            すべて見る
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200">
                <th className="text-left py-3 px-6 font-medium text-stone-600">
                  注文ID
                </th>
                <th className="text-left py-3 px-6 font-medium text-stone-600">
                  ステータス
                </th>
                <th className="text-right py-3 px-6 font-medium text-stone-600">
                  合計
                </th>
                <th className="text-right py-3 px-6 font-medium text-stone-600">
                  注文日
                </th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-stone-100 last:border-b-0 hover:bg-stone-50"
                >
                  <td className="py-3 px-6">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-stone-800 hover:text-teal-700 font-medium"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-3 px-6">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="py-3 px-6 text-right text-stone-800">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3 px-6 text-right text-stone-500">
                    {new Date(order.created_at).toLocaleDateString("ja-JP")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
