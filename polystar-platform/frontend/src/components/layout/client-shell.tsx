"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientSections } from "@/lib/navigation";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/client/login") return <>{children}</>;

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r bg-card p-4">
          <Link href="/client" className="flex items-center" aria-label="POLYSTAR client portal">
            <PolystarLogo className="max-w-[210px]" priority />
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Client Portal</p>
          <nav className="mt-6 grid gap-1 text-sm">
            {clientSections.map((section) => (
              <Link key={section} href={`/client/${section}`} className="rounded-md px-3 py-2 capitalize text-muted-foreground hover:bg-muted hover:text-foreground">
                {section}
              </Link>
            ))}
          </nav>
        </aside>
        <section>
          <header className="flex h-16 items-center justify-between border-b px-4">
            <span className="text-sm font-medium text-muted-foreground">Client workspace</span>
            <ThemeToggle />
          </header>
          <div className="p-4 sm:p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
