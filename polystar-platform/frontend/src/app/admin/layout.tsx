import Link from "next/link";
import { adminSections } from "@/lib/navigation";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r bg-polystar-dark p-4 text-white">
          <Link href="/admin" className="flex items-center" aria-label="POLYSTAR Admin dashboard">
            <PolystarLogo tone="light" className="max-w-[210px]" priority />
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Admin Dashboard</p>
          <nav className="mt-6 grid gap-1 text-sm">
            {adminSections.map((section) => (
              <Link key={section} href={`/admin/${section}`} className="rounded-md px-3 py-2 capitalize text-slate-300 hover:bg-white/10 hover:text-white">
                {section.replaceAll("-", " ")}
              </Link>
            ))}
          </nav>
        </aside>
        <section>
          <header className="flex h-16 items-center justify-between border-b px-4">
            <span className="text-sm font-medium text-muted-foreground">Dashboard Analytics</span>
            <ThemeToggle />
          </header>
          <div className="p-4 sm:p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
