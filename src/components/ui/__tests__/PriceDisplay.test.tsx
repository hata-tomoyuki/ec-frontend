import { render, screen } from "@testing-library/react";
import PriceDisplay from "../PriceDisplay";

describe("PriceDisplay", () => {
  it("formats price in yen", () => {
    render(<PriceDisplay price={4980} />);
    expect(screen.getByText("¥4,980")).toBeInTheDocument();
  });

  it("applies md size by default", () => {
    render(<PriceDisplay price={100} />);
    expect(screen.getByText("¥100")).toHaveClass("text-base");
  });

  it("applies xl size", () => {
    render(<PriceDisplay price={100} size="xl" />);
    expect(screen.getByText("¥100")).toHaveClass("text-2xl");
  });

  it("merges custom className", () => {
    render(<PriceDisplay price={100} className="ml-4" />);
    const el = screen.getByText("¥100");
    expect(el).toHaveClass("ml-4", "font-bold");
  });
});
