"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMenuItems } from "@/lib/navigation";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuthApi } from "@/hooks/use-auth-api";

const adminRoles = new Set(["owner", "partner", "super_admin", "admin", "editor"]);

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const auth = useAuthApi();
  const [mounted, setMounted] = useState(false);
  const token = mounted && typeof window !== "undefined" ? window.localStorage.getItem("polystar_access_token") : null;
  const user = auth.me.data?.data;
  const isAllowed = Boolean(user?.role && adminRoles.has(user.role));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token) router.replace("/login");
  }, [mounted, router, token]);

  useEffect(() => {
    if (user && !isAllowed) router.replace("/client");
  }, [isAllowed, router, user]);

  if (!mounted || !token || auth.me.isLoading || (user && !isAllowed)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Checking access</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r bg-polystar-dark p-4 text-white">
          <Link href="/admin" className="flex items-center" aria-label="POLYSTAR Admin dashboard">
            <PolystarLogo tone="light" className="max-w-[210px]" priority />
          </Link>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Admin Dashboard</p>
          <nav className="mt-6 grid gap-1 text-sm">
            {adminMenuItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>
          <header className="flex h-16 items-center justify-between border-b px-4">
            <span className="text-sm font-medium text-muted-foreground">{user ? `${user.name} - ${user.role}` : "Dashboard Analytics"}</span>
            <ThemeToggle />
          </header>
          <div className="p-4 sm:p-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
