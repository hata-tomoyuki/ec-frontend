import { render, screen } from "@testing-library/react";
import Breadcrumb from "../Breadcrumb";

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

describe("Breadcrumb", () => {
  it("renders all items", () => {
    render(
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "商品一覧", href: "/products" },
          { label: "Tシャツ" },
        ]}
      />,
    );
    expect(screen.getByText("ホーム")).toBeInTheDocument();
    expect(screen.getByText("商品一覧")).toBeInTheDocument();
    expect(screen.getByText("Tシャツ")).toBeInTheDocument();
  });

  it("renders links for items with href", () => {
    render(
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "商品一覧" }]}
      />,
    );
    expect(screen.getByRole("link", { name: "ホーム" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders plain text for last item without href", () => {
    render(
      <Breadcrumb
        items={[{ label: "ホーム", href: "/" }, { label: "現在のページ" }]}
      />,
    );
    const current = screen.getByText("現在のページ");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveClass("font-medium");
  });

  it("renders separators between items", () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { label: "A", href: "/" },
          { label: "B", href: "/b" },
          { label: "C" },
        ]}
      />,
    );
    const separators = container.querySelectorAll("[aria-hidden='true']");
    expect(separators).toHaveLength(2);
  });

  it("has accessible nav landmark", () => {
    render(<Breadcrumb items={[{ label: "ホーム" }]} />);
    expect(
      screen.getByRole("navigation", { name: "パンくずリスト" }),
    ).toBeInTheDocument();
  });
});
