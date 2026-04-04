import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MobileMenu from "../MobileMenu";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe("MobileMenu", () => {
  it("renders menu button", () => {
    render(<MobileMenu />);
    expect(
      screen.getByRole("button", { name: "メニュー" }),
    ).toBeInTheDocument();
  });

  it("does not show navigation initially", () => {
    render(<MobileMenu />);
    expect(
      screen.queryByRole("link", { name: "ホーム" }),
    ).not.toBeInTheDocument();
  });

  it("shows navigation links on click", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "メニュー" }));

    expect(screen.getByRole("link", { name: "ホーム" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "商品一覧" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "カテゴリ" })).toHaveAttribute(
      "href",
      "/categories",
    );
    expect(screen.getByRole("link", { name: "カート" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("closes menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<MobileMenu />);

    await user.click(screen.getByRole("button", { name: "メニュー" }));
    await user.click(screen.getByRole("link", { name: "ホーム" }));

    expect(
      screen.queryByRole("link", { name: "商品一覧" }),
    ).not.toBeInTheDocument();
  });
});
