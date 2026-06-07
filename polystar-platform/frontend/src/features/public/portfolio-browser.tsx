"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { portfolioItems, professionalImages, type PortfolioItem } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function PortfolioBrowser({ items = portfolioItems }: { items?: PortfolioItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((item) => item.category)))], [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchable = [item.title, item.summary, item.category, item.sector, ...item.tags, ...item.services, ...item.technologies].join(" ").toLowerCase();
      return categoryMatch && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, items, normalizedQuery]);

  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Portfolio</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Engineering work organized for fast technical review.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Search POLYSTAR work by category, sector, technology, and service area. Each item includes a detail page, gallery, and impact summary.
          </p>
        </div>
      </section>
      <section className="py-10">
        <div className="container grid gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search portfolio" className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <Button key={item} type="button" variant={category === item ? "default" : "outline"} size="sm" onClick={() => setCategory(item)}>
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.slug} className="overflow-hidden">
                <Image src={item.gallery[0]?.image ?? professionalImages.embeddedTechnology} alt={item.title} width={760} height={420} className="h-44 w-full object-cover" />
                <CardHeader>
                  <Badge variant="outline">{item.category}</Badge>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button asChild className="mt-5">
                    <Link href={`/portfolio/${item.slug}`}>View Portfolio Item</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-sm text-muted-foreground">No portfolio items match this search yet.</CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </main>
  );
}
