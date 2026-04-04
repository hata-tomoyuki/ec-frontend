import { render, screen } from "@testing-library/react";
import CartIcon from "../CartIcon";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    "aria-label": ariaLabel,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ),
}));

describe("CartIcon", () => {
  it("links to cart page", () => {
    render(<CartIcon count={0} />);
    expect(screen.getByRole("link", { name: "カート" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("shows item count badge", () => {
    render(<CartIcon count={3} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("hides badge when count is zero", () => {
    render(<CartIcon count={0} />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
