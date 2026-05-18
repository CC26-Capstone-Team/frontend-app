"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Target, BookOpen } from "lucide-react"; // Ikon disesuaikan
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isExpanded?: boolean;
}

interface SidebarProps {
  sidebarOpen: boolean;
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Rekomendasi Karir",
    href: "/career-recommendations",
    icon: <Target className="h-5 w-5" />, // Ikon Target lebih pas untuk karir
  },
  {
    title: "Kursus & Belajar",
    href: "/courses",
    icon: <BookOpen className="h-5 w-5" />, // Ikon Buku
  },
];

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const renderNavItem = (item: NavItem) => {
    const isItemActive = item.href && isActive(item.href);

    return (
      <Link
        key={item.title}
        href={item.href || "#"}
        className={cn(
          "relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
          isItemActive
            ? "bg-indigo-50 font-semibold text-indigo-700" // Tema Indigo
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        {isItemActive && (
          // Indikator garis di sebelah kiri
          <div className="absolute -left-1 h-6 w-1 rounded-r-full bg-indigo-600" />
        )}
        <div className={isItemActive ? "text-indigo-600" : "text-slate-500"}>
          {item.icon}
        </div>
        <span>{item.title}</span>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 mt-16 w-64 transform border-r bg-white transition-transform duration-300 ease-in-out",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-2 px-3 text-xs font-semibold tracking-wider text-slate-400">
            MENU UTAMA
          </div>
          <nav className="flex flex-col gap-1">
            {navigationItems.map(renderNavItem)}
          </nav>
        </div>

        <div className="border-t border-slate-100 p-4 text-center text-xs font-light text-slate-500">
          <p className="font-semibold text-slate-400">CARPATHMU v1.0.0</p>
          <p>Teman Karir Terbaikmu</p>
        </div>
      </div>
    </aside>
  );
}
