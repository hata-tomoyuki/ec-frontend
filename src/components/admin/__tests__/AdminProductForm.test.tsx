import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const mockCreateProductAction = vi.fn().mockResolvedValue(undefined);
const mockUpdateProductAction = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/api/admin-actions", () => ({
  createProductAction: (...args: unknown[]) => mockCreateProductAction(...args),
  updateProductAction: (...args: unknown[]) => mockUpdateProductAction(...args),
}));

const categories: Category[] = [
  {
    id: 1,
    name: "ファッション",
    description: "",
    image_color: "",
    product_count: 5,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "家電",
    description: "",
    image_color: "",
    product_count: 3,
    created_at: "",
    updated_at: "",
  },
];

const product: Product = {
  id: 1,
  name: "テスト商品",
  description: "テスト説明",
  price_in_cents: 4980,
  category_id: 1,
  category_name: "ファッション",
  quantity: 50,
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

  it("sends quantity when creating a product", async () => {
    const user = userEvent.setup();
    render(<AdminProductForm categories={categories} />);

    await user.type(screen.getByLabelText("商品名"), "テスト");
    await user.type(screen.getByLabelText("価格（円）"), "1000");
    await user.type(screen.getByLabelText("在庫数"), "25");
    await user.selectOptions(screen.getByLabelText("カテゴリ"), "1");
    await user.click(screen.getByRole("button", { name: "追加する" }));

    await waitFor(() => {
      expect(mockCreateProductAction).toHaveBeenCalledWith(
        expect.objectContaining({ quantity: 25 }),
      );
    });
  });

  it("sends quantity when updating a product", async () => {
    const user = userEvent.setup();
    render(<AdminProductForm categories={categories} product={product} />);

    await user.click(screen.getByRole("button", { name: "更新する" }));

    await waitFor(() => {
      expect(mockUpdateProductAction).toHaveBeenCalledWith(
        product.id,
        expect.objectContaining({ quantity: 50 }),
      );
    });
  });
});
