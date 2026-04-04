import { render, screen } from "@testing-library/react";
import EmptyState from "../EmptyState";

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

describe("EmptyState", () => {
  it("renders title and description", () => {
    render(
      <EmptyState
        title="商品がありません"
        description="新しい商品を追加してください"
      />,
    );
    expect(screen.getByText("商品がありません")).toBeInTheDocument();
    expect(
      screen.getByText("新しい商品を追加してください"),
    ).toBeInTheDocument();
  });

  it("renders action button when actionLabel and actionHref are provided", () => {
    render(
      <EmptyState
        title="空です"
        description="詳細"
        actionLabel="追加する"
        actionHref="/new"
      />,
    );
    const link = screen.getByRole("link", { name: "追加する" });
    expect(link).toHaveAttribute("href", "/new");
  });

  it("does not render action button when props are missing", () => {
    render(<EmptyState title="空です" description="詳細" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
