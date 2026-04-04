"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import QuantitySelector from "@/components/ui/QuantitySelector";

interface AddToCartButtonProps {
  productId: number;
  quantity: number;
}

export default function AddToCartButton({
  productId: _productId,
  quantity: stock,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (stock <= 0) {
    return (
      <Button disabled size="lg" className="w-full">
        在庫切れ
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-stone-600">数量:</span>
        <QuantitySelector
          quantity={quantity}
          onChange={setQuantity}
          max={Math.min(stock, 10)}
        />
      </div>
      <Button onClick={handleAdd} size="lg" className="w-full">
        {added ? "カートに追加しました" : "カートに追加"}
      </Button>
    </div>
  );
}
