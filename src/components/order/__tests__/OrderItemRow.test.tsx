import { render, screen } from "@testing-library/react";
import OrderItemRow from "../OrderItemRow";
import type { OrderItem } from "@/types";

const item: OrderItem = {
  product_id: 1,
  quantity: 2,
  price_in_cents: 4980,
};

describe("OrderItemRow", () => {
  it("renders product ID", () => {
    render(<OrderItemRow item={item} />);
    expect(screen.getByText("商品ID: 1")).toBeInTheDocument();
  });

  it("displays unit price and quantity", () => {
    render(<OrderItemRow item={item} />);
    expect(screen.getByText("¥4,980 × 2")).toBeInTheDocument();
  });

  it("displays line total", () => {
    render(<OrderItemRow item={item} />);
    // 4980 * 2 = ¥9,960
    expect(screen.getByText("¥9,960")).toBeInTheDocument();
  });
});
