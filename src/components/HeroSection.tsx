import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid items-center gap-8 overflow-hidden rounded-3xl bg-green-50 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-14">

        {/* Left Content */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
            <span>🌿</span>
            <span>সঠিক তথ্য, সঠিক দাম</span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের{" "}
            <span className="text-green-700">
              দাম এক নজরে
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            দেশের প্রয়োজনীয় পণ্যের আজকের বাজার দর
            জানুন সহজে, দ্রুত এবং নির্ভরযোগ্যভাবে।
          </p>

          <Link
            href="#all-products"
            className="mt-7 inline-flex items-center gap-3 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <span>🛒</span>
            <span>সব পণ্য দেখুন</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Benefits */}
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl text-green-700">✓</span>
              <span>নির্ভরযোগ্য তথ্য</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl text-green-700">↗</span>
              <span>বাজার দরের আপডেট</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl text-green-700">♧</span>
              <span>সহজ ব্যবহার</span>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative flex min-h-64 items-center justify-center sm:min-h-80">
          <div className="absolute h-56 w-56 rounded-full bg-green-100 sm:h-72 sm:w-72" />

          <div className="relative flex flex-col items-center">
            <div className="mb-3 flex gap-3 text-5xl sm:text-6xl">
              <span>🥬</span>
              <span>🥕</span>
              <span>🍅</span>
            </div>

            <div className="flex h-36 w-56 items-center justify-center rounded-b-3xl rounded-t-xl border-4 border-green-700 bg-green-600 shadow-xl sm:h-44 sm:w-64">
              <span className="text-7xl sm:text-8xl">🧺</span>
            </div>

            <div className="mt-5 rounded-xl border border-green-100 bg-white px-5 py-3 text-center shadow-md">
              <p className="font-bold text-green-800">
                🌿 বাজার দর
              </p>
              <p className="mt-1 text-sm text-gray-600">
                প্রতিদিনের বাজারের তথ্য
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
