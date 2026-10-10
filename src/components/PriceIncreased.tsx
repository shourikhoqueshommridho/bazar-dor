type Product = {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Products fetch failed");
  }

  const result = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : Array.isArray(result.products)
        ? result.products
        : [];

  return products;
}

export default async function PriceIncreased() {
  const products = await getProducts();

  const increasedProducts = products
    .filter((product) => product.change?.dir === "up")
    .slice(0, 6);

  return (
    <section className="bg-white px-4 py-10 text-gray-900 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              আজ দাম বেড়েছে
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              আজ যেসব পণ্যের দাম বেড়েছে
            </p>
          </div>

          <a
            href="/category"
            className="shrink-0 text-sm font-semibold text-green-700 hover:text-green-900"
          >
            সব পণ্য দেখুন →
          </a>
        </div>

        {/* Product Cards */}
        {increasedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {increasedProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <a href={`/products/${product.id}`}>
                  {/* Product Emoji */}
                  <div className="flex h-32 items-center justify-center bg-gray-50 sm:h-40">
                    <span
                      className="text-6xl"
                      role="img"
                      aria-label={product.nameBn}
                    >
                      {product.image}
                    </span>
                  </div>

                  {/* Product Information */}
                  <div className="p-3">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-semibold">
                      {product.nameBn}
                    </h3>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      ৳{product.today}

                      <span className="text-xs font-normal text-gray-500">
                        {" / "}
                        {product.unit === "kg"
                          ? "কেজি"
                          : product.unit === "dozen"
                            ? "ডজন"
                            : product.unit}
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-gray-400 line-through">
                      আগের দাম: ৳{product.yesterday}
                    </p>

                    {/* Price Increased Badge */}
                    <p className="mt-2 inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                      ↑ {Math.abs(product.change.pct)}% দাম বেড়েছে
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
            বর্তমানে দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
}
