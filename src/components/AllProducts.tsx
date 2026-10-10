
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
    "https://api.api-store.workers.dev/api/bazardor/products",
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

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section className="bg-white px-4 py-10 text-gray-900 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            মোট ৩৩টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                <a href={`/products/${product.id}`}>

                  {/* Product Image */}
                  <div className="flex h-32 items-center justify-center bg-gray-50 sm:h-40">
                    <span
                      className="text-6xl"
                      role="img"
                      aria-label={product.nameBn}
                    >
                      {product.image}
                    </span>
                  </div>

                  {/* Product Details */}
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

                    {/* Price Change */}
                    {product.change?.dir === "up" ? (
                      <p className="mt-2 inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                        ↑ {Math.abs(product.change.pct)}% দাম বেড়েছে
                      </p>
                    ) : product.change?.dir === "down" ? (
                      <p className="mt-2 inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        ↓ {Math.abs(product.change.pct)}% দাম কমেছে
                      </p>
                    ) : (
                      <p className="mt-2 inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">
                        দাম অপরিবর্তিত
                      </p>
                    )}
                  </div>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
            কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
}
