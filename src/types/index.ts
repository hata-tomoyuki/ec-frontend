export interface User {
  id: number;
  name: string;
  email: string;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image_color: string;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price_in_cents: number;
  category_id: number;
  category_name: string;
  quantity: number;
  image_color: string;
  created_at: string;
}

// CartItem — バックエンドはフラット構造（product をネストせず、product_name / product_price_in_cents を直接持つ）
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product_name: string;
  product_price_in_cents: number;
}

// OrderStatus — バックエンドは3種のみ（confirmed / shipped / delivered は存在しない）
export type OrderStatus = "pending" | "completed" | "cancelled";

// OrderRow — バックエンドが返すフラット行（1注文に複数商品がある場合、同じ order id で複数行返る）
export interface OrderRow {
  id: number;
  customer_id: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  product_id: number;
  quantity: number;
  price_in_cents: number;
}

// Order — フロントエンド表示用（OrderRow[] から変換して使う）
export interface Order {
  id: number;
  customer_id: number;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  created_at: string;
  updated_at: string;
}

// OrderItem — Order 内の各商品
export interface OrderItem {
  product_id: number;
  quantity: number;
  price_in_cents: number;
}
