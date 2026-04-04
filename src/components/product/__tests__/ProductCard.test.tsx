import { render, screen } from "@testing-library/react";
import ProductCard from "../ProductCard";
import type { Product } from "@/types";

vi.mock("next/link", () => ({
  default: (props: Record<string, unknown>) => {
    const { href, children, className, ...rest } = props;
    return (
      <a href={href as string} className={className as string} {...rest}>
        {children as React.ReactNode}
      </a>
    );
  },
}));

const product: Product = {
  id: "p1",
  name: "テスト商品",
  description: "説明",
  price: 498000,
  category_id: "c1",
  category_name: "テストカテゴリ",
  stock: 10,
  image_color: "from-blue-400 to-blue-600",
  created_at: "2024-01-01T00:00:00Z",
};

describe("ProductCard", () => {
  it("renders product name and category", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("テスト商品")).toBeInTheDocument();
    expect(screen.getByText("テストカテゴリ")).toBeInTheDocument();
  });

  it("links to product detail page", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/products/p1");
  });

  it("displays formatted price", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("¥4,980")).toBeInTheDocument();
  });
});
