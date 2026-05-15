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
    // 1. Hapus 'absolute left-1/2...' agar navbar fleksibel mengikuti container parent-nya (Header)
    <nav className="w-full">
      {/* 2. Ubah menjadi flex-col untuk HP, dan md:flex-row untuk Laptop */}
      <ul className="flex flex-col gap-2 text-sm font-medium md:flex-row md:items-center md:gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  // 3. Tambahkan 'block' dan sesuaikan padding agar area klik di HP lebih besar dan nyaman (px-4 py-3)
                  "block rounded-md px-4 py-3 transition-all duration-300 md:px-3 md:py-1.5",
                  isActive
                    ? "bg-indigo-100 font-semibold text-indigo-600"
                    : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
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
