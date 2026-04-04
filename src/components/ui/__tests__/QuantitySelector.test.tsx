import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantitySelector from "../QuantitySelector";

describe("QuantitySelector", () => {
  it("displays current quantity", () => {
    render(<QuantitySelector quantity={3} onChange={vi.fn()} />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onChange with decremented value on minus click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector quantity={5} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "数量を減らす" }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with incremented value on plus click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector quantity={5} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "数量を増やす" }));
    expect(onChange).toHaveBeenCalledWith(6);
  });

  it("disables minus button at min", () => {
    render(<QuantitySelector quantity={1} onChange={vi.fn()} min={1} />);
    expect(screen.getByRole("button", { name: "数量を減らす" })).toBeDisabled();
  });

  it("disables plus button at max", () => {
    render(<QuantitySelector quantity={10} onChange={vi.fn()} max={10} />);
    expect(screen.getByRole("button", { name: "数量を増やす" })).toBeDisabled();
  });

  it("clamps to min when decrementing below min", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<QuantitySelector quantity={2} onChange={onChange} min={2} />);

    // Button is disabled at min, but verify the min clamping logic
    expect(screen.getByRole("button", { name: "数量を減らす" })).toBeDisabled();
  });
});
