import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserMenu from "../UserMenu";

const mockLogoutAction = vi.fn().mockResolvedValue(undefined);

vi.mock("@/lib/api/auth", () => ({
  logoutAction: (...args: unknown[]) => mockLogoutAction(...args),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("UserMenu", () => {
  it("renders account menu button", () => {
    render(<UserMenu userName="田中太郎" userEmail="tanaka@example.com" />);
    expect(
      screen.getByRole("button", { name: "アカウントメニュー" }),
    ).toBeInTheDocument();
  });

  it("shows dropdown on click", async () => {
    const user = userEvent.setup();
    render(<UserMenu userName="田中太郎" userEmail="tanaka@example.com" />);

    await user.click(
      screen.getByRole("button", { name: "アカウントメニュー" }),
    );
    expect(
      screen.getByRole("link", { name: "マイページ" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "注文履歴" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "管理画面" })).toBeInTheDocument();
  });

  it("does not show dropdown initially", () => {
    render(<UserMenu userName="田中太郎" userEmail="tanaka@example.com" />);
    expect(
      screen.queryByRole("link", { name: "マイページ" }),
    ).not.toBeInTheDocument();
  });

  it("calls logoutAction on logout", async () => {
    const user = userEvent.setup();
    render(<UserMenu userName="田中太郎" userEmail="tanaka@example.com" />);

    await user.click(
      screen.getByRole("button", { name: "アカウントメニュー" }),
    );
    await user.click(screen.getByRole("button", { name: "ログアウト" }));
    expect(mockLogoutAction).toHaveBeenCalled();
  });
});
