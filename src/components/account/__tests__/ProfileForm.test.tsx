import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileForm from "../ProfileForm";

describe("ProfileForm", () => {
  it("renders input fields with initial values from mock user", () => {
    render(<ProfileForm />);
    expect(screen.getByLabelText("名前")).toHaveValue("田中太郎");
    expect(screen.getByLabelText("メールアドレス")).toHaveValue(
      "tanaka@example.com",
    );
  });

  it("renders save button", () => {
    render(<ProfileForm />);
    expect(
      screen.getByRole("button", { name: "保存する" }),
    ).toBeInTheDocument();
  });

  it("shows saved message on submit", async () => {
    const user = userEvent.setup();
    render(<ProfileForm />);
    await user.click(screen.getByRole("button", { name: "保存する" }));
    expect(
      screen.getByRole("button", { name: "保存しました" }),
    ).toBeInTheDocument();
  });

  it("allows editing fields", async () => {
    const user = userEvent.setup();
    render(<ProfileForm />);
    const emailInput = screen.getByLabelText("メールアドレス");
    await user.clear(emailInput);
    await user.type(emailInput, "new@example.com");
    expect(emailInput).toHaveValue("new@example.com");
  });
});
