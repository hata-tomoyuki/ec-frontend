import { render, screen } from "@testing-library/react";
import AddressCard from "../AddressCard";
import type { Address } from "@/types";

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

const defaultAddress: Address = {
  id: "addr-1",
  user_id: "user-1",
  postal_code: "150-0001",
  prefecture: "東京都",
  city: "渋谷区",
  line1: "神宮前1-2-3",
  line2: "ABCマンション 401号室",
  is_default: true,
};

const nonDefaultAddress: Address = {
  ...defaultAddress,
  id: "addr-2",
  line2: "",
  is_default: false,
};

describe("AddressCard", () => {
  it("displays postal code", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByText("〒150-0001")).toBeInTheDocument();
  });

  it("displays address lines", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByText("東京都渋谷区神宮前1-2-3")).toBeInTheDocument();
    expect(screen.getByText("ABCマンション 401号室")).toBeInTheDocument();
  });

  it("shows default badge for default address", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByText("デフォルト")).toBeInTheDocument();
  });

  it("does not show default badge for non-default address", () => {
    render(<AddressCard address={nonDefaultAddress} />);
    expect(screen.queryByText("デフォルト")).not.toBeInTheDocument();
  });

  it("hides line2 when empty", () => {
    const { container } = render(<AddressCard address={nonDefaultAddress} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(1);
  });

  it("links to edit page", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByRole("link", { name: "編集" })).toHaveAttribute(
      "href",
      "/account/addresses/addr-1",
    );
  });
});
