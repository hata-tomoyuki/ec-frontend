"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/api/auth";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    loginAction,
    {},
  );

  return (
    <Card>
      <h1 className="text-xl font-bold text-stone-800 mb-6">ログイン</h1>
      <form action={formAction} className="space-y-4">
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
          {pending ? "ログイン中..." : "ログイン"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-stone-600">
        アカウントをお持ちでないですか？{" "}
        <Link
          href="/register"
          className="text-teal-700 hover:underline font-medium"
        >
          新規登録
        </Link>
      </p>
    </Card>
  );
}
