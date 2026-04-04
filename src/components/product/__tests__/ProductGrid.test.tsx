import { render, screen } from "@testing-library/react";
import ProductGrid from "../ProductGrid";
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

const makeProduct = (id: number, name: string): Product => ({
  id,
  name,
  description: "",
  price_in_cents: 1000,
  category_id: 1,
  category_name: "Cat",
  quantity: 5,
  image_color: "from-gray-400 to-gray-600",
  created_at: "2024-01-01T00:00:00Z",
});

describe("ProductGrid", () => {
  it("renders all products", () => {
    const products = [
      makeProduct(1, "商品A"),
      makeProduct(2, "商品B"),
      makeProduct(3, "商品C"),
    ];
    render(<ProductGrid products={products} />);
    expect(screen.getByText("商品A")).toBeInTheDocument();
    expect(screen.getByText("商品B")).toBeInTheDocument();
    expect(screen.getByText("商品C")).toBeInTheDocument();
  });

  it("renders nothing for empty array", () => {
    const { container } = render(<ProductGrid products={[]} />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});
