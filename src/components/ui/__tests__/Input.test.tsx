import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "../Input";

describe("Input", () => {
  it("associates label with input via htmlFor/id", () => {
    render(<Input label="メールアドレス" />);
    const input = screen.getByLabelText("メールアドレス");
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("generates id from label when id is not provided", () => {
    render(<Input label="お名前" />);
    const input = screen.getByLabelText("お名前");
    expect(input).toHaveAttribute("id", "お名前");
  });

  it("uses explicit id when provided", () => {
    render(<Input label="メール" id="custom-id" />);
    const input = screen.getByLabelText("メール");
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("displays error message", () => {
    render(<Input label="パスワード" error="必須です" />);
    expect(screen.getByText("必須です")).toBeInTheDocument();
  });

  it("applies error styles to input", () => {
    render(<Input label="パスワード" error="エラー" />);
    const input = screen.getByLabelText("パスワード");
    expect(input).toHaveClass("border-red-300");
  });

  it("passes through HTML attributes", () => {
    render(
      <Input
        label="メール"
        type="email"
        placeholder="test@example.com"
        required
      />,
    );
    const input = screen.getByLabelText("メール");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "test@example.com");
    expect(input).toBeRequired();
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input label="名前" />);
    const input = screen.getByLabelText("名前");
    await user.type(input, "山田太郎");
    expect(input).toHaveValue("山田太郎");
  });
});
