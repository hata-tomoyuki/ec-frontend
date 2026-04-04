import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminCategoryTable from "../AdminCategoryTable";
import type { Category } from "@/types";

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

const categories: Category[] = [
  {
    id: 1,
    name: "ファッション",
    description: "衣類",
    image_color: "",
    product_count: 5,
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "家電",
    description: "電子機器",
    image_color: "",
    product_count: 3,
    created_at: "",
    updated_at: "",
  },
];

describe("AdminCategoryTable", () => {
  it("shows empty message when no categories", () => {
    render(<AdminCategoryTable categories={[]} />);
    expect(screen.getByText("カテゴリがありません")).toBeInTheDocument();
  });

  it("renders category rows", () => {
    render(<AdminCategoryTable categories={categories} />);
    expect(screen.getByText("ファッション")).toBeInTheDocument();
    expect(screen.getByText("家電")).toBeInTheDocument();
  });

  it("displays product counts", () => {
    render(<AdminCategoryTable categories={categories} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows delete confirmation flow", async () => {
    const user = userEvent.setup();
    render(<AdminCategoryTable categories={categories} />);

    const deleteButtons = screen.getAllByRole("button", { name: "削除" });
    await user.click(deleteButtons[0]);
    expect(screen.getByRole("button", { name: "確認" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "戻る" }));
    expect(
      screen.queryByRole("button", { name: "確認" }),
    ).not.toBeInTheDocument();
  });
});
