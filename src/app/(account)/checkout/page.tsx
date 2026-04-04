import { redirect } from "next/navigation";
import { getCart } from "@/lib/api/cart";
import { getAddresses } from "@/lib/api/addresses";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "チェックアウト",
};

export default async function CheckoutPage() {
  const [items, addresses] = await Promise.all([getCart(), getAddresses()]);

  if (items.length === 0) {
    redirect("/cart");
  }

  return <CheckoutForm addresses={addresses} items={items} />;
}
