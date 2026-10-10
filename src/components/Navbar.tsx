
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CategoryNavLink from "./CategoryNavLink";
import MarketTicker from "./MarketTicker";
type Category = {
  id: string | number;
  nameBn: string;
  slug: string;
  icon?: string;
};

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session?.user;

  const userName = session?.user?.name || "ব্যবহারকারী";
  const userEmail = session?.user?.email || "";
  const userImage = session?.user?.image;

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        // API response array অথবা object—দুই ক্ষেত্রেই সামলাবে
        const categoryList = Array.isArray(data)
          ? data
          : Array.isArray(data.categories)
            ? data.categories
            : Array.isArray(data.data)
              ? data.data
              : [];

        setCategories(categoryList);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Sign out
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      setUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };
 
const [today, setToday] = useState("");

useEffect(() => {
  const formattedDate = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  setToday(formattedDate);
}, []);


  return (
    <header className="bg-white">
      {/* Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="navbar mx-auto max-w-7xl px-4 lg:px-8">
          {/* Logo */}
          <div className="navbar-start">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600">
                <Image
                  src="/images/🛒.png"
                  alt="বাজার দর"
                  width={30}
                  height={30}
                />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  বাজার দর
                </h1>

                <p className="text-xs text-gray-500">
  {today}
</p>
              </div>
            </Link>
          </div>

          {/* Right Side: Auth Buttons or Profile */}
          <div className="navbar-end relative">
            {isPending ? (
              <div
                className="h-10 w-24 animate-pulse rounded-lg bg-gray-100"
                aria-label="লোড হচ্ছে"
              />
            ) : !isLoggedIn ? (
              /* Logged out */
              <div className="flex items-center gap-2 sm:gap-4">
                <Link
                  href="/sign-in"
                  className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-800 transition hover:text-green-700 sm:px-3"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-green-700 px-3 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 sm:px-5"
                >
                  সাইন আপ
                </Link>
              </div>
            ) : (
              /* Logged in */
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-expanded={userMenuOpen}
                  aria-label="প্রোফাইল মেনু"
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-50"
                >
                  {userImage ? (
                    <img
                      src={userImage}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-full border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="hidden text-left sm:block">
                    <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
                      {userName}
                    </p>

                    <p className="text-xs text-gray-500">
                      প্রোফাইল
                    </p>
                  </div>

                  <span
                    className={`ml-1 text-xs text-gray-400 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Profile Dropdown */}
                {userMenuOpen && (
                  <>
                    <button
                      type="button"
                      aria-label="মেনু বন্ধ করুন"
                      className="fixed inset-0 z-40 cursor-default"
                      onClick={() => setUserMenuOpen(false)}
                    />

                    <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                      <div className="border-b border-gray-100 px-4 py-3">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {userName}
                        </p>

                        <p className="mt-1 break-all text-xs text-gray-500">
                          {userEmail}
                        </p>
                      </div>

                      <div className="p-2">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                        >
                          <span>👤</span>
                          <span>প্রোফাইল</span>
                        </Link>

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <span>🚪</span>
                          <span>সাইন আউট</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-start gap-2 overflow-x-auto py-3 sm:justify-center">
            {categories.map((category) => (
              <CategoryNavLink
                key={category.slug}
                slug={category.slug}
                nameBn={category.nameBn}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </nav>
     
    </header>
  );
}
