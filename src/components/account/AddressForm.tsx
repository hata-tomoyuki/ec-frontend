"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Address } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AddressFormProps {
  address?: Address;
}

export default function AddressForm({ address }: AddressFormProps) {
  const router = useRouter();
  const [postalCode, setPostalCode] = useState(address?.postal_code || "");
  const [prefecture, setPrefecture] = useState(address?.prefecture || "");
  const [city, setCity] = useState(address?.city || "");
  const [line1, setLine1] = useState(address?.line1 || "");
  const [line2, setLine2] = useState(address?.line2 || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account/addresses");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="郵便番号"
        placeholder="123-4567"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <Input
        label="都道府県"
        placeholder="東京都"
        value={prefecture}
        onChange={(e) => setPrefecture(e.target.value)}
      />
      <Input
        label="市区町村"
        placeholder="渋谷区"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Input
        label="番地"
        placeholder="神宮前1-2-3"
        value={line1}
        onChange={(e) => setLine1(e.target.value)}
      />
      <Input
        label="建物名・部屋番号（任意）"
        placeholder="ABCマンション 401号室"
        value={line2}
        onChange={(e) => setLine2(e.target.value)}
      />
      <div className="flex gap-4">
        <Button type="submit">{address ? "更新する" : "追加する"}</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/account/addresses")}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}
