import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminProductTable from "../AdminProductTable";
import type { Product } from "@/types";

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

const products: Product[] = [
  {
    id: 1,
    name: "商品A",
    description: "",
    price_in_cents: 4980,
    category_id: 1,
    category_name: "カテゴリA",
    quantity: 50,
    image_color: "",
    created_at: "",
  },
  {
    id: 2,
    name: "商品B",
    description: "",
    price_in_cents: 1000,
    category_id: 1,
    category_name: "カテゴリA",
    quantity: 5,
    image_color: "",
    created_at: "",
  },
];

describe("AdminProductTable", () => {
  it("shows empty message when no products", () => {
    render(<AdminProductTable products={[]} />);
    expect(screen.getByText("商品がありません")).toBeInTheDocument();
  });

  it("renders product rows", () => {
    render(<AdminProductTable products={products} />);
    expect(screen.getByText("商品A")).toBeInTheDocument();
    expect(screen.getByText("商品B")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<AdminProductTable products={products} />);
    expect(screen.getByText("商品名")).toBeInTheDocument();
    expect(screen.getByText("カテゴリ")).toBeInTheDocument();
    expect(screen.getByText("価格")).toBeInTheDocument();
    expect(screen.getByText("在庫")).toBeInTheDocument();
  });

  it("shows warning badge for low stock", () => {
    render(<AdminProductTable products={products} />);
    // stock: 5 <= 10 should show as Badge
    expect(screen.getByText("5")).toHaveClass("bg-amber-50");
  });

  it("shows delete confirmation on delete click", async () => {
    const user = userEvent.setup();
    render(<AdminProductTable products={products} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);

    expect(screen.getByRole("button", { name: "確認" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "戻る" })).toBeInTheDocument();
  });

  it("cancels delete on back button click", async () => {
    const user = userEvent.setup();
    render(<AdminProductTable products={products} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);
    await user.click(screen.getByRole("button", { name: "戻る" }));

    expect(
      screen.queryByRole("button", { name: "確認" }),
    ).not.toBeInTheDocument();
  });
});
