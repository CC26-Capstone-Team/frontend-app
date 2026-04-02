"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Gunakan useState agar QueryClient tidak dibuat ulang setiap kali re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Data dianggap "segar" selama 1 menit
            retry: 1, // Jika gagal, coba lagi 1 kali saja
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Panel DevTools akan muncul di pojok kanan bawah saat dev mode */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
