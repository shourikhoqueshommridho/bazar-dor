export const instant = false;
import Link from "next/link";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Product not found");
    }

    product = await response.json();
  } catch {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            পণ্যের তথ্য পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আবার চেষ্টা করো অথবা অন্য একটি পণ্য দেখো।
          </p>
          <Link
            href="/products"
            className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </main>
    );
  }

  const prices = product.markets.flatMap((market) => [
    market.min,
    market.max,
  ]);

  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const averagePrice =
    prices.reduce((total, price) => total + price, 0) / prices.length;

  const isUp = product.change.dir === "up";
  const priceChange = product.today - product.yesterday;

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#202b23]">
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:p-7">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl sm:h-24 sm:w-24 sm:text-5xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <span className="mb-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                {product.categoryNameBn}
              </span>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-3 text-sm text-gray-700">
                {isUp ? "গতকালের তুলনায় দাম বেড়েছে" : "গতকালের তুলনায় দাম কমেছে"}{" "}
                <span
                  className={`font-semibold ${
                    isUp ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {formatPrice(Math.abs(priceChange))} টাকা
                </span>
              </p>
            </div>
          </div>

          <div className="min-w-36 rounded-2xl bg-[#f0f5f0] px-6 py-4 text-center sm:min-w-40">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-4xl font-bold">
              {formatPrice(product.today)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-2 text-sm font-bold ${
                isUp ? "text-red-600" : "text-green-700"
              }`}
            >
              {isUp ? "▲" : "▼"} {formatPrice(product.change.pct)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-5 sm:p-7">
          <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-700">
                {formatPrice(lowestPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সবচেয়ে কম
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-2xl font-bold text-red-600">
                {formatPrice(highestPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সবচেয়ে বেশি
              </p>
            </div>

            <div className="rounded-2xl border border-[#dfe8df] p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>
              <p className="mt-1 text-2xl font-bold text-green-700">
                {formatPrice(Math.round(averagePrice))}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="mt-1 text-xs text-gray-500">
                বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের গড়
              </p>
            </div>
          </div>

          {/* Market Table */}
          <div className="mt-7">
            <h2 className="mb-4 text-lg font-bold">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-[#dfe8df]">
              <table className="w-full min-w-[620px] border-collapse text-left text-sm">
                <thead className="bg-[#f7faf7] text-gray-500">
                  <tr>
                    <th className="px-4 py-4 font-semibold">বাজার</th>
                    <th className="px-4 py-4 font-semibold">বিভাগ</th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বনিম্ন
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      সর্বোচ্চ
                    </th>
                    <th className="px-4 py-4 text-right font-semibold">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {product.markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={`border-t border-[#dfe8df] transition-colors hover:bg-green-50 ${
                        index % 2 === 0 ? "bg-[#fbfdfb]" : "bg-[#f0f5f0]"
                      }`}
                    >
                      <td className="px-4 py-4 font-medium">
                        {market.market}
                      </td>

                      <td className="px-4 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right font-bold">
                        {formatPrice(
                          Math.round((market.min + market.max) / 2)
                        )}{" "}
                        টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              দ্রষ্টব্য: বাজারভিত্তিক গড় দাম সর্বনিম্ন ও সর্বোচ্চ দামের
              গড় থেকে হিসাব করা হয়েছে।
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}