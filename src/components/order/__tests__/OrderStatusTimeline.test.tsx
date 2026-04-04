import { render, screen } from "@testing-library/react";
import OrderStatusTimeline from "../OrderStatusTimeline";

describe("OrderStatusTimeline", () => {
  it("renders all step labels", () => {
    render(<OrderStatusTimeline status="pending" />);
    expect(screen.getByText("注文受付")).toBeInTheDocument();
    expect(screen.getByText("完了")).toBeInTheDocument();
  });

  it("shows cancelled message for cancelled status", () => {
    render(<OrderStatusTimeline status="cancelled" />);
    expect(
      screen.getByText("この注文はキャンセルされました"),
    ).toBeInTheDocument();
    expect(screen.queryByText("注文受付")).not.toBeInTheDocument();
  });

  it("marks completed steps up to current status", () => {
    const { container } = render(<OrderStatusTimeline status="completed" />);
    const completedCircles = container.querySelectorAll(
      "div.bg-teal-700.rounded-full",
    );
    expect(completedCircles.length).toBe(2);
  });

  it("shows step numbers for incomplete steps", () => {
    render(<OrderStatusTimeline status="pending" />);
    // Step 2 (completed) is incomplete
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
