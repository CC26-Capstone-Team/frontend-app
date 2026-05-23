"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, Target, BookOpen } from "lucide-react";
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
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Kursus & Belajar",
    href: "/courses",
    icon: <BookOpen className="h-5 w-5" />,
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
        // Menambahkan tooltip bawaan browser agar saat tertutup, user tetap tahu nama menunya
        title={!sidebarOpen ? item.title : undefined}
        className={cn(
          "relative flex items-center rounded-md px-3 py-2.5 text-sm transition-all duration-200",
          // Jika sidebar ditutup, pusatkan ikon ke tengah. Jika buka, beri jarak gap-3.
          sidebarOpen ? "gap-3 justify-start" : "md:justify-center",
          isItemActive
            ? "bg-indigo-50/60 font-semibold text-indigo-700 shadow-sm backdrop-blur-md"
            : "text-slate-600 hover:bg-white/50 hover:text-slate-900"
        )}
      >
        {isItemActive && (
          <div className="absolute -left-1 h-6 w-1 rounded-r-full bg-indigo-600" />
        )}
        <div className={cn("shrink-0", isItemActive ? "text-indigo-600" : "text-slate-500")}>
          {item.icon}
        </div>
        
        {/* Teks menu: Sembunyikan jika sidebar tertutup (md:hidden) */}
        <span className={cn(
          "whitespace-nowrap transition-all duration-200",
          sidebarOpen ? "opacity-100 md:block" : "md:hidden"
        )}>
          {item.title}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 mt-16 transform border-r border-white/80 bg-white/60 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col justify-between",
        // Mobile (< 768px): Lebar w-64, tapi bergeser -translate-x-full jika ditutup.
        // Desktop (>= 768px): Selalu tampil (translate-x-0), lebarnya w-64 jika buka, menyusut ke w-20 jika ditutup.
        sidebarOpen 
          ? "translate-x-0 w-64" 
          : "-translate-x-full w-64 md:translate-x-0 md:w-20"
      )}
    >
      <div className="flex-1 overflow-y-auto p-4 overflow-x-hidden scrollbar-none">
        {/* Label Menu Utama: Sembunyikan jika ditutup */}
        <div className={cn(
          "mb-2 px-3 text-xs font-semibold tracking-wider text-slate-400 transition-all",
          sidebarOpen ? "opacity-100 md:block" : "md:hidden"
        )}>
          MENU UTAMA
        </div>
        <nav className="flex flex-col gap-1">
          {navigationItems.map(renderNavItem)}
        </nav>
      </div>

      {/* Footer Versioning: Sembunyikan jika ditutup */}
      <div className={cn(
        "border-t border-white/60 p-4 text-center text-xs font-light text-slate-500 transition-all",
        sidebarOpen ? "opacity-100 md:block" : "md:hidden"
      )}>
        <p className="font-semibold text-slate-400">CARPATHMU v1.0.0</p>
        <p>Teman Karir Terbaikmu</p>
      </div>
    </aside>
  );
}