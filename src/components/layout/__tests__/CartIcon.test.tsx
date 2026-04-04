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
    render(<CartIcon />);
    expect(screen.getByRole("link", { name: "カート" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });

  it("shows item count badge", () => {
    render(<CartIcon />);
    // mockCartItems has 3 items
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
