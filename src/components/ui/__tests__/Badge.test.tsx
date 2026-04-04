import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    render(<Badge>Default</Badge>);
    const el = screen.getByText("Default");
    expect(el).toHaveClass("bg-stone-100", "text-stone-700");
  });

  it.each([
    ["success", "bg-emerald-50", "text-emerald-700"],
    ["warning", "bg-amber-50", "text-amber-700"],
    ["danger", "bg-red-50", "text-red-700"],
    ["info", "bg-sky-50", "text-sky-700"],
  ] as const)("applies %s variant styles", (variant, bgClass, textClass) => {
    render(<Badge variant={variant}>{variant}</Badge>);
    const el = screen.getByText(variant);
    expect(el).toHaveClass(bgClass, textClass);
  });

  it("merges custom className", () => {
    render(<Badge className="ml-2">Tag</Badge>);
    const el = screen.getByText("Tag");
    expect(el).toHaveClass("ml-2");
    // base classes still present
    expect(el).toHaveClass("rounded-full", "text-xs");
  });
});
