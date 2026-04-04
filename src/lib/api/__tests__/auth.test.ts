import { loginAction, registerAction, logoutAction } from "../auth";

// --- Mocks ---

const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

// Mock redirect — throws to halt execution, just like Next.js
const redirectError = new Error("NEXT_REDIRECT");
const mockRedirect = vi.fn<(url: string) => never>(() => {
  throw redirectError;
});
vi.mock("next/navigation", () => ({
  redirect: (url: string) => mockRedirect(url),
}));

const mockApi = {
  post: vi.fn(),
};
vi.mock("@/lib/api/client", () => ({
  api: {
    get: vi.fn(),
    post: (...args: unknown[]) => mockApi.post(...args),
    put: vi.fn(),
    delete: vi.fn(),
  },
  ApiError: class extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.name = "ApiError";
      this.status = status;
    }
  },
}));

// --- Helpers ---

function makeFormData(entries: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    fd.set(key, value);
  }
  return fd;
}

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("loginAction", () => {
  const prevState = {};

  it("calls API with email and password, sets cookies, and redirects", async () => {
    mockApi.post.mockResolvedValue({
      access_token: "at-123",
      refresh_token: "rt-456",
      expires_in: 3600,
    });

    const fd = makeFormData({ email: "test@example.com", password: "pass" });

    await expect(loginAction(prevState, fd)).rejects.toThrow(redirectError);

    // API called correctly
    expect(mockApi.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "pass",
    });

    // Cookies set
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "access_token",
      "at-123",
      expect.objectContaining({ httpOnly: true, maxAge: 3600 }),
    );
    expect(mockCookieStore.set).toHaveBeenCalledWith(
      "refresh_token",
      "rt-456",
      expect.objectContaining({ httpOnly: true }),
    );

    // Redirect to home
    expect(mockRedirect).toHaveBeenCalledWith("/");
  });

  it("returns error from ApiError", async () => {
    const { ApiError: MockApiError } = await import("@/lib/api/client");
    mockApi.post.mockRejectedValue(
      new MockApiError(401, "メールかパスワードが違います"),
    );

    const fd = makeFormData({ email: "bad@example.com", password: "wrong" });
    const result = await loginAction(prevState, fd);

    expect(result).toEqual({ error: "メールかパスワードが違います" });
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("returns generic error for unknown errors", async () => {
    mockApi.post.mockRejectedValue(new Error("network down"));

    const fd = makeFormData({ email: "a@b.com", password: "p" });
    const result = await loginAction(prevState, fd);

    expect(result).toEqual({ error: "ログインに失敗しました" });
  });
});

describe("registerAction", () => {
  const prevState = {};

  it("joins last_name + first_name and posts to API", async () => {
    mockApi.post.mockResolvedValue({ id: "1", name: "山田 太郎" });

    const fd = makeFormData({
      last_name: "山田",
      first_name: "太郎",
      email: "yamada@example.com",
      password: "password123",
    });

    await expect(registerAction(prevState, fd)).rejects.toThrow(redirectError);

    expect(mockApi.post).toHaveBeenCalledWith("/auth/register", {
      name: "山田 太郎",
      email: "yamada@example.com",
      password: "password123",
    });
  });

  it("redirects to /login on success", async () => {
    mockApi.post.mockResolvedValue({ id: "1" });

    const fd = makeFormData({
      last_name: "田中",
      first_name: "花子",
      email: "t@e.com",
      password: "p",
    });

    await expect(registerAction(prevState, fd)).rejects.toThrow(redirectError);
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("returns error on API failure", async () => {
    const { ApiError: MockApiError } = await import("@/lib/api/client");
    mockApi.post.mockRejectedValue(new MockApiError(409, "既に登録済みです"));

    const fd = makeFormData({
      last_name: "佐藤",
      first_name: "一",
      email: "dup@e.com",
      password: "p",
    });
    const result = await registerAction(prevState, fd);

    expect(result).toEqual({ error: "既に登録済みです" });
  });
});

describe("logoutAction", () => {
  it("calls API, clears cookies, and redirects to /login", async () => {
    mockApi.post.mockResolvedValue(undefined);

    await expect(logoutAction()).rejects.toThrow(redirectError);

    expect(mockApi.post).toHaveBeenCalledWith("/auth/logout");
    expect(mockCookieStore.delete).toHaveBeenCalledWith("access_token");
    expect(mockCookieStore.delete).toHaveBeenCalledWith("refresh_token");
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });

  it("still clears cookies and redirects even when API fails", async () => {
    mockApi.post.mockRejectedValue(new Error("server error"));

    await expect(logoutAction()).rejects.toThrow(redirectError);

    expect(mockCookieStore.delete).toHaveBeenCalledWith("access_token");
    expect(mockCookieStore.delete).toHaveBeenCalledWith("refresh_token");
    expect(mockRedirect).toHaveBeenCalledWith("/login");
  });
});
