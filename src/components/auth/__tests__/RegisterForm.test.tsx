import { render, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

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

describe("RegisterForm", () => {
  it("renders heading", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("heading", { name: "新規登録" }),
    ).toBeInTheDocument();
  });

  it("renders all four input fields", () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText("姓")).toBeInTheDocument();
    expect(screen.getByLabelText("名")).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  });

  it("renders submit button with default text", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: "登録する" }),
    ).toBeInTheDocument();
  });

  it("shows pending text when submitting", () => {
    mockPending = true;
    render(<RegisterForm />);
    expect(
      screen.getByRole("button", { name: "登録中..." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("displays error message from state", () => {
    mockState = { error: "登録に失敗しました" };
    render(<RegisterForm />);
    expect(screen.getByText("登録に失敗しました")).toBeInTheDocument();
  });

  it("renders link to login page", () => {
    render(<RegisterForm />);
    const link = screen.getByRole("link", { name: "ログイン" });
    expect(link).toHaveAttribute("href", "/login");
  });
});
