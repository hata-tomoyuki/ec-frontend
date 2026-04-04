import { getAddresses } from "@/lib/api/addresses";
import Button from "@/components/ui/Button";
import AddressCard from "@/components/account/AddressCard";
import EmptyState from "@/components/ui/EmptyState";

export const metadata = {
  title: "住所管理",
};

export default async function AddressesPage() {
  const addresses = await getAddresses();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-stone-900">住所管理</h1>
        <Button href="/account/addresses/new" size="sm">
          住所を追加
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="住所が登録されていません"
          description="配送先住所を追加してください。"
          actionLabel="住所を追加"
          actionHref="/account/addresses/new"
        />
      )}
    </div>
  );
}
