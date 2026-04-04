import type { User } from "@/types";
import { api } from "./client";

export function getMe(): Promise<User> {
  return api.get<User>("/users/me");
}
