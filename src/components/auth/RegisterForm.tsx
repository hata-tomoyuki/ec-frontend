"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("新規登録:", { lastName, firstName, email, password });
    router.push("/");
  };

  return (
    <Card>
      <h1 className="text-xl font-bold text-stone-800 mb-6">新規登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="姓"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="山田"
          />
          <Input
            label="名"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="太郎"
          />
        </div>
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
          登録する
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-stone-600">
        アカウントをお持ちですか？{" "}
        <Link href="/login" className="text-teal-700 hover:underline font-medium">
          ログイン
        </Link>
      </p>
    </Card>
  );
}
