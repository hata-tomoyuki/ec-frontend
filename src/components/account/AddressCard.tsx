import Link from "next/link";
import type { Address } from "@/types";
import Badge from "@/components/ui/Badge";

interface AddressCardProps {
  address: Address;
}

export default function AddressCard({ address }: AddressCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-800">
            〒{address.postal_code}
          </span>
          {address.is_default && <Badge variant="success">デフォルト</Badge>}
        </div>
        <Link
          href={`/account/addresses/${address.id}`}
          className="text-sm text-teal-700 hover:text-teal-800 font-medium transition-colors"
        >
          編集
        </Link>
      </div>
      <p className="text-sm text-stone-600">
        {address.prefecture}
        {address.city}
        {address.line1}
      </p>
      {address.line2 && (
        <p className="text-sm text-stone-600">{address.line2}</p>
      )}
    </div>
  );
}
