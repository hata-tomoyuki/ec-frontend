export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
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

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
}

export interface Address {
  id: string;
  user_id: string;
  postal_code: string;
  prefecture: string;
  city: string;
  line1: string;
  line2: string;
  is_default: boolean;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shipping_address: Address;
  created_at: string;
  updated_at: string;
}
