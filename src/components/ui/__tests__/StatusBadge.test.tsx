import { render, screen } from "@testing-library/react";
import StatusBadge from "../StatusBadge";

describe("StatusBadge", () => {
  it.each([
    ["pending", "注文受付"],
    ["completed", "完了"],
    ["cancelled", "キャンセル"],
  ] as const)("renders %s status as '%s'", (status, label) => {
    render(<StatusBadge status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("applies warning variant for pending", () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText("注文受付")).toHaveClass("bg-amber-50");
  });

  it("applies success variant for completed", () => {
    render(<StatusBadge status="completed" />);
    expect(screen.getByText("完了")).toHaveClass("bg-emerald-50");
  });

  it("applies danger variant for cancelled", () => {
    render(<StatusBadge status="cancelled" />);
    expect(screen.getByText("キャンセル")).toHaveClass("bg-red-50");
  });
});
