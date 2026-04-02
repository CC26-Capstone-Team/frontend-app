> ⚠️ **Catatan:** README ini masih dalam tahap awal (starter). Dokumentasi akan terus diperbarui seiring perkembangan project.

# Frontend App — CC26 Capstone Project

Frontend aplikasi untuk CC26 Capstone Project, dibangun dengan Next.js dan TypeScript.

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) |
| Language | [TypeScript 5](https://www.typescriptlang.org) |
| UI Library | [shadcn/ui](https://ui.shadcn.com) + [Radix UI](https://www.radix-ui.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Data Fetching | [TanStack Query v5](https://tanstack.com/query) + [Axios](https://axios-http.com) |
| Validation | [Zod v4](https://zod.dev) |
| Icons | [Lucide React](https://lucide.dev) |
| Package Manager | [pnpm](https://pnpm.io) |

## Instalasi

### Prasyarat

- Node.js >= 18
- pnpm >= 8

### Langkah-langkah

1. Clone repository

```bash
git clone <repo-url>
cd frontend-app
```

2. Install dependencies

```bash
pnpm install
```

3. Salin file environment dan sesuaikan isinya

```bash
cp .env.example .env.local
```

4. Jalankan development server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Scripts

```bash
pnpm dev      # Jalankan development server
pnpm build    # Build untuk production
pnpm start    # Jalankan production server
pnpm lint     # Jalankan linter
```

## Struktur Project

```
src/
├── app/          # Next.js App Router (pages & layouts)
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Utilities & konfigurasi API
└── providers/    # Context & query providers
```
