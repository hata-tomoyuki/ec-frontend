import { getMe } from "@/lib/api/users";
import Card from "@/components/ui/Card";
import ProfileForm from "@/components/account/ProfileForm";

export const metadata = {
  title: "プロフィール編集",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">
        プロフィール編集
      </h1>
      <Card>
        <ProfileForm user={user} />
      </Card>
    </div>
  );
}
