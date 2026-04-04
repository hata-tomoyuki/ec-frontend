import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";

// --- Mocks ---

let mockState = {};
let mockPending = false;
const mockFormAction = vi.fn();

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: () => [mockState, mockFormAction, mockPending],
  };
});

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

// --- Tests ---

beforeEach(() => {
  mockState = {};
  mockPending = false;
});

describe("LoginForm", () => {
  it("renders heading", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("heading", { name: "ログイン" }),
    ).toBeInTheDocument();
  });

  it("renders email and password inputs", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  it("renders submit button with default text", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: "ログイン" }),
    ).toBeInTheDocument();
  });

  it("shows pending text when submitting", () => {
    mockPending = true;
    render(<LoginForm />);
    expect(
      screen.getByRole("button", { name: "ログイン中..." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays error message from state", () => {
    mockState = { error: "メールかパスワードが違います" };
    render(<LoginForm />);
    expect(
      screen.getByText("メールかパスワードが違います"),
    ).toBeInTheDocument();
  });

  it("does not display error when state has no error", () => {
    render(<LoginForm />);
    expect(screen.queryByText(/エラー/)).not.toBeInTheDocument();
  });

  it("renders link to register page", () => {
    render(<LoginForm />);
    const link = screen.getByRole("link", { name: "新規登録" });
    expect(link).toHaveAttribute("href", "/register");
  });
});
