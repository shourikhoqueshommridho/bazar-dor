
"use client";

import toast from "react-hot-toast";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const clearError = () => {
    setError("");
  };

  const showError = (message: string) => {
    setError(message);
    toast.error(message);
  };

  // Email ও password দিয়ে Sign In
  const handleSignIn = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    clearError();

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      showError("ইমেইল ও পাসওয়ার্ড লিখুন।");
      return;
    }

    if (loading || socialLoading !== null) return;

    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: normalizedEmail,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        showError(
          result.error.message ||
            "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

     toast.success("সফলভাবে লগইন হয়েছে!", {
  duration: 10000,
});

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error("Email sign-in error:", err);

      showError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Google ও GitHub দিয়ে Sign In
  const handleSocialSignIn = async (
    provider: "google" | "github"
  ) => {
    if (loading || socialLoading !== null) return;

    clearError();
    setSocialLoading(provider);

    const providerName =
      provider === "google" ? "Google" : "GitHub";

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        showError(
          result.error.message ||
            `${providerName} দিয়ে লগইন করা যায়নি।`
        );
      }

      // Social login সাধারণত provider-এর পেজে redirect করে।
      // তাই redirect শুরু হওয়ার আগেই success toast দেখাব না।
    } catch (err) {
      console.error(`${provider} sign-in error:`, err);

      showError(
        `${providerName} দিয়ে লগইন করা যায়নি। আবার চেষ্টা করুন।`
      );
    } finally {
      setSocialLoading(null);
    }
  };

  const isBusy = loading || socialLoading !== null;

  return (
    <main className="min-h-[calc(100vh-225px)] bg-[#f0f5f1] px-4 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#202b23]">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm text-[#69736c]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dce6de] bg-white/80 p-6 shadow-sm sm:p-7">
          <form
            onSubmit={handleSignIn}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#263229]"
              >
                ইমেইল
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                required
                disabled={isBusy}
                className="text-[#202a23] w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#263229]"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="তোমার পাসওয়ার্ড"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearError();
                }}
                required
                disabled={isBusy}
                className="text-[#202a23] w-full rounded-lg border border-[#dce6de] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-[#07883f] focus:ring-2 focus:ring-[#07883f]/10 disabled:opacity-60"
              />
            </div>

            {error && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isBusy}
              className="w-full rounded-lg bg-[#07883f] py-3 font-semibold text-white shadow-md transition hover:bg-[#067334] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "লগইন হচ্ছে..." : "সাইন ইন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#dce4dd]" />
            <span className="text-xs text-[#69736c]">
              অথবা
            </span>
            <div className="h-px flex-1 bg-[#dce4dd]" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isBusy}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6de] px-3 py-2.5 text-sm font-semibold text-[#263229] transition hover:bg-[#f3f7f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base font-bold">
                G
              </span>

              {socialLoading === "google"
                ? "Google-এ যাচ্ছেন..."
                : "Google দিয়ে লগইন"}
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isBusy}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#dce6de] px-3 py-2.5 text-sm font-semibold text-[#263229] transition hover:bg-[#f3f7f4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span aria-hidden="true">◉</span>

              {socialLoading === "github"
                ? "GitHub-এ যাচ্ছেন..."
                : "GitHub দিয়ে লগইন"}
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-[#465149]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#07883f] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#7a847d] transition hover:text-[#07883f]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
