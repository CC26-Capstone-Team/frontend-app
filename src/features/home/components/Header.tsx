"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ref untuk mendeteksi area menu dan tombol
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fungsi untuk menutup menu jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Jika menu sedang terbuka DAN klik terjadi BUKAN di dalam menuRef DAN BUKAN di buttonRef
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Tambahkan event listener ke dokumen
    document.addEventListener("mousedown", handleClickOutside);

    // Bersihkan listener saat komponen tidak lagi digunakan
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* LOGO */}
        <h1 className="font-heading relative z-50 text-xl font-extrabold">
          <span className="text-indigo-600">CarPath</span>
          <span className="text-[#0f9488]">Mu</span>
        </h1>

        {/* DESKTOP NAV */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden gap-2.5 md:flex">
          <Button
            variant={"outline"}
            className="cursor-pointer border border-indigo-600 px-5 py-4 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
          >
            <Link href="/login">Masuk</Link>
          </Button>
          <Button className="cursor-pointer border border-indigo-600 bg-indigo-600 px-5 py-4 text-sm font-semibold text-white transition-all hover:bg-indigo-700">
            <Link href="/register">Daftar</Link>
          </Button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          ref={buttonRef} // Pasang ref di sini
          className="relative z-50 flex items-center justify-center p-2 text-slate-600 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* DROPDOWN MENU MOBILE */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef} // Pasang ref di sini
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[72px] flex flex-col border-b border-slate-200 bg-white px-4 py-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6">
              {/* Tambahkan onClick agar menu menutup saat link diklik */}
              <div onClick={() => setIsMobileMenuOpen(false)}>
                <Navbar />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant={"outline"}
                className="w-full justify-center border-indigo-600 py-6 text-base font-semibold text-indigo-600"
              >
                Masuk
              </Button>
              <Button className="w-full justify-center bg-indigo-600 py-6 text-base font-semibold text-white">
                Daftar
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
