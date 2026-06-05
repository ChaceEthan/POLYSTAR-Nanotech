import Link from "next/link";
import { COMPANY } from "@polystar/shared";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { QrCodeCard } from "@/components/qr/qr-code-card";

const columns = [
  { title: "Company", links: ["About", "Careers", "Partner With Us", "Contact"] },
  { title: "Solutions", links: ["Services", "Industries", "Software Development", "Training Programs"] },
  { title: "Knowledge", links: ["Research & Innovation", "Case Studies", "Blog", "Downloads"] }
];

export function Footer() {
  return (
    <footer className="border-t bg-polystar-dark text-white">
      <div className="container grid gap-8 py-12 lg:grid-cols-[1.2fr_2fr_0.8fr]">
        <div>
          <PolystarLogo tone="light" className="max-w-[260px]" />
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">{COMPANY.tagline}</p>
          <p className="mt-4 text-sm text-slate-400">Kigali, Rwanda</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold">{column.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href={`/${link.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}`} className="hover:text-white">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <QrCodeCard />
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="container flex flex-col gap-3 text-xs text-slate-400 lg:flex-row lg:items-center lg:justify-between">
          <span>© {new Date().getFullYear()} POLYSTAR Nanotech Ltd. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/contact-us" className="hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
