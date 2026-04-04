import { render, screen } from "@testing-library/react";
import OrderCard from "../OrderCard";
import type { Order } from "@/types";

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

const order: Order = {
  id: 1,
  customer_id: 1,
  status: "completed",
  total: 16940,
  items: [
    { product_id: 1, quantity: 2, price_in_cents: 4980 },
    { product_id: 2, quantity: 1, price_in_cents: 3980 },
  ],
  created_at: "2024-05-10T14:30:00Z",
  updated_at: "2024-05-15T09:00:00Z",
};

describe("OrderCard", () => {
  it("renders order ID", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("links to order detail page", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/account/orders/1",
    );
  });

  it("renders status badge", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("完了")).toBeInTheDocument();
  });

  it("displays total price", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("¥16,940")).toBeInTheDocument();
  });

  it("shows item count", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("2点の商品")).toBeInTheDocument();
  });
});
