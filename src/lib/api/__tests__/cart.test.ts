import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../cart";

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

const cartItem = {
  id: 1,
  cart_id: 1,
  product_id: 1,
  quantity: 2,
  product_name: "テスト商品",
  product_price_in_cents: 4980,
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getCart", () => {
  it("calls api.get with /cart and returns cart items", async () => {
    mockApi.get.mockResolvedValue([cartItem]);

    const result = await getCart();

    expect(mockApi.get).toHaveBeenCalledWith("/cart");
    expect(result).toEqual([cartItem]);
  });
});

describe("addCartItem", () => {
  it("calls api.post with /cart/items and returns the new item", async () => {
    mockApi.post.mockResolvedValue(cartItem);

    const result = await addCartItem(1, 2);

    expect(mockApi.post).toHaveBeenCalledWith("/cart/items", {
      product_id: 1,
      quantity: 2,
    });
    expect(result).toEqual(cartItem);
  });
});

describe("updateCartItem", () => {
  it("calls api.put with /cart/items/:id and returns the updated item", async () => {
    mockApi.put.mockResolvedValue({ ...cartItem, quantity: 3 });

    const result = await updateCartItem(1, 3);

    expect(mockApi.put).toHaveBeenCalledWith("/cart/items/1", { quantity: 3 });
    expect(result.quantity).toBe(3);
  });
});

describe("removeCartItem", () => {
  it("calls api.delete with /cart/items/:id", async () => {
    mockApi.delete.mockResolvedValue(undefined);

    const result = await removeCartItem(1);

    expect(mockApi.delete).toHaveBeenCalledWith("/cart/items/1");
    expect(result).toBeUndefined();
  });
});

describe("clearCart", () => {
  it("calls api.delete with /cart", async () => {
    mockApi.delete.mockResolvedValue(undefined);

    const result = await clearCart();

    expect(mockApi.delete).toHaveBeenCalledWith("/cart");
    expect(result).toBeUndefined();
  });
});
