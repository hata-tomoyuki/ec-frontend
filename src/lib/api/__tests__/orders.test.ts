import {
  getOrders,
  getOrder,
  placeOrder,
  cancelOrder,
  getAdminOrders,
  updateOrderStatus,
  groupOrderRows,
} from "../orders";
import type { OrderRow } from "@/types";

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

const orderRow: OrderRow = {
  id: 1,
  customer_id: 1,
  status: "pending",
  created_at: "2026-04-04T00:00:00Z",
  updated_at: "2026-04-04T00:00:00Z",
  product_id: 10,
  quantity: 2,
  price_in_cents: 4980,
};

// --- Tests ---

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getOrders", () => {
  it("calls api.get with /orders and returns mapped orders", async () => {
    mockApi.get.mockResolvedValue({
      data: [
        {
          id: 1,
          customer_id: 1,
          status: "pending",
          item_count: 2,
          total_in_cents: 9960,
          created_at: "2026-04-04T00:00:00Z",
          updated_at: "2026-04-04T00:00:00Z",
        },
      ],
    });

    const result = await getOrders();

    expect(mockApi.get).toHaveBeenCalledWith("/orders");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].total).toBe(9960);
    expect(result[0].status).toBe("pending");
  });
});

describe("getOrder", () => {
  it("calls api.get with /orders/:id and returns rows", async () => {
    mockApi.get.mockResolvedValue([orderRow]);

    const result = await getOrder(1);

    expect(mockApi.get).toHaveBeenCalledWith("/orders/1");
    expect(result).toEqual([orderRow]);
  });
});

describe("placeOrder", () => {
  it("calls api.post with /orders and the items", async () => {
    const items = [{ product_id: 10, quantity: 2 }];
    mockApi.post.mockResolvedValue([orderRow]);

    const result = await placeOrder(items);

    expect(mockApi.post).toHaveBeenCalledWith("/orders", { items });
    expect(result).toEqual([orderRow]);
  });
});

describe("cancelOrder", () => {
  it("calls api.put with /orders/:id/cancel", async () => {
    mockApi.put.mockResolvedValue(undefined);

    const result = await cancelOrder(1);

    expect(mockApi.put).toHaveBeenCalledWith("/orders/1/cancel");
    expect(result).toBeUndefined();
  });
});

describe("getAdminOrders", () => {
  it("calls api.get with /admin/orders and returns mapped orders", async () => {
    mockApi.get.mockResolvedValue({
      data: [
        {
          id: 1,
          customer_id: 1,
          status: "pending",
          item_count: 2,
          total_in_cents: 9960,
          created_at: "2026-04-04T00:00:00Z",
          updated_at: "2026-04-04T00:00:00Z",
        },
      ],
    });

    const result = await getAdminOrders();

    expect(mockApi.get).toHaveBeenCalledWith("/admin/orders");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].total).toBe(9960);
  });
});

describe("updateOrderStatus", () => {
  it("calls api.put with /admin/orders/:id/status", async () => {
    mockApi.put.mockResolvedValue(undefined);

    const result = await updateOrderStatus(1, "completed");

    expect(mockApi.put).toHaveBeenCalledWith("/admin/orders/1/status", {
      status: "completed",
    });
    expect(result).toBeUndefined();
  });
});

describe("groupOrderRows", () => {
  it("returns empty array for empty input", () => {
    const result = groupOrderRows([]);

    expect(result).toEqual([]);
  });

  it("groups rows with same order id into one order", () => {
    const result = groupOrderRows([
      { ...orderRow, id: 1 },
      { ...orderRow, id: 1, product_id: 11, quantity: 1 },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].items).toHaveLength(2);
  });

  it("calculates total correctly", () => {
    const result = groupOrderRows([
      { ...orderRow, id: 1 },
      { ...orderRow, id: 1, product_id: 11, quantity: 1, price_in_cents: 1000 },
    ]);

    expect(result[0].total).toBe(4980 * 2 + 1000 * 1);
  });
});
