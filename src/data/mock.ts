import type {
  User,
  Category,
  Product,
  CartItem,
  Order,
  OrderStatus,
  Address,
} from "@/types";

export const mockUser: User = {
  id: "user-1",
  email: "tanaka@example.com",
  first_name: "太郎",
  last_name: "田中",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-06-01T08:30:00Z",
};

export const mockCategories: Category[] = [
  {
    id: 1,
    name: "メンズファッション",
    description: "メンズ向けの衣類・アクセサリー",
    image_color: "from-blue-600 to-blue-800",
    product_count: 3,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "レディースファッション",
    description: "レディース向けの衣類・アクセサリー",
    image_color: "from-pink-500 to-rose-600",
    product_count: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 3,
    name: "家電・ガジェット",
    description: "最新の家電製品やガジェット",
    image_color: "from-slate-600 to-slate-800",
    product_count: 3,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "食品・グルメ",
    description: "厳選された食品・飲料",
    image_color: "from-amber-500 to-orange-600",
    product_count: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 5,
    name: "本・書籍",
    description: "話題の書籍・専門書",
    image_color: "from-emerald-600 to-teal-700",
    product_count: 2,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "プレミアムコットンTシャツ",
    description:
      "上質なオーガニックコットン100%使用。肌触りが良く、着心地抜群のTシャツです。日常使いからカジュアルなお出かけまで幅広く活躍します。",
    price_in_cents: 4980,
    category_id: 1,
    category_name: "メンズファッション",
    quantity: 50,
    image_color: "from-blue-400 to-blue-600",
    created_at: "2024-03-01T00:00:00Z",
  },
  {
    id: 2,
    name: "スリムフィットデニムパンツ",
    description:
      "ストレッチ素材を使用したスリムフィットデニム。動きやすさとスタイリッシュさを両立しています。",
    price_in_cents: 8980,
    category_id: 1,
    category_name: "メンズファッション",
    quantity: 30,
    image_color: "from-indigo-500 to-blue-700",
    created_at: "2024-03-05T00:00:00Z",
  },
  {
    id: 3,
    name: "レザーウォレット",
    description:
      "イタリアンレザーを使用した上質な二つ折り財布。カード収納も充実しています。",
    price_in_cents: 12800,
    category_id: 1,
    category_name: "メンズファッション",
    quantity: 20,
    image_color: "from-blue-700 to-indigo-900",
    created_at: "2024-03-10T00:00:00Z",
  },
  {
    id: 4,
    name: "フローラルワンピース",
    description:
      "繊細な花柄プリントが美しいワンピース。軽やかな素材で春夏にぴったりです。",
    price_in_cents: 6980,
    category_id: 2,
    category_name: "レディースファッション",
    quantity: 25,
    image_color: "from-pink-400 to-rose-500",
    created_at: "2024-03-12T00:00:00Z",
  },
  {
    id: 5,
    name: "カシミアニットセーター",
    description:
      "最高級カシミア100%のニットセーター。軽くて暖かく、上品な印象を与えます。",
    price_in_cents: 19800,
    category_id: 2,
    category_name: "レディースファッション",
    quantity: 15,
    image_color: "from-rose-400 to-pink-600",
    created_at: "2024-03-15T00:00:00Z",
  },
  {
    id: 6,
    name: "ワイヤレスノイズキャンセリングヘッドホン",
    description:
      "業界最高クラスのノイズキャンセリング機能搭載。最大30時間のバッテリー持続で、音楽も通話もクリアに楽しめます。",
    price_in_cents: 34800,
    category_id: 3,
    category_name: "家電・ガジェット",
    quantity: 40,
    image_color: "from-slate-500 to-gray-700",
    created_at: "2024-03-18T00:00:00Z",
  },
  {
    id: 7,
    name: "スマートウォッチ Pro",
    description:
      "健康管理からメッセージ通知まで、日常を便利にするスマートウォッチ。防水対応で運動時も安心です。",
    price_in_cents: 49800,
    category_id: 3,
    category_name: "家電・ガジェット",
    quantity: 35,
    image_color: "from-gray-600 to-slate-800",
    created_at: "2024-03-20T00:00:00Z",
  },
  {
    id: 8,
    name: "ポータブルBluetoothスピーカー",
    description:
      "コンパクトなのに迫力のサウンド。IPX7防水で、アウトドアでも使えるBluetoothスピーカーです。",
    price_in_cents: 12800,
    category_id: 3,
    category_name: "家電・ガジェット",
    quantity: 60,
    image_color: "from-zinc-500 to-slate-700",
    created_at: "2024-03-22T00:00:00Z",
  },
  {
    id: 9,
    name: "宇治抹茶スイーツセット",
    description:
      "京都宇治の老舗茶園から届く本格抹茶スイーツの詰め合わせ。抹茶フィナンシェ、抹茶チョコレートなど6種入り。",
    price_in_cents: 3980,
    category_id: 4,
    category_name: "食品・グルメ",
    quantity: 100,
    image_color: "from-amber-400 to-orange-500",
    created_at: "2024-03-25T00:00:00Z",
  },
  {
    id: 10,
    name: "国産黒毛和牛 すき焼きセット",
    description:
      "A5ランクの黒毛和牛を贅沢に使用したすき焼きセット。特製割り下付きで、ご家庭で本格すき焼きをお楽しみいただけます。",
    price_in_cents: 9800,
    category_id: 4,
    category_name: "食品・グルメ",
    quantity: 20,
    image_color: "from-orange-500 to-red-600",
    created_at: "2024-03-28T00:00:00Z",
  },
  {
    id: 11,
    name: "はじめてのプログラミング入門",
    description:
      "プログラミング未経験者向けの入門書。図解とサンプルコードで基礎からしっかり学べます。",
    price_in_cents: 2980,
    category_id: 5,
    category_name: "本・書籍",
    quantity: 200,
    image_color: "from-emerald-500 to-teal-600",
    created_at: "2024-04-01T00:00:00Z",
  },
  {
    id: 12,
    name: "AI時代の働き方改革",
    description:
      "AIがビジネスに与える影響と、これからの時代に求められるスキルを解説。ビジネスパーソン必読の一冊。",
    price_in_cents: 1980,
    category_id: 5,
    category_name: "本・書籍",
    quantity: 150,
    image_color: "from-teal-500 to-emerald-700",
    created_at: "2024-04-05T00:00:00Z",
  },
];

