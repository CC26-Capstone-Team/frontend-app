# Frontend App — CC26 Capstone Project

Frontend aplikasi untuk **CC26 Capstone Project - CarPathMu**, dibangun menggunakan **Next.js 16 (App Router)** dan **TypeScript**. Aplikasi ini dirancang untuk menganalisis riwayat akademis dan skill pengguna guna memberikan rekomendasi karir personal yang relevan, lengkap dengan jalur pembelajaran (kursus) dan lowongan pekerjaan yang sesuai.

---

## 🚀 Fitur Utama

Aplikasi ini memiliki beberapa fitur utama yang telah diimplementasikan:

1. **Landing Page Interaktif**
   - Animasi Hero Section menggunakan **Framer Motion**.
   - Efek mengetik dinamis (typing effect) pada simulasi terminal untuk proses analisis.
   - Penjelasan Masalah & Solusi, Langkah Penggunaan, Testimoni, dan Section CTA.
2. **Sistem Autentikasi**
   - Login & Register dengan validasi client-side yang aman menggunakan **Zod** dan **TanStack Form**.
   - Integrasi **Google Sign-In** (`@react-oauth/google`).
   - Manajemen session dan otorisasi menggunakan cookies (`cookies-next` & `js-cookie`) didukung oleh Next.js Middleware.
3. **Multi-step Onboarding Form**
   - Formulir terpandu untuk mengumpulkan latar belakang akademik (tingkat pendidikan, jurusan).
   - Pencarian dan pemilihan skill secara dinamis dengan input tag auto-complete.
4. **Dashboard Utama**
   - Statistik profil pengguna (jumlah rekomendasi karir, tingkat kecocokan tertinggi).
   - Ringkasan rekomendasi karir teratas.
   - Pilihan untuk melakukan re-analisis profile secara berkala.
5. **Rekomendasi Karir Personal**
   - Daftar rekomendasi karir terurut berdasarkan *Match Score* (tingkat kesesuaian).
   - Fitur filter berdasarkan sektor industri.
   - Halaman detail karir yang mengintegrasikan:
     - **Rekomendasi Kursus**: Daftar materi pembelajaran beserta tautan langsung.
     - **Lowongan Pekerjaan**: Informasi lowongan aktif yang relevan.
     - Fitur **Refresh Data** (Force Reload) untuk memperbarui rekomendasi kursus dan lowongan kerja secara real-time.
6. **Manajemen Profil & Skillset**
   - Unggah/ubah foto profil (avatar) dengan preview.
   - Edit detail riwayat pendidikan dan kustomisasi daftar skill langsung dari halaman profil.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan teknologi modern berikut:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.2.2 (App Router)](https://nextjs.org) | React Framework untuk Production & SSR |
| **Language** | [TypeScript 5](https://www.typescriptlang.org) | Type Safety & Developer Experience |
| **UI Library** | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) | Komponen UI yang aksesibel dan mudah di-kustomisasi |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + PostCSS | Utility-first CSS dengan performa tinggi |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Library animasi deklaratif untuk React |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com) | Caching, synchronization, dan penanganan HTTP request |
| **Form & Validation** | [TanStack Form](https://tanstack.com/form) + [Zod v3](https://zod.dev) | Manajemen form state & skema validasi tipe data |
| **Auth** | [@react-oauth/google](https://github.com/MomenSherif/react-oauth) | Integrasi integrasi Google Login SDK |
| **Image Engine** | [Sharp](https://sharp.pixelplumbing.com/) | Optimasi rendering gambar di sisi server |

---

## 📂 Struktur Project

Project ini menggunakan arsitektur modular berbasis **Features**. Setiap modul bisnis dikelompokkan di dalam folder `src/features`.

```text
src/
├── app/                  # Next.js App Router (Routing, Pages, & Layouts)
│   ├── (auth)/           # Route Group untuk Login & Register
│   ├── (main)/           # Route Group utama (Dashboard, Career Recs, Profile)
│   └── (onboarding)/     # Route Group untuk form Onboarding
├── components/           # Reusable UI components global (shadcn/ui)
├── features/             # Modul modular berbasis fitur bisnis
│   ├── auth/             # Form & logic login/register
│   ├── career-recommendations/ # List, detail, kursus, & job recommendations
│   ├── dashboard/        # Tampilan utama user & widget statistik
│   ├── home/             # Komponen landing page
│   ├── onboarding/       # Multi-step questionnaire & pencarian skill
│   └── profile/          # Profil user, riwayat pendidikan & edit skill
├── hooks/                # Custom React Hooks global
├── lib/                  # Konfigurasi client API (Axios, interceptor) & utility helper
├── providers/            # React Context, QueryClient, & Theme Provider
└── middleware.ts         # Middleware proteksi route & validasi token session
```

Setiap folder di dalam `src/features/[feature-name]` terstruktur sebagai berikut:
* `components/` — Komponen UI spesifik untuk fitur tersebut.
* `hooks/` — Custom hooks/queries (TanStack Query) untuk data fetching fitur.
* `service/` — Fungsi pemanggilan API (Axios service).
* `types/` — Definisi tipe data TypeScript untuk fitur terkait.

---

## ⚙️ Konfigurasi Environment

Salin file `.env.example` menjadi `.env` (atau `.env.local` untuk development lokal) dan sesuaikan nilainya:

```bash
cp .env.example .env
```

Isi variabel environment berikut:

```env
# URL base untuk API Backend Express.js
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# URL opsional untuk service AI/DS jika terpisah
NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8000

# Versi aplikasi untuk keperluan demo/tracking
NEXT_PUBLIC_APP_VERSION=1.0.0

# Client ID dari Google Developer Console untuk Google OAuth
NEXT_PUBLIC_OAUTH_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

---

## 💻 Instalasi & Pengembangan Lokal

### Prasyarat
* **Node.js** >= 18.x
* **pnpm** >= 8.x (Direkomendasikan menggunakan pnpm)

### Langkah-langkah
1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd frontend-app
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```
3. **Jalankan Development Server**
   ```bash
   pnpm dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

4. **Formatting & Linting**
   ```bash
   pnpm lint      # Cek kepatuhan aturan ESLint
   pnpm format    # Merapikan kode menggunakan Prettier
   ```

---

## 🐳 Docker Containerization

Aplikasi ini sudah dikonfigurasi untuk dijalankan menggunakan Docker, baik untuk lokal testing maupun deployment ke production menggunakan Next.js standalone mode.

### Menjalankan dengan Docker Compose
1. Pastikan docker-daemon sedang berjalan.
2. Jalankan perintah berikut untuk membuild dan menjalankan container:
   ```bash
   docker-compose up -d --build
   ```
3. Aplikasi akan dapat diakses di port `3000` ([http://localhost:3000](http://localhost:3000)).

### Build Image Manual
Jika ingin membuild image secara manual tanpa Docker Compose:
```bash
docker build --build-arg NEXT_PUBLIC_API_URL="https://api.domainanda.com" -t capstone-frontend:latest .
```

---

## 📝 Scripts Command

Berikut adalah perintah pnpm yang tersedia:

| Perintah | Deskripsi |
| :--- | :--- |
| `pnpm dev` | Menjalankan server development dengan hot-reloading |
| `pnpm build` | Membuild aplikasi Next.js untuk kebutuhan production |
| `pnpm start` | Menjalankan build production yang telah dibuat |
| `pnpm lint` | Memvalidasi kepatuhan kode terhadap ESLint rules |
| `pnpm format` | Menjalankan prettier untuk merapikan penulisan kode |
| `pnpm format:check` | Memeriksa apakah file sudah terformat dengan benar |
