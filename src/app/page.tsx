import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import PriceDecreased from "@/components/PriceDecreased";
import { Suspense } from "react";
import PriceIncreased from "../components/PriceIncreased";
import AllProducts from "../components/AllProducts";

export default function Home() {
  return (
  <main>
     <HeroSection />
    
    <Suspense fallback={<p>পণ্যের তথ্য লোড হচ্ছে...</p>}>
  <PriceIncreased />
</Suspense>
<Suspense fallback={ <p className="py-10 text-center"> পণ্যের তথ্য লোড হচ্ছে... </p> } > <PriceDecreased /> 
    </Suspense>
    <Suspense fallback={<p>সব পণ্য লোড হচ্ছে...</p>}>
  <AllProducts/>
</Suspense>
  </main>
  );
}
