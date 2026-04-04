"use client";

import { useActionState } from "react";
import { updateProfileAction, ProfileState } from "@/lib/api/user-actions";
import type { User } from "@/types";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState<ProfileState, FormData>(
    updateProfileAction,
    {},
  );
  return (
    <form action={formAction} className="space-y-6">
      <Input
        label="名前"
        name="name"
        type="text"
        required
        defaultValue={user.name}
      />
      <Input
        label="メールアドレス"
        name="email"
        type="email"
        required
        defaultValue={user.email}
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-emerald-600">ユーザー情報を更新しました</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "更新中..." : "ユーザー情報を更新"}
      </Button>
    </form>
  );
}
