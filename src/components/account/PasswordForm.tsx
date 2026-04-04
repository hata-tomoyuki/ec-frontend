"use client";

import { useActionState } from "react";
import {
  updatePasswordAction,
  type PasswordState,
} from "@/lib/api/user-actions";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState<PasswordState, FormData>(
    updatePasswordAction,
    {},
  );

  return (
    <form action={formAction} className="space-y-6">
      <Input
        label="現在のパスワード"
        name="current_password"
        type="password"
        required
      />
      <Input
        label="新しいパスワード"
        name="new_password"
        type="password"
        required
      />
      <Input
        label="新しいパスワード（確認）"
        name="confirm_password"
        type="password"
        required
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-emerald-600">パスワードを変更しました</p>
      )}
      <Button type="submit" disabled={pending}>
        {pending ? "変更中..." : "パスワードを変更"}
      </Button>
    </form>
  );
}
