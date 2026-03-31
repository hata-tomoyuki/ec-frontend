import Card from "@/components/ui/Card";
import ProfileForm from "@/components/account/ProfileForm";

export const metadata = {
  title: "プロフィール編集",
};

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">
        プロフィール編集
      </h1>
      <Card>
        <ProfileForm />
      </Card>
    </div>
  );
}
