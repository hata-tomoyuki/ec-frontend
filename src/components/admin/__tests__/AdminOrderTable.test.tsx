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
    id: "order-1",
    user_id: "user-1",
    status: "delivered",
    total: 16940,
    items: [
      {
        id: "oi-1",
        product_id: "p1",
        product_name: "A",
        price: 4980,
        quantity: 2,
      },
      {
        id: "oi-2",
        product_id: "p2",
        product_name: "B",
        price: 3980,
        quantity: 1,
      },
    ],
    shipping_address: {
      id: "a1",
      user_id: "u1",
      postal_code: "150-0001",
      prefecture: "東京都",
      city: "渋谷区",
      line1: "1-2-3",
      line2: "",
      is_default: true,
    },
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
    expect(screen.getByText("order-1")).toBeInTheDocument();
    expect(screen.getByText("配達完了")).toBeInTheDocument();
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
    // 2 + 1 = 3 items total
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
