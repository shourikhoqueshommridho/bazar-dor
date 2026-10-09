
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#f8faf8]">
      <div className="mx-auto flex min-h-[68px] max-w-[1120px] items-center justify-between gap-4 px-4">
        {/* Left side */}
        <p className="text-sm text-[#252a26]">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে
        </p>

        {/* Right side */}
        <p className="text-right text-sm text-[#252a26]">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়
        </p>
      </div>
    </footer>
  );
}
