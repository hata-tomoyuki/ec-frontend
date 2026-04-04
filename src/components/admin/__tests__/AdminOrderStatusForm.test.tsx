import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminOrderStatusForm from "../AdminOrderStatusForm";

describe("AdminOrderStatusForm", () => {
  it("renders status select and update button", () => {
    render(<AdminOrderStatusForm currentStatus="pending" orderId={1} />);
    expect(screen.getByLabelText("ステータス")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "更新" })).toBeInTheDocument();
  });

  it("disables update button when status unchanged", () => {
    render(<AdminOrderStatusForm currentStatus="pending" orderId={1} />);
    expect(screen.getByRole("button", { name: "更新" })).toBeDisabled();
  });

  it("enables update button when status changes", async () => {
    const user = userEvent.setup();
    render(<AdminOrderStatusForm currentStatus="pending" orderId={1} />);

    await user.selectOptions(screen.getByLabelText("ステータス"), "completed");
    expect(screen.getByRole("button", { name: "更新" })).toBeEnabled();
  });

  it("renders all status options", () => {
    render(<AdminOrderStatusForm currentStatus="pending" orderId={1} />);
    const select = screen.getByLabelText("ステータス") as HTMLSelectElement;
    expect(select.options).toHaveLength(3);
  });
});
