"use client";

import { useState } from "react";
import Link from "next/link";
import type { Address } from "@/types";
import { deleteAddressAction } from "@/lib/api/address-actions";

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("この住所を削除しますか？")) return;
    setDeleting(true);
    try {
      await deleteAddressAction(address.id);
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-stone-800">
          〒{address.zip_code}
        </span>
        <div className="flex items-center gap-3">
          <Link
            href={`/account/addresses/${address.id}`}
            className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
          >
            編集
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
          >
            {deleting ? "削除中..." : "削除"}
          </button>
        </div>
      </div>
      <p className="text-sm text-stone-600">
        {address.state}
        {address.city}
        {address.street}
      </p>
    </div>
  );
}
