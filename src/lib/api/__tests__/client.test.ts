import { api, ApiError } from "../client";

// --- Mocks ---

const mockCookieStore = {
  get: vi.fn(),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

// --- Helpers ---

function mockResponse(body: unknown, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn(() => Promise.resolve(body)),
  };
}

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
  mockCookieStore.get.mockReturnValue(undefined);
});

describe("api.get", () => {
  it("sends GET request to correct URL", async () => {
    fetchMock.mockResolvedValue(mockResponse({ id: 1 }));

    const result = await api.get("/products/1");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8080/products/1",
      expect.objectContaining({ method: "GET" }),
    );
    expect(result).toEqual({ id: 1 });
  });

  it("includes Authorization header when token exists", async () => {
    mockCookieStore.get.mockReturnValue({ value: "test-token" });
    fetchMock.mockResolvedValue(mockResponse({ ok: true }));

    await api.get("/me");

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers["Authorization"]).toBe("Bearer test-token");
  });

  it("omits Authorization header when no token", async () => {
    fetchMock.mockResolvedValue(mockResponse({ ok: true }));

    await api.get("/public");

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers["Authorization"]).toBeUndefined();
  });
});

describe("api.post", () => {
  it("sends POST with JSON body", async () => {
    fetchMock.mockResolvedValue(mockResponse({ created: true }));

    await api.post("/products", { name: "Test" });

    const [, options] = fetchMock.mock.calls[0];
    expect(options.method).toBe("POST");
    expect(options.body).toBe(JSON.stringify({ name: "Test" }));
    expect(options.headers["Content-Type"]).toBe("application/json");
  });

  it("sends POST without body when body is undefined", async () => {
    fetchMock.mockResolvedValue(mockResponse({ ok: true }));

    await api.post("/auth/logout");

    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBeUndefined();
  });
});

describe("api.delete", () => {
  it("sends DELETE and handles 204 No Content", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      status: 204,
      json: vi.fn(),
    });

    const result = await api.delete("/products/1");

    const [, options] = fetchMock.mock.calls[0];
    expect(options.method).toBe("DELETE");
    expect(result).toBeUndefined();
  });
});

describe("error handling", () => {
  it("throws ApiError with status and message on failure", async () => {
    fetchMock.mockResolvedValue(mockResponse({ error: "Not found" }, 404));

    await expect(api.get("/missing")).rejects.toThrow(ApiError);

    try {
      await api.get("/missing");
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      expect((e as ApiError).status).toBe(404);
      expect((e as ApiError).message).toBe("Not found");
    }
  });

  it("falls back to 'Unknown error' when response body is not JSON", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
      json: vi.fn(() => Promise.reject(new Error("not json"))),
    });

    await expect(api.get("/broken")).rejects.toThrow("Unknown error");
  });
});
