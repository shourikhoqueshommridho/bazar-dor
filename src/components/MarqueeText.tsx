
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  market: ReactNode;
  min: ReactNode;
  max: ReactNode;
  nameBn: string;
  id: string | number;
  name: string;
  price: number;
  unit: string;
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products"
  );

const data = await res.json();

console.log("API response:", data);

const products: Product[] = Array.isArray(data)
  ? data
  : Array.isArray(data.data)
    ? data.data
    : Array.isArray(data.products)
      ? data.products
      : [];


  return (
    <div className="bg-green-700 text-white">
      <div className="mx-auto flex max-w-7xl">
        <div className="bg-green-800 px-4 py-1 font-bold ">
          বাজার দর
        </div>

        <MarqueeText
          className="py-4"
          direction="right"
          duration={10}
        >
         {products.map((product) => (
  <span key={product.id}>
    {product.nameBn} {product.market} {product.today} টাকা/{product.unit}
    <span className="mx-5">•</span>
  </span>
))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
