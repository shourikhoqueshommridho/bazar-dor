
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
    }
  }, [session?.user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      setMessage("");
      return;
    }

    setIsUpdating(true);
    setError("");
    setMessage("");

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
    } catch {
      setError("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      router.replace("/sign-in");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      setIsSigningOut(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f5f0]">
        <p className="text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#f0f5f0] px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#202b23] sm:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-[#68736a] sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information card */}
        <section className="flex flex-col gap-5 rounded-2xl border border-[#dce6dd] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                className="h-[72px] w-[72px] shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-[#e5eee6] text-3xl font-bold text-[#078b43]">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold text-[#263229] sm:text-xl">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="mt-1 break-all text-sm text-[#68736a] sm:text-base">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-red-500 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
          >
            <span aria-hidden="true">↪</span>
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </section>

        {/* Update profile form */}
        <section className="mt-6 rounded-2xl border border-[#dce6dd] bg-[#fbfdfb] p-5 sm:p-6">
          <h2 className="mb-7 text-lg font-bold text-[#263229]">
            তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-medium text-[#263229]"
              >
                নাম
              </label>

              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                className="w-full rounded-lg border border-[#dce6dd] bg-transparent px-4 py-3 text-[#263229] outline-none transition placeholder:text-gray-400 focus:border-[#078b43] focus:ring-2 focus:ring-[#078b43]/10"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {message && (
              <p role="status" className="text-sm text-green-700">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-lg bg-[#078b43] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#078b43] hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
