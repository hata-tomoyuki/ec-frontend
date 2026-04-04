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
  id: 1,
  user_id: 1,
  zip_code: "150-0001",
  state: "東京都",
  city: "渋谷区",
  street: "神宮前1-2-3 ABCマンション 401号室",
  country: "Japan",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
};

describe("AddressCard", () => {
  it("displays postal code", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByText("〒150-0001")).toBeInTheDocument();
  });

  it("displays address", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(
      screen.getByText("東京都渋谷区神宮前1-2-3 ABCマンション 401号室"),
    ).toBeInTheDocument();
  });

  it("links to edit page", () => {
    render(<AddressCard address={defaultAddress} />);
    expect(screen.getByRole("link", { name: "編集" })).toHaveAttribute(
      "href",
      "/account/addresses/1",
    );
  });
});
