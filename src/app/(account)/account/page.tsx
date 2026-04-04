import Link from "next/link";
import { getMe } from "@/lib/api/users";
import { getOrders, groupOrderRows } from "@/lib/api/orders";
import { getAddresses } from "@/lib/api/addresses";
import Card from "@/components/ui/Card";

export const metadata = {
  title: "マイページ",
};

export default async function AccountDashboardPage() {
  const [user, orderRows, addresses] = await Promise.all([
    getMe(),
    getOrders(),
    getAddresses(),
  ]);
  const orders = groupOrderRows(orderRows);

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-2">マイページ</h1>
      <p className="text-stone-500 mb-8">
        ようこそ、{user.name}さん
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link href="/account/orders" className="group">
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">
                  {orders.length}
                </p>
                <p className="text-sm text-stone-500">注文</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/account/addresses" className="group">
          <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-900">
                  {addresses.length}
                </p>
                <p className="text-sm text-stone-500">登録住所</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
