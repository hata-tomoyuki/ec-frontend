import { render, screen } from "@testing-library/react";
import AdminCategoryForm from "../AdminCategoryForm";
import type { Category } from "@/types";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

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

const category: Category = {
  id: "c1",
  name: "ファッション",
  description: "衣類・アクセサリー",
  image_color: "",
  product_count: 5,
};

describe("AdminCategoryForm", () => {
  it("renders form fields", () => {
    render(<AdminCategoryForm />);
    expect(screen.getByLabelText("カテゴリ名")).toBeInTheDocument();
    expect(screen.getByLabelText("説明")).toBeInTheDocument();
  });

  it("shows '追加する' for new category", () => {
    render(<AdminCategoryForm />);
    expect(
      screen.getByRole("button", { name: "追加する" }),
    ).toBeInTheDocument();
  });

  it("shows '更新する' when editing", () => {
    render(<AdminCategoryForm category={category} />);
    expect(
      screen.getByRole("button", { name: "更新する" }),
    ).toBeInTheDocument();
  });

  it("pre-fills fields when editing", () => {
    render(<AdminCategoryForm category={category} />);
    expect(screen.getByLabelText("カテゴリ名")).toHaveValue("ファッション");
    expect(screen.getByLabelText("説明")).toHaveValue("衣類・アクセサリー");
  });
});
