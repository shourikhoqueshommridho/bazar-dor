
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";


interface Product {
  id: string | number;
  slug: string;
  nameBn: string;
  unit: string;
  today: number;
  yesterday: number;
  image: string;
  change?: {
    dir: "up" | "down";
    pct: number;
  };
}

const API =
  "https://api.abcz.workers.dev/api/bazardor/products";

const Marquee = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch(API, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const contentType = res.headers.get("content-type");

    if (!contentType?.includes("application/json")) {
      throw new Error("API did not return JSON");
    }

    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      products = data as Product[];
    } else if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray(data.data)
    ) {
      products = data.data as Product[];
    } else if (
      data &&
      typeof data === "object" &&
      "products" in data &&
      Array.isArray(data.products)
    ) {
      products = data.products as Product[];
    }
  } catch (error) {
    console.error("Marquee products fetch error:", error);
  }

  return (
    <div className="bg-green-700 text-white">
      <div className="mx-auto flex max-w-7xl items-center">
        <div className="shrink-0 bg-green-800 px-4 py-3 font-bold">
          বাজার দর
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          {products.length > 0 ? (
            <MarqueeText
              className="py-4"
              direction="right"
              duration={300}
            >
              {products.map((product) => (
                <span
                  key={product.id}
                  className="whitespace-nowrap"
                >
                  {product.nameBn}{" "}
                  {product.today.toLocaleString("bn-BD")} টাকা/
                  {product.unit}
                  <span className="mx-5">•</span>
                </span>
              ))}
            </MarqueeText>
          ) : (
            <p className="px-4 py-3 text-sm">
              বাজারদরের তথ্য আপাতত পাওয়া যাচ্ছে না।
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
