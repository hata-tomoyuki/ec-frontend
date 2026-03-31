"use client";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-stone-300 rounded-lg">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="px-3 py-1.5 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-l-lg"
        aria-label="数量を減らす"
      >
        −
      </button>
      <span className="px-3 py-1.5 text-sm font-medium min-w-[2.5rem] text-center border-x border-stone-300">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="px-3 py-1.5 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-r-lg"
        aria-label="数量を増やす"
      >
        +
      </button>
    </div>
  );
}
