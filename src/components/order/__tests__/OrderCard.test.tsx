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
  id: "order-1",
  user_id: "user-1",
  status: "delivered",
  total: 1694000,
  items: [
    {
      id: "oi-1",
      product_id: "p1",
      product_name: "商品A",
      price: 498000,
      quantity: 2,
    },
    {
      id: "oi-2",
      product_id: "p2",
      product_name: "商品B",
      price: 398000,
      quantity: 1,
    },
  ],
  shipping_address: {
    id: "addr-1",
    user_id: "user-1",
    postal_code: "150-0001",
    prefecture: "東京都",
    city: "渋谷区",
    line1: "1-2-3",
    line2: "",
    is_default: true,
  },
  created_at: "2024-05-10T14:30:00Z",
  updated_at: "2024-05-15T09:00:00Z",
};

describe("OrderCard", () => {
  it("renders order ID", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("order-1")).toBeInTheDocument();
  });

  it("links to order detail page", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/account/orders/order-1",
    );
  });

  it("renders status badge", () => {
    render(<OrderCard order={order} />);
    expect(screen.getByText("配達完了")).toBeInTheDocument();
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
