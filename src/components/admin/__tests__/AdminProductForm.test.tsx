import { render, screen } from "@testing-library/react";
import AdminProductForm from "../AdminProductForm";
import type { Product, Category } from "@/types";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
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

const categories: Category[] = [
  {
    id: "c1",
    name: "ファッション",
    description: "",
    image_color: "",
    product_count: 5,
  },
  {
    id: "c2",
    name: "家電",
    description: "",
    image_color: "",
    product_count: 3,
  },
];

const product: Product = {
  id: "p1",
  name: "テスト商品",
  description: "テスト説明",
  price: 498000,
  category_id: "c1",
  category_name: "ファッション",
  stock: 50,
  image_color: "",
  created_at: "",
};

describe("AdminProductForm", () => {
  it("renders form fields for new product", () => {
    render(<AdminProductForm categories={categories} />);
    expect(screen.getByLabelText("商品名")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
    expect(screen.getByLabelText("価格（円）")).toBeInTheDocument();
    expect(screen.getByLabelText("在庫数")).toBeInTheDocument();
    expect(screen.getByLabelText("カテゴリ")).toBeInTheDocument();
  });

  it("shows '追加する' button for new product", () => {
    render(<AdminProductForm categories={categories} />);
    expect(
      screen.getByRole("button", { name: "追加する" }),
    ).toBeInTheDocument();
  });

  it("shows '更新する' button when editing", () => {
    render(<AdminProductForm categories={categories} product={product} />);
    expect(
      screen.getByRole("button", { name: "更新する" }),
    ).toBeInTheDocument();
  });

  it("pre-fills fields with product data when editing", () => {
    render(<AdminProductForm categories={categories} product={product} />);
    expect(screen.getByLabelText("商品名")).toHaveValue("テスト商品");
    // price is stored in sen, displayed in yen
    expect(screen.getByLabelText("価格（円）")).toHaveValue(4980);
    expect(screen.getByLabelText("在庫数")).toHaveValue(50);
  });

  it("renders category options", () => {
    render(<AdminProductForm categories={categories} />);
    expect(screen.getByText("ファッション")).toBeInTheDocument();
    expect(screen.getByText("家電")).toBeInTheDocument();
  });

  it("renders cancel button", () => {
    render(<AdminProductForm categories={categories} />);
    expect(
      screen.getByRole("button", { name: "キャンセル" }),
    ).toBeInTheDocument();
  });
});
