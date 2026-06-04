import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers3, ListChecks, Target } from "lucide-react";
import { publicPages } from "@/lib/navigation";
import { getPublicPageContent } from "@/lib/public-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RequestForm } from "./request-form";

export function PublicSectionPage({ slug }: { slug: string }) {
  const fallbackPage = publicPages.find((item) => item.slug === slug) ?? publicPages[0];
  const page = getPublicPageContent(slug) ?? {
    slug,
    eyebrow: "POLYSTAR Platform",
    title: fallbackPage.title,
    summary: fallbackPage.summary,
    intro: "POLYSTAR Nanotech Ltd delivers engineering, software, infrastructure, consultancy, and training programs for organizations that need dependable technology systems.",
    highlights: [
      "Enterprise-grade architecture and delivery controls",
      "Field-ready documentation and commissioning support",
      "Cloud, data, hardware, and operations aligned from the start"
    ],
    capabilities: [
      { title: "Integrated Delivery", text: "Technical planning, implementation, documentation, and support are coordinated through one engineering workflow." },
      { title: "Operational Fit", text: "Solutions are designed for maintainability, safety, and practical use by real teams." },
      { title: "Growth Ready", text: "Platforms and systems are prepared for future integrations, analytics, and organizational scale." }
    ],
    process: ["Assess", "Design", "Build", "Commission"],
    outcomes: ["Reliable systems", "Better data", "Stronger operations"],
    ctaTitle: "Work with POLYSTAR",
    ctaText: "Discuss your industrial, infrastructure, software, or innovation requirement with our technical team."
  };
  const formType = slug === "contact" ? "contact" : slug === "get-quotation" ? "quotation" : slug === "book-site-visit" ? "siteVisit" : slug === "request-consultation" ? "consultation" : undefined;

  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{page.summary}</p>
          </div>
          <div className="rounded-lg border bg-background p-5">
            <p className="text-sm leading-7 text-muted-foreground">{page.intro}</p>
          </div>
        </div>
      </section>
      <section className="py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <div className="grid gap-4 md:grid-cols-3">
              {page.highlights.map((highlight) => (
                <Card key={highlight}>
                  <CardHeader>
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    <CardTitle className="text-base">{highlight}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">Built for industrial accountability, measurable outcomes, and long-term maintainability.</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {page.capabilities.map((capability) => (
                <Card key={capability.title}>
                  <CardHeader>
                    <Layers3 className="h-5 w-5 text-secondary" />
                    <CardTitle className="text-lg">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">{capability.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <ListChecks className="h-5 w-5 text-primary" />
                  <CardTitle>Delivery Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {page.process.map((item) => (
                      <Badge key={item} variant="outline">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-5 w-5 text-accent" />
                  <CardTitle>Expected Outcomes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {page.outcomes.map((item) => (
                      <Badge key={item} variant="secondary">{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-5">
            {formType ? (
              <RequestForm type={formType} />
            ) : (
              <div>
                <h2 className="text-xl font-semibold">{page.ctaTitle}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {page.ctaText}
                </p>
                <Button asChild className="mt-5">
                  <Link href="/request-consultation">
                    Request Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
