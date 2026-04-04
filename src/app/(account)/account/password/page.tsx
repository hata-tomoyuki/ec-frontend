import Card from "@/components/ui/Card";
import PasswordForm from "@/components/account/PasswordForm";

export const metadata = {
  title: "パスワード変更",
};

export default function PasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">パスワード変更</h1>
      <Card>
        <PasswordForm />
      </Card>
    </div>
  );
}
