import { notFound } from "next/navigation";
import { mockAddresses, getAddressById } from "@/data/mock";
import Card from "@/components/ui/Card";
import AddressForm from "@/components/account/AddressForm";

export async function generateStaticParams() {
  return mockAddresses.map((a) => ({ id: String(a.id) }));
}

export default async function EditAddressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const address = getAddressById(Number(id));

  if (!address) {
    notFound();
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
