"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Address } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createAddressAction, updateAddressAction} from "@/lib/api/address-actions";

interface AddressFormProps {
  address?: Address;
}

export default function AddressForm({ address }: AddressFormProps) {
  const router = useRouter();
  const [zipCode, setZipCode] = useState(address?.zip_code || "");
  const [state, setState] = useState(address?.state || "");
  const [city, setCity] = useState(address?.city || "");
  const [street, setStreet] = useState(address?.street || "");
  const [country, setCountry] = useState(address?.country || "Japan");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const data = {
      zip_code: zipCode,
      state,
      city,
      street,
      country,
    }

    try {
      if (address) await updateAddressAction(address.id, data);
      else await createAddressAction(data);
      router.push("/account/addresses");
    } catch(e) {
      setError(e instanceof Error ? e.message : "保存に失敗しました")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="郵便番号"
        placeholder="123-4567"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <Input
        label="都道府県"
        placeholder="東京都"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <Input
        label="市区町村"
        placeholder="渋谷区"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Input
        label="住所"
        placeholder="神宮前1-2-3 ABCマンション 401号室"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <Input
        label="国"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
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
