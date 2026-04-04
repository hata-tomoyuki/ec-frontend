import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddToCartButton from "../AddToCartButton";

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

describe("AddToCartButton", () => {
  it("shows disabled button when out of stock", () => {
    render(<AddToCartButton productId="p1" stock={0} />);
    expect(screen.getByRole("button", { name: "在庫切れ" })).toBeDisabled();
  });

  it("shows add to cart button when in stock", () => {
    render(<AddToCartButton productId="p1" stock={5} />);
    expect(
      screen.getByRole("button", { name: "カートに追加" }),
    ).toBeInTheDocument();
  });

  it("shows quantity selector when in stock", () => {
    render(<AddToCartButton productId="p1" stock={5} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("数量:")).toBeInTheDocument();
  });

  it("changes button text after adding to cart", async () => {
    const user = userEvent.setup();
    render(<AddToCartButton productId="p1" stock={5} />);

    await user.click(screen.getByRole("button", { name: "カートに追加" }));
    expect(
      screen.getByRole("button", { name: "カートに追加しました" }),
    ).toBeInTheDocument();
  });
});
