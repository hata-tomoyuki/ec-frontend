import { render, screen } from "@testing-library/react";
import OrderStatusTimeline from "../OrderStatusTimeline";

describe("OrderStatusTimeline", () => {
  it("renders all step labels", () => {
    render(<OrderStatusTimeline status="pending" />);
    expect(screen.getByText("注文受付")).toBeInTheDocument();
    expect(screen.getByText("確認済み")).toBeInTheDocument();
    expect(screen.getByText("発送済み")).toBeInTheDocument();
    expect(screen.getByText("配達完了")).toBeInTheDocument();
  });

  it("shows cancelled message for cancelled status", () => {
    render(<OrderStatusTimeline status="cancelled" />);
    expect(
      screen.getByText("この注文はキャンセルされました"),
    ).toBeInTheDocument();
    // Normal timeline should not render
    expect(screen.queryByText("注文受付")).not.toBeInTheDocument();
  });

  it("marks completed steps up to current status", () => {
    const { container } = render(<OrderStatusTimeline status="shipped" />);
    // shipped = index 2, so 3 steps completed (0,1,2)
    // completed steps have teal background circles + connector lines
    // Use more specific selector: circles are w-8 h-8 divs with bg-teal-700
    const completedCircles = container.querySelectorAll(
      "div.bg-teal-700.rounded-full",
    );
    expect(completedCircles.length).toBe(3);
  });

  it("shows step numbers for incomplete steps", () => {
    render(<OrderStatusTimeline status="pending" />);
    // Steps 2,3,4 are incomplete — but step 1 (pending) is completed
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });
});
