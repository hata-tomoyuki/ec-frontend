import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCart } from "@/lib/api/cart";
import { getMe } from "@/lib/api/users";

async function getHeaderData() {
  let cartItemCount = 0;
  let userName = "";
  let userEmail = "";
  try {
    const [items, user] = await Promise.all([getCart(), getMe()]);
    cartItemCount = items.length;
    userName = user.name;
    userEmail = user.email;
  } catch {
    // 未ログイン時はデフォルト値
  }
  return { cartItemCount, userName, userEmail };
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartItemCount, userName, userEmail } = await getHeaderData();

  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        userName={userName}
        userEmail={userEmail}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
