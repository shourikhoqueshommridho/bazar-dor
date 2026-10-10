
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  slug: string;
  nameBn: string;
  icon?: string;
};

export default function CategoryNavLink({
  slug,
  nameBn,
  icon,
}: Props) {
  const pathname = usePathname();
  const isActive = pathname === `/categories/${slug}`;

  return (
    <Link
      href={`/categories/${slug}`}
      className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 transition ${
        isActive
          ? "bg-green-700 font-semibold text-white"
          : "text-gray-700 hover:bg-green-100 hover:text-green-800"
      }`}
    >
      {icon && (
        <span aria-hidden="true">{icon}</span>
      )}

      <span>{nameBn}</span>
    </Link>
  );
}