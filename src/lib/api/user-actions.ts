"use server";

import type { User } from "@/types";
import { api, ApiError } from "./client";

export type ProfileState = {
  error?: string;
  success?: boolean;
};

export type PasswordState = {
  error?: string;
  success?: boolean;
};

export async function updateProfileAction(
  _prevState: ProfileState,
  formData: FormData,
): Promise<ProfileState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  try {
    await api.put<User>("/users/me", { name, email });
    return { success: true };
  } catch (e) {
    if (e instanceof ApiError) {
      return { error: e.message };
    }
    return { error: "プロフィールの更新に失敗しました" };
  }
}

export async function updatePasswordAction(
  _prevState: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const currentPassword = formData.get("current_password") as string;
  const newPassword = formData.get("new_password") as string;
  const confirmPassword = formData.get("confirm_password") as string;

  if (newPassword !== confirmPassword) {
    return { error: "新しいパスワードが一致しません" };
  }

  try {
    await api.put<void>("/users/me/password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return { success: true };
  } catch (e) {
    if (e instanceof ApiError) {
      return { error: e.message };
    }
    return { error: "パスワードの変更に失敗しました" };
  }
}
