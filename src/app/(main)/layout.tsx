"use client";

import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  return (
    // Mengubah bg-indigo-50 menjadi bg-slate-50 agar isi dashboard lebih bersih
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <div className="flex min-h-screen pt-18">
        {/* Menggunakan pt-[72px] untuk memastikan konten tidak tertutup Header yang sticky (asumsi tinggi header ~72px) */}
        <Sidebar sidebarOpen={sidebarOpen} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main
          className={cn(
            "w-full min-w-0 flex-1 overflow-x-hidden transition-all duration-300",
            sidebarOpen ? "md:ml-64" : "ml-0"
          )}
        >
          {/* Menambahkan max-w-7xl agar konten tidak terlalu melebar di layar super besar */}
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
