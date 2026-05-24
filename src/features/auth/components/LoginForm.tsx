"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { isAxiosError } from "axios";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginForm() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  // State
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Client-side Validation (Manual lightweight & robust validation to avoid extra form overhead)
  const validateForm = () => {
    const tempErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      tempErrors.email = "Email wajib diisi";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Format email tidak valid";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Kata sandi wajib diisi";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Kata sandi harus minimal 6 karakter";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) return;

    setIsPending(true);
    try {
      await login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      const errorMessage =
        isAxiosError(err) && err.response?.data?.message ||
        "Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.";
      setGeneralError(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
          Selamat Datang Kembali!
        </h2>
        <p className="text-sm text-slate-500">
          Masuk ke akun Anda untuk melanjutkan pencarian jalur karir impian
          Anda.
        </p>
      </div>

      {generalError && (
        <div className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 duration-300">
          <AlertCircle className="size-5 shrink-0 text-red-500" />
          <div>
            <p className="font-semibold">Masuk Gagal</p>
            <p className="text-red-500/90">{generalError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-wider text-slate-600 uppercase"
          >
            Alamat Email
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Mail className="size-4.5" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className={`w-full rounded-lg border bg-white py-2.5 pr-4 pl-10 text-sm transition-all outline-none placeholder:text-slate-400 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="animate-in fade-in flex items-center gap-1 text-xs font-medium text-red-500 duration-200">
              <AlertCircle className="size-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-semibold tracking-wider text-slate-600 uppercase"
            >
              Kata Sandi
            </label>
            <Link
              href="#"
              className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Lock className="size-4.5" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-lg border bg-white py-2.5 pr-10 pl-10 text-sm transition-all outline-none placeholder:text-slate-400 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff className="size-4.5" />
              ) : (
                <Eye className="size-4.5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="animate-in fade-in flex items-center gap-1 text-xs font-medium text-red-500 duration-200">
              <AlertCircle className="size-3" /> {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer justify-center rounded-lg bg-indigo-600 py-5.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/25 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4.5 animate-spin" />
              Menghubungkan...
            </>
          ) : (
            <>
              Masuk ke Akun
              <ArrowRight className="ml-2 size-4 transition-transform group-hover/button:translate-x-0.5" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-slate-100"></div>
        <span className="mx-4 shrink bg-white px-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
          Atau lanjut dengan
        </span>
        <div className="grow border-t border-slate-100"></div>
      </div>

{/* Google Button */}
      <div className="flex w-full justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;
            
            setIsPending(true); // Gunakan state loading yang sudah ada
            try {
              // Panggil fungsi yang baru kita buat di auth-provider
              await loginWithGoogle(credentialResponse.credential);
              
              router.push("/dashboard");
              router.refresh();
            } catch (err) {
              const errorMessage =
                isAxiosError(err) && err.response?.data?.message ||
                "Gagal masuk dengan Google. Silakan coba lagi.";
              setGeneralError(errorMessage);
            } finally {
              setIsPending(false);
            }
          }}
          onError={() => {
            setGeneralError("Proses login Google dibatalkan atau gagal.");
          }}
          
          // Styling: Mengubah tampilan agar cocok dengan desain Anda
          shape="rectangular"
          theme="outline"
          size="large"
          text="continue_with"
          width="100%"
        />
      </div>

      {/* Navigation to Register */}
      <div className="text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