export const mockAddresses: Address[] = [
  {
    id: "addr-1",
    user_id: "user-1",
    postal_code: "150-0001",
    prefecture: "東京都",
    city: "渋谷区",
    line1: "神宮前1-2-3",
    line2: "ABCマンション 401号室",
    is_default: true,
  },
  {
    id: "addr-2",
    user_id: "user-1",
    postal_code: "530-0001",
    prefecture: "大阪府",
    city: "大阪市北区",
    line1: "梅田4-5-6",
    line2: "",
    is_default: false,
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: "cart-1",
    product_id: "prod-1",
    product: mockProducts[0],
    quantity: 2,
  },
  {
    id: "cart-2",
    product_id: "prod-6",
    product: mockProducts[5],
    quantity: 1,
  },
  {
    id: "cart-3",
    product_id: "prod-9",
    product: mockProducts[8],
    quantity: 3,
  },
];

export const mockOrders: Order[] = [
  {
    id: "order-1",
    user_id: "user-1",
    status: "delivered",
    total: 13940,
    items: [
      {
        id: "oi-1",
        product_id: "prod-1",
        product_name: "プレミアムコットンTシャツ",
        price: 4980,
        quantity: 2,
      },
      {
        id: "oi-2",
        product_id: "prod-9",
        product_name: "宇治抹茶スイーツセット",
        price: 3980,
        quantity: 1,
      },
    ],
    shipping_address: mockAddresses[0],
    created_at: "2024-05-10T14:30:00Z",
    updated_at: "2024-05-15T09:00:00Z",
  },
  {
    id: "order-2",
    user_id: "user-1",
    status: "shipped",
    total: 49800,
    items: [
      {
        id: "oi-3",
        product_id: "prod-7",
        product_name: "スマートウォッチ Pro",
        price: 49800,
        quantity: 1,
      },
    ],
    shipping_address: mockAddresses[0],
    created_at: "2024-06-01T10:00:00Z",
    updated_at: "2024-06-03T16:00:00Z",
  },
  {
    id: "order-3",
    user_id: "user-1",
    status: "pending",
    total: 8960,
    items: [
      {
        id: "oi-4",
        product_id: "prod-12",
        product_name: "AI時代の働き方改革",
        price: 1980,
        quantity: 1,
      },
      {
        id: "oi-5",
        product_id: "prod-4",
        product_name: "フローラルワンピース",
        price: 6980,
        quantity: 1,
      },
    ],
    shipping_address: mockAddresses[1],
    created_at: "2024-06-10T08:00:00Z",
    updated_at: "2024-06-10T08:00:00Z",
  },
];

export const orderStatusOptions: {
  value: OrderStatus;
  label: string;
}[] = [
  { value: "pending", label: "注文受付" },
  { value: "confirmed", label: "確認済み" },
  { value: "shipped", label: "発送済み" },
  { value: "delivered", label: "配達完了" },
  { value: "cancelled", label: "キャンセル" },
];

export function formatPrice(priceInCents: number): string {
  return `¥${priceInCents.toLocaleString("ja-JP")}`;
}

export function getProductById(id: number): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getCategoryById(id: number): Category | undefined {
  return mockCategories.find((c) => c.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return mockProducts.filter((p) => p.category_id === categoryId);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getAddressById(id: string): Address | undefined {
  return mockAddresses.find((a) => a.id === id);
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price_in_cents * item.quantity,
    0,
  );
}
