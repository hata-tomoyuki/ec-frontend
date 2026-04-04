import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies padding by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstElementChild).toHaveClass("p-6");
  });

  it("removes padding when padding={false}", () => {
    const { container } = render(<Card padding={false}>Content</Card>);
    expect(container.firstElementChild).not.toHaveClass("p-6");
  });

  it("merges custom className", () => {
    const { container } = render(<Card className="mt-4">Content</Card>);
    const el = container.firstElementChild!;
    expect(el).toHaveClass("mt-4");
    expect(el).toHaveClass("bg-white", "rounded-xl");
  });
});
