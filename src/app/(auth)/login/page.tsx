import LoginForm from "@/features/auth/components/LoginForm";
import { Compass, Sparkles, Star } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50">
      {/* Left Pane - Premium Illustration & Dynamic Background */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-indigo-950 p-12 text-white lg:flex">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 rounded-full bg-[#0f9488]/20 blur-3xl" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
            <Compass className="size-5.5 text-indigo-400 animate-pulse" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight">
            CarPath<span className="text-[#0f9488]">Mu</span>
          </span>
        </div>

        {/* Dynamic Centerpiece */}
        <div className="relative z-10 space-y-6 my-auto max-w-lg">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
            <Sparkles className="size-3.5 text-[#0f9488]" />
            AI Career Recommendation
          </div>
          <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Petakan Masa Depan Karir Anda Hari Ini
          </h1>
          <p className="text-base text-indigo-200/80 leading-relaxed">
            Dapatkan rekomendasi jalur karir yang dirancang khusus berdasarkan minat, potensi diri, dan keahlian Anda menggunakan sistem analisis berbasis kecerdasan buatan.
          </p>

          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-indigo-950 bg-slate-400"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-${
                      i === 1
                        ? "1534528741775-53994a69daeb"
                        : i === 2
                          ? "1507003211169-0a1dd7228f2d"
                          : "1494790108377-be9c29b29330"
                    }?auto=format&fit=crop&w=80&h=80&q=80')`,
                    backgroundSize: "cover",
                  }}
                />
              ))}
            </div>
            <div className="text-xs text-indigo-200/70">
              <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
              </div>
              <span>Bergabunglah dengan 2,000+ pelajar & profesional</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-indigo-300/50">
          © {new Date().getFullYear()} CarPathMu. All rights reserved.
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="relative flex w-full items-center justify-center p-6 md:p-12 lg:w-1/2">
        {/* Glow on mobile backgrounds */}
        <div className="absolute top-10 right-10 size-72 rounded-full bg-indigo-200/30 blur-3xl lg:hidden" />
        <div className="absolute bottom-10 left-10 size-72 rounded-full bg-teal-100/30 blur-3xl lg:hidden" />

        <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 md:p-10">
          {/* Logo on mobile header */}
          <div className="mb-8 flex items-center gap-2 justify-center lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-indigo-600">
              <Compass className="size-5 text-white" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900">
              CarPath<span className="text-[#0f9488]">Mu</span>
            </span>
          </div>

          {/* Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
