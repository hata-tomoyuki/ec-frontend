"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setCurrent("");
    setNewPassword("");
    setConfirm("");
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="現在のパスワード"
        type="password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <Input
        label="新しいパスワード"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        label="新しいパスワード（確認）"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <Button type="submit">
        {saved ? "変更しました" : "パスワードを変更"}
      </Button>
    </form>
  );
}
