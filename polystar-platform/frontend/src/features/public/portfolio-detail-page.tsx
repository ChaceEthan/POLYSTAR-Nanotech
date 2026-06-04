import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { PortfolioItem } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PortfolioDetailPage({ item }: { item: PortfolioItem }) {
  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container max-w-5xl">
          <Badge variant="secondary">{item.category}</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{item.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{item.summary}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Detail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-8 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Gallery View</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {item.gallery.map((galleryItem) => (
                  <div key={galleryItem.title} className="overflow-hidden rounded-lg border bg-background">
                    <Image src={galleryItem.image} alt={galleryItem.title} width={720} height={420} className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold">{galleryItem.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{galleryItem.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <aside className="grid gap-4 content-start">
            <ListCard title="Services" items={item.services} />
            <ListCard title="Technologies" items={item.technologies} />
            <ListCard title="Impact" items={item.impact} />
            <Card className="bg-polystar-dark text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Plan a similar solution</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">Use this portfolio reference as a starting point for your own engineering requirement.</p>
                <Button asChild variant="secondary" className="mt-5">
                  <Link href="/get-quotation">
                    Get Quotation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm text-muted-foreground">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
