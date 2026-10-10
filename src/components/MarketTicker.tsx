
"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number | string;
  nameBn: string;
  unit: string;
  image?: string;
  today: number;
  yesterday: number;
  change?: {
    dir: "up" | "down";
    pct: number;
  };
};

export default function MarketTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products"
        );

        if (!res.ok) throw new Error("Failed to fetch products");

        const result = await res.json();

        const list = Array.isArray(result)
          ? result
          : result.data?.products ??
            result.data ??
            result.products ??
            [];

        if (Array.isArray(list)) setProducts(list);
      } catch (error) {
        console.error("Ticker fetch error:", error);
      }
    }

    fetchProducts();
  }, []);

  if (!products.length) return null;

  const format = (n: number) =>
    new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 1,
    }).format(n);

  const items = [...products, ...products];

  return (
    <div className="flex overflow-hidden border-b border-green-100 bg-green-50">
      <div className="z-10 shrink-0 bg-green-700 px-4 py-3 text-sm font-bold text-white">
        বাজারদর
      </div>

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="market-ticker-track flex w-max">
          {items.map((p, index) => {
            const dir =
              p.change?.dir ??
              (p.today > p.yesterday
                ? "up"
                : p.today < p.yesterday
                  ? "down"
                  : "flat");

            const pct =
              p.change?.pct ??
              (p.yesterday > 0
                ? (Math.abs(p.today - p.yesterday) /
                    p.yesterday) *
                  100
                : 0);

            return (
              <div
                key={`${p.id}-${index}`}
                aria-hidden={index >= products.length}
                className="flex shrink-0 items-center gap-2 border-r border-green-200 px-4 py-3 text-sm"
              >
                <span>{p.image || "🛒"}</span>
                <span className="font-medium text-gray-800">
                  {p.nameBn}
                </span>
                <span className="whitespace-nowrap font-bold text-gray-900">
                  {format(p.today)} টাকা/{p.unit}
                </span>
                <span
                  className={`whitespace-nowrap font-semibold ${
                    dir === "up"
                      ? "text-green-700"
                      : dir === "down"
                        ? "text-red-600"
                        : "text-gray-500"
                  }`}
                >
                  {dir === "up"
                    ? "▲"
                    : dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {format(pct)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
