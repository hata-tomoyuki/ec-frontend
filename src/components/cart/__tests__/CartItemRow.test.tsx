import { render, screen } from "@testing-library/react";
import CartItemRow from "../CartItemRow";
import type { CartItem } from "@/types";

vi.mock("@/lib/api/cart-actions", () => ({
  updateCartItemAction: vi.fn().mockResolvedValue(undefined),
  removeCartItemAction: vi.fn().mockResolvedValue(undefined),
}));

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
  id: 1,
  cart_id: 1,
  product_id: 1,
  quantity: 2,
  product_name: "テスト商品",
  product_price_in_cents: 4980,
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
