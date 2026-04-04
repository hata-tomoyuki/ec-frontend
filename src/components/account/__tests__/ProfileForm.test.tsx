import { render, screen } from "@testing-library/react";
import ProfileForm from "../ProfileForm";
import type { User } from "@/types";

vi.mock("@/lib/api/users", () => ({
  updateProfileAction: vi.fn().mockResolvedValue({}),
}));

const mockUserData: User = {
  id: 1,
  name: "田中太郎",
  email: "tanaka@example.com",
  role: "customer",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-06-01T08:30:00Z",
};

describe("ProfileForm", () => {
  it("renders the form", () => {
    const { container } = render(<ProfileForm user={mockUserData} />);
    expect(container.querySelector("form")).toBeInTheDocument();
  });
});
