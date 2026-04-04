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
    id: "c1",
    product_id: "p1",
    product: {
      id: "p1",
      name: "A",
      description: "",
      price: 100000,
      category_id: "c1",
      category_name: "",
      stock: 10,
      image_color: "",
      created_at: "",
    },
    quantity: 2,
  },
];

describe("CartSummary", () => {
  it("renders order summary heading", () => {
    render(<CartSummary items={items} />);
    expect(screen.getByText("注文概要")).toBeInTheDocument();
  });

  it("displays subtotal and total", () => {
    render(<CartSummary items={items} />);
    // 100000 sen * 2 = 200000 sen = ¥2,000 (shown for subtotal and total)
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
