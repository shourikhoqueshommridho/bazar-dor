
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change?: {
    dir: string;
    pct: number;
  };
};

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "low") {
      result.sort((a, b) => a.today - b.today);
    } else if (sort === "high") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <section className="mt-6 rounded-2xl border border-[#dfe8df] bg-white px-5 py-14 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="mt-4 text-xl font-bold">
          এই ক্যাটাগরিতে কোনো পণ্য নেই
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          অন্য পণ্য দেখতে হোম পেজে ফিরে যাও।
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Sort */}
      <section className="mt-6 flex items-center justify-end gap-3 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-green-700"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </section>

      <p className="mt-4 text-sm text-gray-500">
        মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Product Cards */}
      <section className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => {
          const direction = product.change?.dir;
          const percentage = product.change?.pct;
          const isUp = direction === "up";
          const isDown = direction === "down";

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                  {product.image || "🛒"}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate font-bold group-hover:text-green-800">
                    {product.nameBn}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="mt-1 text-xl font-bold">
                    {product.today.toLocaleString("bn-BD")}{" "}
                    <span className="text-sm font-medium">টাকা</span>
                  </p>
                </div>

                <span
                  className={`rounded-full bg-[#f0f5f0] px-3 py-1.5 text-xs font-bold ${
                    isUp
                      ? "text-red-600"
                      : isDown
                        ? "text-green-700"
                        : "text-gray-600"
                  }`}
                >
                  {typeof percentage !== "number"
                    ? "—"
                    : `${isUp ? "▲" : isDown ? "▼" : "—"} ${percentage.toLocaleString("bn-BD")}%`}
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}