import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "新規登録",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
