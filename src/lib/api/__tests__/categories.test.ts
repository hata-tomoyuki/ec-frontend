import {
  getCategories,
  getCategory,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../categories";

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

const category = {
  id: 1,
  name: "メンズファッション",
  description: "メンズ向けの衣類・アクセサリー",
  created_at: "2026-04-04T00:00:00Z",
  updated_at: "2026-04-04T00:00:00Z",
  image_color: "from-blue-600 to-blue-800",
  product_count: 3,
};

const product = {
  id: 10,
  name: "コットンTシャツ",
  description: "快適なTシャツ",
  price_in_cents: 4980,
  quantity: 50,
  image_color: "from-sky-400 to-blue-600",
  created_at: "2026-04-04T00:00:00Z",
  category_id: 1,
  category_name: "メンズファッション",
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getCategories", () => {
  it("calls api.get with /categories and return the list", async () => {
    mockApi.get.mockResolvedValue([category]);

    const result = await getCategories();

    expect(mockApi.get).toHaveBeenCalledWith("/categories");
    expect(result).toEqual([category]);
  });
});

describe("getCategory", () => {
  it("calls api.get with /categories/:id and return the category", async () => {
    mockApi.get.mockResolvedValue(category);

    const result = await getCategory(1);

    expect(mockApi.get).toHaveBeenCalledWith("/categories/1");
    expect(result).toEqual(category);
  });
});

describe("getCategoryProducts", () => {
  it("calls api.get with /categories/:id/products and return the products", async () => {
    mockApi.get.mockResolvedValue([product]);

    const result = await getCategoryProducts(1);

    expect(mockApi.get).toHaveBeenCalledWith("/categories/1/products");
    expect(result).toEqual([product]);
  });

  it("filters out products with zero quantity", async () => {
    const outOfStock = {
      ...product,
      id: 11,
      name: "在庫切れ商品",
      quantity: 0,
    };
    mockApi.get.mockResolvedValue([product, outOfStock]);

    const result = await getCategoryProducts(1);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("コットンTシャツ");
  });
});

describe("createCategory", () => {
  it("calls api.post with /categories and the request body", async () => {
    const body = {
      name: "レディースファッション",
      description: "レディース向けの衣類・アクセサリー",
      image_color: "from-pink-400 to-pink-600",
    };
    mockApi.post.mockResolvedValue({ ...category, ...body, id: 2 });

    const result = await createCategory(body);

    expect(mockApi.post).toHaveBeenCalledWith("/categories", body);
    expect(result.name).toBe("レディースファッション");
  });
});

describe("updateCategory", () => {
  it("calls api.put with /categories/:id and the request body", async () => {
    const body = {
      name: "更新済みカテゴリー",
      description: "更新後の説明",
      image_color: "from-green-400 to-green-600",
    };
    mockApi.put.mockResolvedValue({ ...category, ...body });

    const result = await updateCategory(1, body);

    expect(mockApi.put).toHaveBeenCalledWith("/categories/1", body);
    expect(result.name).toBe("更新済みカテゴリー");
  });
});

describe("deleteCategory", () => {
  it("calls api.delete with /categories/:id", async () => {
    mockApi.delete.mockResolvedValue(undefined);

    const result = await deleteCategory(1);

    expect(mockApi.delete).toHaveBeenCalledWith("/categories/1");
    expect(result).toBeUndefined();
  });
});
