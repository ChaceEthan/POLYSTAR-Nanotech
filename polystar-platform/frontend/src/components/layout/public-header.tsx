"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { publicNavigation } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center" aria-label="POLYSTAR Nanotech Ltd home">
          <PolystarLogo priority className="max-w-[180px] sm:max-w-[230px]" />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button asChild size="sm">
            <Link href="/get-quotation">Get Quotation</Link>
          </Button>
        </div>
        <Button className="md:hidden" variant="outline" size="icon" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <div className={cn("border-t bg-background md:hidden", open ? "block" : "hidden")}>
        <nav className="container grid gap-1 py-3">
          {publicNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-muted" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-2 px-3 py-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
