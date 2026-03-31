"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ログイン:", { email, password });
    router.push("/");
  };

  return (
    <Card>
      <h1 className="text-xl font-bold text-stone-800 mb-6">ログイン</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="メールアドレス"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@because.jp"
        />
        <Input
          label="パスワード"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        <Button type="submit" className="w-full">
          ログイン
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-stone-600">
        アカウントをお持ちでないですか？{" "}
        <Link href="/register" className="text-teal-700 hover:underline font-medium">
          新規登録
        </Link>
      </p>
    </Card>
  );
}
