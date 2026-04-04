import { render, screen } from "@testing-library/react";
import Header from "../Header";

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

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

describe("Header", () => {
  it("renders brand link", () => {
    render(<Header />);
    const brand = screen.getByRole("link", { name: "BECAUSE" });
    expect(brand).toHaveAttribute("href", "/");
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "商品一覧" })).toHaveAttribute(
      "href",
      "/products",
    );
    expect(screen.getByRole("link", { name: "カテゴリ" })).toHaveAttribute(
      "href",
      "/categories",
    );
  });

  it("renders cart icon", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: "カート" })).toBeInTheDocument();
  });
});
