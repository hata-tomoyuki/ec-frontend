"use client";

import { useState } from "react";
import { mockUser } from "@/data/mock";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProfileForm() {
  const [lastName, setLastName] = useState(mockUser.last_name);
  const [firstName, setFirstName] = useState(mockUser.first_name);
  const [email, setEmail] = useState(mockUser.email);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="姓"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="名"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <Input
        label="メールアドレス"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <Button type="submit">
          {saved ? "保存しました" : "保存する"}
        </Button>
      </div>
    </form>
  );
}
