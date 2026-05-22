import { cn } from "@/lib/utils";
import { StatsCardProps } from "../types/dashboard.types";

const variantStyles = {
  indigo: {
    topBar: "from-indigo-500 to-indigo-400",
    iconBg: "bg-indigo-100/80",
    iconColor: "text-indigo-600",
    valueColor: "text-slate-900",
  },
  emerald: {
    topBar: "from-emerald-500 to-emerald-400",
    iconBg: "bg-emerald-100/80",
    iconColor: "text-emerald-600",
    valueColor: "text-slate-900",
  },
  fuchsia: {
    topBar: "from-fuchsia-500 to-fuchsia-400",
    iconBg: "bg-fuchsia-100/80",
    iconColor: "text-fuchsia-600",
    valueColor: "text-slate-900",
  },
};

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  unit,
  variant = "indigo",
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className="relative flex items-center overflow-hidden rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm shadow-indigo-100/40 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-200/40 sm:block sm:p-5">
      {/* Accent top bar */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-0.75 rounded-t-2xl bg-linear-to-r",
          styles.topBar
        )}
      />

      {/* Icon (Di kiri pada mobile, di atas pada desktop) */}
      <div
        className={cn(
          "mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:mr-0 sm:mb-4 sm:h-11 sm:w-11",
          styles.iconBg
        )}
      >
        <Icon className={cn("h-5 w-5 sm:h-5 sm:w-5", styles.iconColor)} />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-1 items-center justify-between sm:block">
        {/* Label & Description */}
        <div className="min-w-0 pr-3 sm:pr-0">
          <p className="mb-0.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase sm:mb-1.5">
            {title}
          </p>

          {/* Value untuk Desktop (disembunyikan di mobile) */}
          <p
            className={cn(
              "hidden text-3xl leading-none font-extrabold sm:block",
              styles.valueColor
            )}
          >
            {value}
            {unit && (
              <span className="ml-0.5 text-base font-semibold text-slate-400">
                {unit}
              </span>
            )}
          </p>

          <p className="truncate text-xs text-slate-500 sm:mt-1.5 sm:whitespace-normal">
            {description}
          </p>
        </div>

        {/* Value untuk Mobile (Pindah ke kanan, disembunyikan di desktop) */}
        <div className="text-right sm:hidden">
          <p
            className={cn(
              "text-xl leading-none font-extrabold",
              styles.valueColor
            )}
          >
            {value}
            {unit && (
              <span className="ml-0.5 text-sm font-semibold text-slate-400">
                {unit}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
