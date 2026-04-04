import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("renders brand name", () => {
    render(<Footer />);
    expect(screen.getByText("BECAUSE")).toBeInTheDocument();
  });

  it("renders shop links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "商品一覧" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "カテゴリ" })).toHaveAttribute(
      "href",
      "/categories",
    );
  });

  it("renders account links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "マイページ" })).toHaveAttribute(
      "href",
      "/account",
    );
    expect(screen.getByRole("link", { name: "注文履歴" })).toHaveAttribute(
      "href",
      "/account/orders",
    );
    expect(screen.getByRole("link", { name: "住所管理" })).toHaveAttribute(
      "href",
      "/account/addresses",
    );
  });

  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 BECAUSE/)).toBeInTheDocument();
  });
});
