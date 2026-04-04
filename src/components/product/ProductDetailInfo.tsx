import type { Product } from "@/types";
import PriceDisplay from "@/components/ui/PriceDisplay";
import Badge from "@/components/ui/Badge";

interface ProductDetailInfoProps {
  product: Product;
}

export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <Badge>{product.category_name}</Badge>
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-3">
          {product.name}
        </h1>
      </div>

      <PriceDisplay price={product.price_in_cents} size="xl" />

      <div className="prose prose-stone prose-sm max-w-none">
        <p className="text-stone-600 leading-relaxed">{product.description}</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        {product.quantity > 0 ? (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-emerald-700">在庫あり</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-600">在庫切れ</span>
          </>
        )}
      </div>
    </div>
  );
}
