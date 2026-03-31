import { formatPrice } from "@/data/mock";

interface PriceDisplayProps {
  price: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
};

export default function PriceDisplay({
  price,
  size = "md",
  className = "",
}: PriceDisplayProps) {
  return (
    <span
      className={`font-bold text-stone-900 ${sizeStyles[size]} ${className}`}
    >
      {formatPrice(price)}
    </span>
  );
}
