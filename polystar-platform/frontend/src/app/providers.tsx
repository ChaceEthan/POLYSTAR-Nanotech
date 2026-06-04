"use client";

import { I18nProvider } from "@/i18n/provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <QueryProvider>{children}</QueryProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
