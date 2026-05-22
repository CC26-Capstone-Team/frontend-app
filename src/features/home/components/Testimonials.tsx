"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Data Testimoni dengan variasi panjang teks
const testimonials = [
  {
    name: "Ahmad Rizky",
    username: "@ahmadrizky",
    quote:
      "Awalnya bingung mau fokus ke Backend atau Data Science. Setelah pakai CarPathMu, saya dapat roadmap yang jelas.",
    avatarColor: "bg-indigo-100 text-indigo-600",
  },
  {
    name: "Sarah Wijaya",
    username: "@sarah_wjy",
    quote: "Sangat membantu buat fresh graduate!",
    avatarColor: "bg-fuchsia-100 text-fuchsia-600",
  },
  {
    name: "Bima Santoso",
    username: "@bimacodes",
    quote:
      "Pindah karir dari Sales ke UI/UX sangat menakutkan, tapi roadmap dari platform ini membuat proses belajarnya jadi terstruktur. UI-nya juga clean banget.",
    avatarColor: "bg-emerald-100 text-emerald-600",
  },
  {
    name: "Nadia Putri",
    username: "@nadiaptr",
    quote:
      "Gak nyangka AI-nya bisa baca potensi aku sebaik ini. Profil LinkedIn aku langsung banjir pesan dari rekruter. Fitur rekomendasi kursusnya juga juara!",
    avatarColor: "bg-purple-100 text-purple-600",
  },
  {
    name: "Kevin Pratama",
    username: "@kevinprtm",
    quote: "Roadmap-nya detail banget dari A sampai Z. Compass karir terbaik.",
    avatarColor: "bg-rose-100 text-rose-600",
  },
  {
    name: "Dinda Lestari",
    username: "@dindalstr",
    quote:
      "Platform ini beneran jadi kompas yang nyelamatin karir. Thank you CarPathMu!",
    avatarColor: "bg-sky-100 text-sky-600",
  },
  {
    name: "Rizky Fauzi",
    username: "@rfauzi",
    quote: "AI Analyst-nya gila sih, akurat banget nebak minat terpendam aku.",
    avatarColor: "bg-orange-100 text-orange-600",
  },
  {
    name: "Maya Indah",
    username: "@mayaindah",
    quote: "Cuma butuh 5 menit tes, langsung dapet path yang jelas.",
    avatarColor: "bg-pink-100 text-pink-600",
  },
];

// Sub-komponen untuk Kolom yang Berjalan
const TestimonialColumn = ({
  items,
  duration = 40,
  reverse = false,
}: {
  items: typeof testimonials;
  duration?: number;
  reverse?: boolean;
}) => {
  return (
    <div className="relative h-150 overflow-hidden">
      <motion.div
        className="flex flex-col gap-6"
        animate={{
          y: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        // Berhenti saat di-hover agar user bisa membaca
        whileHover={{ animationPlayState: "paused" }}
      >
        {/* Duplikasi item 2x untuk infinite loop */}
        {[...items, ...items].map((testi, idx) => (
          <Card
            key={idx}
            className="group relative border-slate-200/60 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:shadow-xl"
          >
            {/* AWS Glow Effect */}
            <div className="absolute -inset-0.5 -z-10 rounded-xl bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30" />

            <CardContent className="p-0">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${testi.avatarColor}`}
                >
                  {testi.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">
                    {testi.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {testi.username}
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-700 italic">
                &ldquo;{testi.quote}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  // Membagi data ke 3 kolom secara acak/merata
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 8).concat(testimonials.slice(0, 1));

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-indigo-50/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="block bg-linear-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-sm font-bold text-transparent">
            WALL OF LOVE
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Telah Membantu 5.000+ Karir
          </h2>
        </motion.div>

        {/* Masonry Infinite Container */}
        {/* Mask-image untuk fade-out di atas dan bawah */}
        <div className="relative grid grid-cols-1 gap-6 mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:grid-cols-2 lg:grid-cols-3">
          {/* Kolom 1 - Jalan Normal */}
          <TestimonialColumn items={firstColumn} duration={35} />

          {/* Kolom 2 - Jalan Terbalik / Lebih Cepat */}
          <div className="hidden md:block">
            <TestimonialColumn
              items={secondColumn}
              duration={45}
              reverse={true}
            />
          </div>

          {/* Kolom 3 - Jalan Normal / Lebih Lambat */}
          <div className="hidden lg:block">
            <TestimonialColumn items={thirdColumn} duration={55} />
          </div>
        </div>
      </div>
    </section>
  );
}
