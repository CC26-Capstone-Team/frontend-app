"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Fungsi untuk scroll halus ke section tertentu
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Mengurangi offset tinggi header (kira-kira 80px)
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Tutup menu mobile jika diklik
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* BAGIAN KIRI: LOGO */}
        <h1 className="font-heading relative z-50 text-xl font-extrabold">
          <span className="text-indigo-600">CarPath</span>
          <span className="text-[#0f9488]">Mu</span>
        </h1>

        {/* BAGIAN TENGAH: NAVIGASI DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Fitur
          </a>
          <a
            href="#steps"
            onClick={(e) => scrollToSection(e, "steps")}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Cara Kerja
          </a>
          <a
            href="#testimonials"
            onClick={(e) => scrollToSection(e, "testimonials")}
            className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
          >
            Testimoni
          </a>
        </nav>

        {/* BAGIAN KANAN: DESKTOP AUTH */}
        <div className="hidden gap-2.5 md:flex">
          <Button
            variant={"outline"}
            className="cursor-pointer border border-indigo-600 px-5 py-4 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
            asChild
          >
            <Link href="/login">Masuk</Link>
          </Button>
          <Button
            className="cursor-pointer border border-indigo-600 bg-indigo-600 px-5 py-4 text-sm font-semibold text-white transition-all hover:bg-indigo-700"
            asChild
          >
            <Link href="/register">Daftar</Link>
          </Button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          ref={buttonRef}
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
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-[72px] flex flex-col border-b border-slate-200 bg-white px-4 py-6 shadow-xl md:hidden"
          >
            <div className="mb-6 flex flex-col gap-4 px-2">
              <a
                href="#features"
                onClick={(e) => scrollToSection(e, "features")}
                className="text-base font-medium text-slate-600"
              >
                Fitur
              </a>
              <a
                href="#steps"
                onClick={(e) => scrollToSection(e, "steps")}
                className="text-base font-medium text-slate-600"
              >
                Cara Kerja
              </a>
              <a
                href="#testimonials"
                onClick={(e) => scrollToSection(e, "testimonials")}
                className="text-base font-medium text-slate-600"
              >
                Testimoni
              </a>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Button
                variant={"outline"}
                className="w-full justify-center border-indigo-600 py-6 text-base font-semibold text-indigo-600"
                asChild
              >
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  Masuk
                </Link>
              </Button>
              <Button
                className="w-full justify-center bg-indigo-600 py-6 text-base font-semibold text-white"
                asChild
              >
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
