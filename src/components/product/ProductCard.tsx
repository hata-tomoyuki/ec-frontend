import Link from "next/link";
import type { Product } from "@/types";
import PriceDisplay from "@/components/ui/PriceDisplay";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
        <div
          className={`aspect-square bg-gradient-to-br ${product.image_color} flex items-center justify-center`}
        >
          <span className="text-white/80 text-sm font-medium">
            {product.category_name}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold text-stone-800 group-hover:text-teal-700 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
          <PriceDisplay price={product.price} size="md" />
        </div>
      </div>
    </Link>
  );
}
