import {
  getAddresses,
  getAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../addresses";

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

const address = {
  id: 1,
  user_id: 1,
  street: "神宮前1-2-3",
  city: "渋谷区",
  state: "東京都",
  zip_code: "150-0001",
  country: "Japan",
  created_at: "2026-04-04T00:00:00Z",
  updated_at: "2026-04-04T00:00:00Z",
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getAddresses", () => {
  it("calls api.get with /addresses and returns the list", async () => {
    mockApi.get.mockResolvedValue([address]);

    const result = await getAddresses();

    expect(mockApi.get).toHaveBeenCalledWith("/addresses");
    expect(result).toEqual([address]);
  });
});

describe("getAddress", () => {
  it("calls api.get with /addresses/:id and returns the address", async () => {
    mockApi.get.mockResolvedValue(address);

    const result = await getAddress(1);

    expect(mockApi.get).toHaveBeenCalledWith("/addresses/1");
    expect(result).toEqual(address);
  });
});

describe("createAddress", () => {
  it("calls api.post with /addresses and the request body", async () => {
    const body = {
      street: "新宿1-1-1",
      city: "新宿区",
      state: "東京都",
      zip_code: "160-0022",
      country: "Japan",
    };
    mockApi.post.mockResolvedValue({ ...address, ...body, id: 2 });

    const result = await createAddress(body);

    expect(mockApi.post).toHaveBeenCalledWith("/addresses", body);
    expect(result.street).toBe("新宿1-1-1");
  });
});

describe("updateAddress", () => {
  it("calls api.put with /addresses/:id and the request body", async () => {
    const body = {
      street: "更新済み住所",
      city: "渋谷区",
      state: "東京都",
      zip_code: "150-0001",
      country: "Japan",
    };
    mockApi.put.mockResolvedValue({ ...address, ...body });

    const result = await updateAddress(1, body);

    expect(mockApi.put).toHaveBeenCalledWith("/addresses/1", body);
    expect(result.street).toBe("更新済み住所");
  });
});

describe("deleteAddress", () => {
  it("calls api.delete with /addresses/:id", async () => {
    mockApi.delete.mockResolvedValue(undefined);

    const result = await deleteAddress(1);

    expect(mockApi.delete).toHaveBeenCalledWith("/addresses/1");
    expect(result).toBeUndefined();
  });
});
