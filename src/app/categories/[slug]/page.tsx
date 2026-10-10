
import CategoryProducts from "./CategoryProducts";

const API = "https://api.api-store.workers.dev/api/bazardor";

type Product = {
  id: string | number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change?: {
    dir: string;
    pct: number;
  };
};

type Category = {
  slug: string;
  nameBn: string;
  icon: string;
};

const categories: Category[] = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0] px-4">
        <div className="text-center">
          <p className="text-5xl">🔎</p>
          <h1 className="mt-4 text-2xl font-bold">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <a
            href="/"
            className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 text-white"
          >
            হোম পেজে ফিরে যান
          </a>
        </div>
      </main>
    );
  }

  let products: Product[] = [];
  let apiError = false;

  try {
    const response = await fetch(
      `${API}/products?category=${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Product API failed: ${response.status}`);
    }

    const result: unknown = await response.json();

    if (Array.isArray(result)) {
      products = result as Product[];
    } else if (
      result &&
      typeof result === "object" &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      products = result.data as Product[];
    } else {
      apiError = true;
    }
  } catch (error) {
    console.error("Category products fetch error:", error);
    apiError = true;
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] text-[#202b23]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section className="flex items-center gap-4 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-4 sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold sm:text-3xl">
              {category.nameBn}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {apiError ? (
          <section className="mt-6 rounded-2xl border border-[#dfe8df] bg-white p-6 text-center sm:p-10">
            <h2 className="text-xl font-bold">
              পণ্যের তথ্য লোড করা যায়নি
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করো।
            </p>
            <a
              href={`/categories/${slug}`}
              className="mt-4 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-white hover:bg-green-800"
            >
              আবার চেষ্টা করুন
            </a>
          </section>
        ) : products.length === 0 ? (
          <section className="mt-6 rounded-2xl border border-[#dfe8df] bg-white px-4 py-10 text-center">
            <p className="text-4xl">🛒</p>
            <h2 className="mt-3 text-lg font-bold">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
            </h2>
            <a
              href="/"
              className="mt-4 inline-block rounded-lg bg-green-700 px-5 py-2.5 text-white hover:bg-green-800"
            >
              হোম পেজে ফিরে যান
            </a>
          </section>
        ) : (
          <CategoryProducts products={products} />
        )}
      </div>
    </main>
  );
}
