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

import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { loginSchema } from "../types/auth.schema";

export default function LoginForm() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    // @ts-expect-error: Bug type inference bawaan dari TanStack Form
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setGeneralError(null);
      try {
        await login(value.email, value.password);
        router.push("/dashboard");
        router.refresh();
      } catch (err) {
        const errorMessage =
          (isAxiosError(err) && err.response?.data?.message) ||
          "Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.";
        setGeneralError(errorMessage);
      }
    },
  });

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
        <div className="animate-in fade-in slide-in-from-top-2 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 duration-300">
          <AlertCircle className="size-5 shrink-0 text-red-500" />
          <div>
            <p className="font-semibold">Masuk Gagal</p>
            <p className="text-red-500/90">{generalError}</p>
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Email Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-semibold tracking-wider text-slate-600 uppercase"
          >
            Alamat Email
          </label>
          <form.Field name="email">
            {(field) => {
              // Parsing aman tanpa any
              const rawError = field.state.meta.errors?.[0] as string | { message?: string } | undefined;
              const errorMessage = typeof rawError === "string" ? rawError : rawError?.message;
              
              return (
                <>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Mail className="size-4.5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="nama@email.com"
                      disabled={form.state.isSubmitting || isGoogleLoading}
                      className={`w-full rounded-lg border bg-white py-2.5 pr-4 pl-10 text-sm transition-all outline-none placeholder:text-slate-400 ${
                        errorMessage
                          ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
                      }`}
                    />
                  </div>
                  {errorMessage && (
                    <p className="animate-in fade-in flex items-center gap-1 text-xs font-medium text-red-500 duration-200">
                      <AlertCircle className="size-3" /> {errorMessage}
                    </p>
                  )}
                </>
              );
            }}
          </form.Field>
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
          <form.Field name="password">
            {(field) => {
              // Parsing aman tanpa any
              const rawError = field.state.meta.errors?.[0] as string | { message?: string } | undefined;
              const errorMessage = typeof rawError === "string" ? rawError : rawError?.message;
              
              return (
                <>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <Lock className="size-4.5" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      disabled={form.state.isSubmitting || isGoogleLoading}
                      className={`w-full rounded-lg border bg-white py-2.5 pr-10 pl-10 text-sm transition-all outline-none placeholder:text-slate-400 ${
                        errorMessage
                          ? "border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10"
                          : "border-slate-200 focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={form.state.isSubmitting || isGoogleLoading}
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4.5" />
                      ) : (
                        <Eye className="size-4.5" />
                      )}
                    </button>
                  </div>
                  {errorMessage && (
                    <p className="animate-in fade-in flex items-center gap-1 text-xs font-medium text-red-500 duration-200">
                      <AlertCircle className="size-3" /> {errorMessage}
                    </p>
                  )}
                </>
              );
            }}
          </form.Field>
        </div>

        {/* Submit Button */}
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => {
            const isPending = isSubmitting || isGoogleLoading;
            return (
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
            );
          }}
        </form.Subscribe>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-1">
        <div className="grow border-t border-slate-100"></div>
        <span className="mx-4 shrink bg-transparent px-2 text-xs font-medium tracking-wider text-slate-400 uppercase">
          Atau lanjut dengan
        </span>
        <div className="grow border-t border-slate-100"></div>
      </div>

      {/* Google Button */}
      <div className="flex w-full justify-center">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            if (!credentialResponse.credential) return;

            setIsGoogleLoading(true);
            try {
              await loginWithGoogle(credentialResponse.credential);
              router.push("/dashboard");
              router.refresh();
            } catch (err) {
              const errorMessage =
                (isAxiosError(err) && err.response?.data?.message) ||
                "Gagal masuk dengan Google. Silakan coba lagi.";
              setGeneralError(errorMessage);
              setIsGoogleLoading(false);
            }
          }}
          onError={() => {
            setGeneralError("Proses login Google dibatalkan atau gagal.");
            setIsGoogleLoading(false);
          }}
          shape="rectangular"
          theme="outline"
          size="large"
          text="continue_with"
          width="100%"
        />
      </div>

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