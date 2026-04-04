import type { User } from "@/types";
import { api } from "./client";

export function getMe(): Promise<User> {
  return api.get<User>("/users/me");
}

export function updateProfile(data: {
  name: string;
  email: string;
}): Promise<User> {
  return api.put<User>("/users/me", data);
}

export function updatePassword(data: {
  current_password: string;
  new_password: string;
}): Promise<void> {
  return api.put<void>("/users/me/password", data);
}
