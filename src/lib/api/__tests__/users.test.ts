import { getMe } from "../users";

// --- Mocks ---

const mockApi = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("@/lib/api/client", () => ({
  api: mockApi,
}));

// --- Fixtures ---

const user = {
  id: 1,
  name: "田中太郎",
  email: "tanaka@example.com",
  role: "customer" as const,
  created_at: "2026-04-04T00:00:00Z",
  updated_at: "2026-04-04T00:00:00Z",
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getMe", () => {
  it("calls api.get with /users/me and returns the user", async () => {
    mockApi.get.mockResolvedValue(user);

    const result = await getMe();

    expect(mockApi.get).toHaveBeenCalledWith("/users/me");
    expect(result).toEqual(user);
  });
});
