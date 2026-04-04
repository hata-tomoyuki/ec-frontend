import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCart } from "@/lib/api/cart";
import { getMe } from "@/lib/api/users";

async function getHeaderData() {
  let cartItemCount = 0;
  let userName = "";
  let userEmail = "";
  let userRole = "";

  try {
    const user = await getMe();
    userName = user.name;
    userEmail = user.email;
    userRole = user.role;
  } catch {
    // 未ログイン
  }

  try {
    const items = await getCart();
    cartItemCount = items.length;
  } catch {
    // カート取得失敗
  }

  return { cartItemCount, userName, userEmail, userRole };
}

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartItemCount, userName, userEmail, userRole } =
    await getHeaderData();

  return (
    <>
      <Header
        cartItemCount={cartItemCount}
        userName={userName}
        userEmail={userEmail}
        userRole={userRole}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
