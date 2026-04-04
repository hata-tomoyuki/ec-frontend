import { render, screen } from "@testing-library/react";
import OrderItemRow from "../OrderItemRow";
import type { OrderItem } from "@/types";

const item: OrderItem = {
  id: "oi-1",
  product_id: "p1",
  product_name: "プレミアムTシャツ",
  price: 498000,
  quantity: 2,
};

describe("OrderItemRow", () => {
  it("renders product name", () => {
    render(<OrderItemRow item={item} />);
    expect(screen.getByText("プレミアムTシャツ")).toBeInTheDocument();
  });

  it("displays unit price and quantity", () => {
    render(<OrderItemRow item={item} />);
    expect(screen.getByText("¥4,980 × 2")).toBeInTheDocument();
  });

  it("displays line total", () => {
    render(<OrderItemRow item={item} />);
    // 498000 * 2 = 996000 sen = ¥9,960
    expect(screen.getByText("¥9,960")).toBeInTheDocument();
  });
});
