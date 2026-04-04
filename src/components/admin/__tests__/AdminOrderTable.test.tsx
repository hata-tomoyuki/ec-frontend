import { render, screen } from "@testing-library/react";
import AdminOrderTable from "../AdminOrderTable";
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

const orders: Order[] = [
  {
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
  },
];

describe("AdminOrderTable", () => {
  it("shows empty message when no orders", () => {
    render(<AdminOrderTable orders={[]} />);
    expect(screen.getByText("注文がありません")).toBeInTheDocument();
  });

  it("renders order row", () => {
    render(<AdminOrderTable orders={orders} />);
    expect(screen.getByRole("link", { name: "1" })).toBeInTheDocument();
    expect(screen.getByText("完了")).toBeInTheDocument();
    expect(screen.getByText("¥16,940")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<AdminOrderTable orders={orders} />);
    expect(screen.getByText("注文ID")).toBeInTheDocument();
    expect(screen.getByText("顧客")).toBeInTheDocument();
    expect(screen.getByText("ステータス")).toBeInTheDocument();
  });

  it("shows total item quantity", () => {
    render(<AdminOrderTable orders={orders} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
