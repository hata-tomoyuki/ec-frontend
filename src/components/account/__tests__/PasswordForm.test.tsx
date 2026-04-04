import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PasswordForm from "../PasswordForm";

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

  it("clears fields and shows confirmation after submit", async () => {
    const user = userEvent.setup();
    render(<PasswordForm />);

    await user.type(screen.getByLabelText("現在のパスワード"), "old123");
    await user.type(screen.getByLabelText("新しいパスワード"), "new456");
    await user.type(
      screen.getByLabelText("新しいパスワード（確認）"),
      "new456",
    );
    await user.click(screen.getByRole("button", { name: "パスワードを変更" }));

    expect(
      screen.getByRole("button", { name: "変更しました" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("現在のパスワード")).toHaveValue("");
    expect(screen.getByLabelText("新しいパスワード")).toHaveValue("");
  });
});
