
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 
const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    setError("আপনার নাম লিখুন।");
    return;
  }

  if (password.length < 8) {
    setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    return;
  }

  if (password !== confirmPassword) {
    setError("দুটি পাসওয়ার্ড মিলছে না।");
    return;
  }

  setLoading(true);

  try {
    const result = await authClient.signUp.email({
      name: trimmedName,
      email: normalizedEmail,
      password,
      callbackURL: "/",
    });

   
if (result.error) {
  console.error("Better Auth signup error:", result.error);

  const errorMessage =
    result.error.message ||
    result.error.statusText ||
    "সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।";

  setError(errorMessage);
  return;
}


    router.push("/");
    router.refresh();
  } catch (err: unknown) {
    console.error("Signup request failed:", err);

    const message =
      err instanceof Error ? err.message : "অজানা সমস্যা হয়েছে।";

    setError(`অ্যাকাউন্ট তৈরি করা যায়নি: ${message}`);
  } finally {
    setLoading(false);
  }
};


  const handleSocialSignUp = async (
    provider: "google" | "github"
  ) => {
    setError("");

    try {
      const { error: socialError } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (socialError) {
        setError(socialError.message || "সোশ্যাল সাইন আপ ব্যর্থ হয়েছে।");
      }
    } catch {
      setError("সোশ্যাল লগইন চালু করা যায়নি।");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-138px)] flex-col bg-[#f0f5f0]">
      <section className="flex flex-1 flex-col items-center px-4 py-10 sm:py-9">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#202a23] sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-[#667168]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-[#dce6dc] bg-[#fbfdfb] p-5 sm:p-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-[#263129]"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10 text-[#202a23]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-[#263129]"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-[#202a23] h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#263129]"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="text-[#202a23] h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="  mb-1.5 block text-sm font-medium text-[#263129]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className=" text-[#202a23] h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-[#07883f] text-sm font-semibold text-white shadow-md transition hover:bg-[#067334] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#dce5dc]" />
            <span className="text-xs text-[#59645b]">অথবা</span>
            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignUp("google")}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5dc] text-sm font-medium text-[#263129] transition hover:bg-[#f0f5f0]"
            >
              <span className="font-bold text-[#4285F4]">G</span>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignUp("github")}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5dc] text-sm font-medium text-[#263129] transition hover:bg-[#f0f5f0]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3.01 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-[#374139]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#07883f] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 text-sm text-[#7b857d] transition hover:text-[#07883f]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </section>
    </main>
  );
}
