import { render, screen } from "@testing-library/react";
import ProductDetailInfo from "../ProductDetailInfo";
import type { Product } from "@/types";

const inStockProduct: Product = {
  id: 1,
  name: "テスト商品",
  description: "詳細な説明文です",
  price_in_cents: 12800,
  category_id: 1,
  category_name: "ファッション",
  quantity: 20,
  image_color: "from-blue-400 to-blue-600",
  created_at: "2024-01-01T00:00:00Z",
};

const outOfStockProduct: Product = {
  ...inStockProduct,
  quantity: 0,
};

describe("ProductDetailInfo", () => {
  it("renders product name and description", () => {
    render(<ProductDetailInfo product={inStockProduct} />);
    expect(
      screen.getByRole("heading", { name: "テスト商品" }),
    ).toBeInTheDocument();
    expect(screen.getByText("詳細な説明文です")).toBeInTheDocument();
  });

  it("renders category badge", () => {
    render(<ProductDetailInfo product={inStockProduct} />);
    expect(screen.getByText("ファッション")).toBeInTheDocument();
  });

  it("renders price", () => {
    render(<ProductDetailInfo product={inStockProduct} />);
    expect(screen.getByText("¥12,800")).toBeInTheDocument();
  });

  it("shows in-stock indicator when stock > 0", () => {
    render(<ProductDetailInfo product={inStockProduct} />);
    expect(screen.getByText("在庫あり")).toBeInTheDocument();
  });

  it("shows out-of-stock indicator when stock is 0", () => {
    render(<ProductDetailInfo product={outOfStockProduct} />);
    expect(screen.getByText("在庫切れ")).toBeInTheDocument();
  });
});
