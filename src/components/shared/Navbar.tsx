"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Beranda", href: "/" },
  { title: "Mulai Tes", href: "/test" },
  { title: "Hasil", href: "/result" },
  { title: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute left-1/2 -translate-x-1/2">
      <ul className="flex gap-2 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-sm px-2.5 py-1 transition-colors duration-300",
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-slate-500 hover:bg-indigo-100 hover:text-indigo-600"
                )}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
