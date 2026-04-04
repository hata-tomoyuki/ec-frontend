import { render, screen } from "@testing-library/react";
import AdminStatsCard from "../AdminStatsCard";

describe("AdminStatsCard", () => {
  it("renders title and value", () => {
    render(<AdminStatsCard title="総売上" value="¥1,234,567" />);
    expect(screen.getByText("総売上")).toBeInTheDocument();
    expect(screen.getByText("¥1,234,567")).toBeInTheDocument();
  });

  it("renders numeric value", () => {
    render(<AdminStatsCard title="商品数" value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    render(<AdminStatsCard title="注文数" value={100} subtitle="今月" />);
    expect(screen.getByText("今月")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const { container } = render(<AdminStatsCard title="注文数" value={100} />);
    const paragraphs = container.querySelectorAll("p");
    // Only title + value = 2 paragraphs
    expect(paragraphs).toHaveLength(2);
  });
});
