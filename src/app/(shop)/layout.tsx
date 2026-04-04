import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCart } from "@/lib/api/cart";

async function getCartCount(): Promise<number> {
  try {
    const items = await getCart();
    return items.length;
  } catch {
    return 0;
  }
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartItemCount = await getCartCount();

  return (
    <>
      <Header cartItemCount={cartItemCount} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
