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
  id: 1,
  user_id: 1,
  zip_code: "150-0001",
  state: "東京都",
  city: "渋谷区",
  street: "神宮前1-2-3",
  country: "Japan",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
};

describe("AddressForm", () => {
  it("renders all address fields", () => {
    render(<AddressForm />);
    expect(screen.getByLabelText("郵便番号")).toBeInTheDocument();
    expect(screen.getByLabelText("都道府県")).toBeInTheDocument();
    expect(screen.getByLabelText("市区町村")).toBeInTheDocument();
    expect(screen.getByLabelText("住所")).toBeInTheDocument();
    expect(screen.getByLabelText("国")).toBeInTheDocument();
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
