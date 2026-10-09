"use client";

import { Autour_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


type Category = {
  id: string | number;
  nameBn: string;
  slug: string;
  icon?: string;
};

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await res.json();

        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <header className="bg-white">
      {/* ================= Main Navbar ================= */}
      <div className="border-b border-gray-100">
        <div className="navbar mx-auto max-w-7xl px-4 lg:px-8">
          {/* Logo */}
          <div className="navbar-start">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400">
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
                  সোমবার, ৬ অক্টোবর, ২০২৬
                </p>
              </div>
            </Link>
          </div>

          {/* User Menu */}
          <div className="navbar-end relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-50"
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Rezwan
                </p>

                <p className="text-xs text-gray-500">
                  Profile
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

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 top-14 z-50 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                <div className="border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Rezwan
                  </p>

                  <p className="text-xs text-gray-500">
                    Welcome back!
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                  >
                    <span className="text-base">👤</span>
                    <span>প্রোফাইল</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <span className="text-base">🚪</span>
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= Category Navigation ================= */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
              >
                {/* Category Icon */}
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-lg transition group-hover:bg-white">
                  {category.icon || "📦"}
                </span>

                {/* Category Name */}
                <span>{category.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
