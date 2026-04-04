import { render, screen } from "@testing-library/react";
import PriceDisplay from "../PriceDisplay";

describe("PriceDisplay", () => {
  it("formats price from sen to yen", () => {
    render(<PriceDisplay price={498000} />);
    expect(screen.getByText("¥4,980")).toBeInTheDocument();
  });

  it("applies md size by default", () => {
    render(<PriceDisplay price={100} />);
    expect(screen.getByText("¥1")).toHaveClass("text-base");
  });

  it("applies xl size", () => {
    render(<PriceDisplay price={100} size="xl" />);
    expect(screen.getByText("¥1")).toHaveClass("text-2xl");
  });

  it("merges custom className", () => {
    render(<PriceDisplay price={100} className="ml-4" />);
    const el = screen.getByText("¥1");
    expect(el).toHaveClass("ml-4", "font-bold");
  });
});
