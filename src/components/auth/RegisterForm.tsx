"use client";

import { useActionState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { registerAction, type AuthState } from "@/lib/api/auth";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    registerAction,
    {},
  );

  return (
    <Card>
      <h1 className="text-xl font-bold text-stone-800 mb-6">新規登録</h1>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="姓"
            name="last_name"
            type="text"
            required
            placeholder="山田"
          />
          <Input
            label="名"
            name="first_name"
            type="text"
            required
            placeholder="太郎"
          />
        </div>
        <Input
          label="メールアドレス"
          name="email"
          type="email"
          required
          placeholder="example@because.jp"
        />
        <Input
          label="パスワード"
          name="password"
          type="password"
          required
          placeholder="••••••••"
        />
        {state.error && <p className="text-sm text-red-600">{state.error}</p>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "登録中..." : "登録する"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-stone-600">
        アカウントをお持ちですか？{" "}
        <Link
          href="/login"
          className="text-teal-700 hover:underline font-medium"
        >
          ログイン
        </Link>
      </p>
    </Card>
  );
}
