export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 h-20 rounded-2xl bg-gray-200" />

        <p className="mb-4 text-sm text-gray-600">
          পণ্যের তথ্য লোড হচ্ছে...
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-4"
            >
              <div className="mb-4 h-24 rounded-xl bg-gray-200 sm:h-32" />
              <div className="mb-2 h-4 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}