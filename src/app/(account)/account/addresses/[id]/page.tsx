import { notFound } from "next/navigation";
import { getAddress } from "@/lib/api/addresses";
import { ApiError } from "@/lib/api/client";
import Card from "@/components/ui/Card";
import AddressForm from "@/components/account/AddressForm";

export default async function EditAddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let address;
  try {
    address = await getAddress(Number(id));
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      notFound();
    }
    throw e;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">住所を編集</h1>
      <Card>
        <AddressForm address={address} />
      </Card>
    </div>
  );
}
