import Button from "@/components/ui/Button";

export const metadata = {
  title: "注文完了",
};

export default function CheckoutCompletePage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-emerald-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-stone-900 mb-2">
        ご注文ありがとうございます
      </h1>
      <p className="text-stone-500 mb-8">
        注文が確定されました。確認メールをお送りしました。
      </p>
      <div className="flex justify-center gap-4">
        <Button href="/account/orders">注文履歴を見る</Button>
        <Button href="/" variant="outline">
          トップページに戻る
        </Button>
      </div>
    </div>
  );
}
