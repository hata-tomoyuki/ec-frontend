import {
  getProducts,
  getProductsPaginated,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../products";

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

const product = {
  id: 1,
  name: "プレミアムコットンTシャツ",
  description: "上質なコットン素材のTシャツ",
  price_in_cents: 4980,
  quantity: 50,
  image_color: "from-sky-400 to-blue-600",
  created_at: "2026-04-04T00:00:00Z",
  category_id: 1,
  category_name: "メンズファッション",
};

const paginatedResponse = {
  data: [product],
  total: 1,
  page: 1,
  limit: 100,
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getProductsPaginated", () => {
  it("calls /products with no query params by default", async () => {
    mockApi.get.mockResolvedValue(paginatedResponse);

    const result = await getProductsPaginated();

    expect(mockApi.get).toHaveBeenCalledWith("/products");
    expect(result).toEqual(paginatedResponse);
  });

  it("builds query string from params", async () => {
    mockApi.get.mockResolvedValue(paginatedResponse);

    await getProductsPaginated({
      page: 2,
      limit: 10,
      sort: "price_asc",
      search: "シャツ",
    });

    expect(mockApi.get).toHaveBeenCalledWith(
      "/products?page=2&limit=10&sort=price_asc&search=%E3%82%B7%E3%83%A3%E3%83%84",
    );
  });

  it("omits falsy params from query string", async () => {
    mockApi.get.mockResolvedValue(paginatedResponse);

    await getProductsPaginated({ page: 1, limit: 20 });

    expect(mockApi.get).toHaveBeenCalledWith("/products?page=1&limit=20");
  });
});

describe("getProducts", () => {
  it("returns data array from paginated response, filtering out-of-stock", async () => {
    const outOfStock = { ...product, id: 2, quantity: 0 };
    mockApi.get.mockResolvedValue({
      data: [product, outOfStock],
      total: 2,
      page: 1,
      limit: 100,
    });

    const result = await getProducts();

    expect(mockApi.get).toHaveBeenCalledWith("/products?limit=100");
    expect(result).toEqual([product]);
  });
});

describe("getProduct", () => {
  it("calls api.get with /products/:id and returns the product", async () => {
    mockApi.get.mockResolvedValue(product);

    const result = await getProduct(1);

    expect(mockApi.get).toHaveBeenCalledWith("/products/1");
    expect(result).toEqual(product);
  });
});

describe("createProduct", () => {
  it("calls api.post with /products and the request body", async () => {
    const body = {
      name: "新商品",
      description: "新商品の説明",
      price_in_cents: 3000,
      image_color: "from-red-400 to-red-600",
      quantity: 10,
    };
    mockApi.post.mockResolvedValue({ ...product, ...body, id: 2 });

    const result = await createProduct(body);

    expect(mockApi.post).toHaveBeenCalledWith("/products", body);
    expect(result.name).toBe("新商品");
  });
});

describe("updateProduct", () => {
  it("calls api.put with /products/:id and the request body", async () => {
    const body = {
      name: "更新済み商品",
      description: "更新後の説明",
      price_in_cents: 5980,
      image_color: "from-green-400 to-green-600",
      quantity: 20,
    };
    mockApi.put.mockResolvedValue({ ...product, ...body });

    const result = await updateProduct(1, body);

    expect(mockApi.put).toHaveBeenCalledWith("/products/1", body);
    expect(result.name).toBe("更新済み商品");
  });
});

describe("deleteProduct", () => {
  it("calls api.delete with /products/:id", async () => {
    mockApi.delete.mockResolvedValue(undefined);

    const result = await deleteProduct(1);

    expect(mockApi.delete).toHaveBeenCalledWith("/products/1");
    expect(result).toBeUndefined();
  });
});
