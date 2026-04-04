import { render, screen } from "@testing-library/react";
import AddressForm from "../AddressForm";
import type { Address } from "@/types";

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

const address: Address = {
  id: "addr-1",
  user_id: "user-1",
  postal_code: "150-0001",
  prefecture: "東京都",
  city: "渋谷区",
  line1: "神宮前1-2-3",
  line2: "ABCマンション",
  is_default: true,
};

describe("AddressForm", () => {
  it("renders all address fields", () => {
    render(<AddressForm />);
    expect(screen.getByLabelText("郵便番号")).toBeInTheDocument();
    expect(screen.getByLabelText("都道府県")).toBeInTheDocument();
    expect(screen.getByLabelText("市区町村")).toBeInTheDocument();
    expect(screen.getByLabelText("番地")).toBeInTheDocument();
    expect(
      screen.getByLabelText("建物名・部屋番号（任意）"),
    ).toBeInTheDocument();
  });

  it("shows '追加する' button for new address", () => {
    render(<AddressForm />);
    expect(
      screen.getByRole("button", { name: "追加する" }),
    ).toBeInTheDocument();
  });

  it("shows '更新する' button when editing existing address", () => {
    render(<AddressForm address={address} />);
    expect(
      screen.getByRole("button", { name: "更新する" }),
    ).toBeInTheDocument();
  });

  it("pre-fills fields with existing address data", () => {
    render(<AddressForm address={address} />);
    expect(screen.getByLabelText("郵便番号")).toHaveValue("150-0001");
    expect(screen.getByLabelText("都道府県")).toHaveValue("東京都");
    expect(screen.getByLabelText("市区町村")).toHaveValue("渋谷区");
  });

  it("renders cancel button", () => {
    render(<AddressForm />);
    expect(
      screen.getByRole("button", { name: "キャンセル" }),
    ).toBeInTheDocument();
  });
});
