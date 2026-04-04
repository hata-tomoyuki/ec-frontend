import Link from "next/link";
import type { Address } from "@/types";

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm font-medium text-stone-800">
          〒{address.zip_code}
        </span>
        <Link
          href={`/account/addresses/${address.id}`}
          className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
        >
          編集
        </Link>
      </div>
      <p className="text-sm text-stone-600">
        {address.state}
        {address.city}
        {address.street}
      </p>
    </div>
  );
}
