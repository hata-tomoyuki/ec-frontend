import { render, screen } from "@testing-library/react";
import CartSummary from "../CartSummary";
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

const items: CartItem[] = [
  {
    id: 1,
    cart_id: 1,
    product_id: 1,
    quantity: 2,
    product_name: "A",
    product_price_in_cents: 1000,
  },
];

describe("CartSummary", () => {
  it("renders order summary heading", () => {
    render(<CartSummary items={items} />);
    expect(screen.getByText("注文概要")).toBeInTheDocument();
  });

  it("displays subtotal and total", () => {
    render(<CartSummary items={items} />);
    // 1000 yen * 2 = ¥2,000 (shown for subtotal and total)
    const prices = screen.getAllByText("¥2,000");
    expect(prices).toHaveLength(2); // subtotal + total (shipping is free)
  });

  it("shows free shipping", () => {
    render(<CartSummary items={items} />);
    expect(screen.getByText("無料")).toBeInTheDocument();
  });

  it("renders checkout link", () => {
    render(<CartSummary items={items} />);
    expect(screen.getByRole("link", { name: "レジに進む" })).toHaveAttribute(
      "href",
      "/checkout",
    );
  });
});
