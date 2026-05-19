"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  // State
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
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
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
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
          Masuk ke akun Anda untuk melanjutkan pencarian jalur karir impian Anda.
        </p>
      </div>

      {generalError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
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
          <label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Alamat Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Mail className="size-4.5" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 ${
                errors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs font-medium text-red-500 flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="size-3" /> {errors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Kata Sandi
            </label>
            <Link
              href="#"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Lupa Sandi?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <Lock className="size-4.5" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full rounded-lg border bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-all placeholder:text-slate-400 ${
                errors.password
                  ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs font-medium text-red-500 flex items-center gap-1 animate-in fade-in duration-200">
              <AlertCircle className="size-3" /> {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 py-5.5 text-sm font-semibold rounded-lg shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 transition-all text-white cursor-pointer disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4.5 animate-spin" />
              Menghubungkan...
            </>
          ) : (
            <>
              Masuk ke Akun
              <ArrowRight className="ml-2 size-4 group-hover/button:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink mx-4 text-xs font-medium text-slate-400 uppercase tracking-wider bg-white px-2">
          Atau lanjut dengan
        </span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center py-5.5 border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-lg text-sm font-semibold text-slate-700 cursor-pointer transition-all gap-2"
      >
        <svg className="size-5" viewBox="0 0 24 24" width="24" height="24">
          <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path
              d="M21.35,11.1H12v2.7h5.38C16.88,15.5,14.81,16.8,12,16.8c-2.9,0-5.36-1.97-6.24-4.62c-0.22-0.67-0.35-1.39-0.35-2.18s0.13-1.51,0.35-2.18c0.88-2.65,3.34-4.62,6.24-4.62c1.65,0,3.13,0.59,4.3,1.57l2.02-2.02C16.79,1.25,14.53,0.5,12,0.5C7.29,0.5,3.22,3.2,1.22,7.15C0.76,8.06,0.5,9.08,0.5,10.15s0.26,2.09,0.72,3c2,3.95,6.07,6.65,10.78,6.65c2.97,0,5.61-0.99,7.56-2.69c2.31-2.02,3.64-5.26,3.64-8.91C22.5,7.58,22.09,6.72,21.35,11.1z"
              fill="#4285F4"
            />
            <path
              d="M1.22,7.15l3.22,2.37c0.22-0.67,0.35-1.39,0.35-2.18s-0.13-1.51-0.35-2.18L1.22,5.15C0.76,6.06,0.5,7.08,0.5,8.15S0.76,10.24,1.22,11.15z"
              fill="#FBBC05"
            />
            <path
              d="M12,3.8c1.65,0,3.13,0.59,4.3,1.57l2.02-2.02C16.79,2.1,14.53,1.35,12,1.35C7.29,1.35,3.22,4.05,1.22,8L4.44,10.37C5.32,7.72,7.78,5.75,12,5.75z"
              fill="#EA4335"
            />
            <path
              d="M12,16.25c-2.9,0-5.36-1.97-6.24-4.62L2.54,14C4.54,17.95,8.61,20.65,13.32,20.65c2.97,0,5.61-0.99,7.56-2.69l-2.02-2.02C16.79,15.2,14.53,16.25,12,16.25z"
              fill="#34A853"
            />
          </g>
        </svg>
        Sign in dengan Google
      </Button>

      {/* Navigation to Register */}
      <div className="text-center text-sm text-slate-500">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
