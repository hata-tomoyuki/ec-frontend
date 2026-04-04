import { render, screen } from "@testing-library/react";
import CartItemRow from "../CartItemRow";
import type { CartItem } from "@/types";

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

const item: CartItem = {
  id: "cart-1",
  product_id: "p1",
  product: {
    id: 1,
    name: "テスト商品",
    description: "",
    price_in_cents: 4980,
    category_id: 1,
    category_name: "Cat",
    quantity: 10,
    image_color: "from-blue-400 to-blue-600",
    created_at: "2024-01-01T00:00:00Z",
  },
  quantity: 2,
};

describe("CartItemRow", () => {
  it("renders product name", () => {
    render(<CartItemRow item={item} />);
    expect(screen.getByText("テスト商品")).toBeInTheDocument();
  });

  it("links to product detail", () => {
    render(<CartItemRow item={item} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/products/1");
  });

  it("shows delete button", () => {
    render(<CartItemRow item={item} />);
    expect(screen.getByRole("button", { name: "削除" })).toBeInTheDocument();
  });

  it("displays quantity selector with initial quantity", () => {
    render(<CartItemRow item={item} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
