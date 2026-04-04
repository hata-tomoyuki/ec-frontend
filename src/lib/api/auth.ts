"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api, ApiError } from "./client";

// --- Types ---

export type AuthState = {
  error?: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

type RegisterResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// --- Cookie helpers ---

const COOKIE_OPTIONS = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
};

async function setAuthCookies(data: LoginResponse) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", data.access_token, {
    ...COOKIE_OPTIONS,
    maxAge: data.expires_in,
  });

  cookieStore.set("refresh_token", data.refresh_token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

// --- Server Actions ---

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const data = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    await setAuthCookies(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: "ログインに失敗しました" };
  }

  redirect("/");
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const lastName = formData.get("last_name") as string;
  const firstName = formData.get("first_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = `${lastName} ${firstName}`;

  try {
    await api.post<RegisterResponse>("/auth/register", {
      name,
      email,
      password,
    });
  } catch (e) {
    if (e instanceof ApiError) {
      return { error: e.message };
    }
    return { error: "登録に失敗しました" };
  }

  redirect("/login");
}

export async function logoutAction(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // logout API failure is non-critical
  }

  await clearAuthCookies();
  redirect("/login");
}
