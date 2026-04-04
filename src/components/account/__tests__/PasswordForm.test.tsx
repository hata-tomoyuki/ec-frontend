import { render, screen } from "@testing-library/react";
import PasswordForm from "../PasswordForm";

vi.mock("@/lib/api/user-actions", () => ({
  updatePasswordAction: vi.fn().mockResolvedValue({}),
}));

describe("PasswordForm", () => {
  it("renders three password fields", () => {
    render(<PasswordForm />);
    expect(screen.getByLabelText("現在のパスワード")).toBeInTheDocument();
    expect(screen.getByLabelText("新しいパスワード")).toBeInTheDocument();
    expect(
      screen.getByLabelText("新しいパスワード（確認）"),
    ).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<PasswordForm />);
    expect(
      screen.getByRole("button", { name: "パスワードを変更" }),
    ).toBeInTheDocument();
  });
});
