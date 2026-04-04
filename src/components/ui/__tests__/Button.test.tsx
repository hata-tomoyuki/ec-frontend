import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

// Mock next/link to render a plain <a> tag
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Button", () => {
  describe("as <button>", () => {
    it("renders a button element by default", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: "Click me" }),
      ).toBeInTheDocument();
    });

    it("fires onClick handler", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(<Button onClick={onClick}>OK</Button>);
      await user.click(screen.getByRole("button", { name: "OK" }));
      expect(onClick).toHaveBeenCalledOnce();
    });

    it("can be disabled", () => {
      render(<Button disabled>No</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("as <a> (Link)", () => {
    it("renders a link when href is provided", () => {
      render(<Button href="/shop">Shop</Button>);
      const link = screen.getByRole("link", { name: "Shop" });
      expect(link).toHaveAttribute("href", "/shop");
    });
  });

  describe("variants", () => {
    it("applies primary variant by default", () => {
      render(<Button>Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-teal-700");
    });

    it("applies danger variant", () => {
      render(<Button variant="danger">Delete</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-red-600");
    });
  });

  describe("sizes", () => {
    it("applies md size by default", () => {
      render(<Button>Medium</Button>);
      expect(screen.getByRole("button")).toHaveClass("px-4", "py-2");
    });

    it("applies lg size", () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByRole("button")).toHaveClass("px-6", "py-3");
    });
  });

  it("merges custom className", () => {
    render(<Button className="w-full">Full</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("w-full");
    expect(btn).toHaveClass("rounded-lg");
  });
});
