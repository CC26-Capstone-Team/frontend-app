"use client";

import MainHeader from "@/components/shared/MainHeader";
import Sidebar from "@/components/shared/Sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768;
  });
  const pathname = usePathname();

  const prevPathname = useRef(pathname);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname.current && window.innerWidth < 768) {
      setTimeout(() => setSidebarOpen(false), 0);
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return (
    // Memindahkan background utama ke sini agar menyatu ke seluruh layout
    <div className="relative min-h-screen overflow-hidden bg-indigo-50 font-sans">
      {/* Decorative blobs dipindah ke Layout */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 z-0 h-90 w-90 rounded-full bg-violet-400/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-75 w-75 rounded-full bg-emerald-400/20 blur-[100px]"
      />

      {/* Wrapper konten dengan z-index agar ada di atas blobs */}
      <div className="relative z-10">
        <MainHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex min-h-screen pt-18">
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
            <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 md:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
