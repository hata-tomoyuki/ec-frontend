import Card from "@/components/ui/Card";
import AddressForm from "@/components/account/AddressForm";

export const metadata = {
  title: "住所追加",
};

export default function NewAddressPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">住所を追加</h1>
      <Card>
        <AddressForm />
      </Card>
    </div>
  );
}
