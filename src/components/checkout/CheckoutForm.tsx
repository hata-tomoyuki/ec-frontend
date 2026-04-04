"use client";

import { useState } from "react";
import type { Address, CartItem } from "@/types";
import { formatPrice } from "@/data/mock";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { placeOrderAction } from "@/lib/api/order-actions";

interface CheckoutFormProps {
  addresses: Address[];
  items: CartItem[];
}

type Step = "address" | "confirm" | "complete";

export default function CheckoutForm({ addresses, items }: CheckoutFormProps) {
  const [step, setStep] = useState<Step>("address");
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id ?? 0);
  const [error, setError] = useState("");
  const total = items.reduce(
    (sum, item) => sum + item.product_price_in_cents * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    try {
      await placeOrderAction(
        items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      );
      setStep("complete");
    } catch {
      setError("注文の確定に失敗しました。もう一度お試しください。");
    }
  }

  if (step === "complete") {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">
          ご注文ありがとうございます
        </h1>
        <p className="text-stone-500 mb-8">注文が確定されました。</p>
        <div className="flex justify-center gap-4">
          <Button href="/account/orders">注文履歴を見る</Button>
          <Button href="/" variant="outline">
            トップページに戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-900 mb-8">チェックアウト</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <span
          className={`px-3 py-1 rounded-full font-medium ${
            step === "address"
              ? "bg-teal-700 text-white"
              : "bg-stone-200 text-stone-600"
          }`}
        >
          1. 配送先
        </span>
        <span className="text-stone-300">&rarr;</span>
        <span
          className={`px-3 py-1 rounded-full font-medium ${
            step === "confirm"
              ? "bg-teal-700 text-white"
              : "bg-stone-200 text-stone-600"
          }`}
        >
          2. 確認
        </span>
      </div>

      {step === "address" && (
        <Card>
          <h2 className="text-lg font-bold text-stone-900 mb-4">
            配送先を選択
          </h2>
          <div className="space-y-3">
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedAddress === addr.id
                    ? "border-teal-700 bg-teal-50"
                    : "border-stone-200 hover:border-stone-300"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                  className="mt-1 accent-teal-700"
                />
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    〒{addr.zip_code}
                  </p>
                  <p className="text-sm text-stone-600">
                    {addr.state}
                    {addr.city}
                    {addr.street}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => setStep("confirm")}>確認画面へ</Button>
          </div>
        </Card>
      )}

      {step === "confirm" && (
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-bold text-stone-900 mb-4">
              注文内容の確認
            </h2>
            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-stone-300 to-stone-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 line-clamp-1">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-stone-500">
                      {formatPrice(item.product_price_in_cents)} ×{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-stone-800 shrink-0">
                    {formatPrice(item.product_price_in_cents * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-stone-900 mb-2">配送先</h3>
            {(() => {
              const addr = addresses.find((a) => a.id === selectedAddress);
              if (!addr) return null;
              return (
                <p className="text-sm text-stone-600">
                  〒{addr.zip_code} {addr.state}
                  {addr.city}
                  {addr.street}
                </p>
              );
            })()}
          </Card>

          <Card>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600">小計</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-stone-600">送料</span>
              <span className="text-emerald-600">無料</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-stone-200 pt-3">
              <span>合計</span>
              <span>{formatPrice(total)}</span>
            </div>
          </Card>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setStep("address")}>
              戻る
            </Button>
            <Button onClick={handlePlaceOrder} className="flex-1">
              注文を確定する
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
