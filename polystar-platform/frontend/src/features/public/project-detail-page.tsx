import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { ProjectDetail } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container max-w-5xl">
          <Badge variant="secondary">{project.sector}</Badge>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{project.summary}</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-8 text-muted-foreground">{project.overview}</p>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <DetailList title="Features" items={project.features} />
              <DetailList title="Benefits" items={project.benefits} />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {project.gallery.map((item) => (
                  <div key={item.title} className="overflow-hidden rounded-lg border bg-background">
                    <Image src={item.image} alt={item.title} width={640} height={420} className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <aside className="grid gap-4 content-start">
            <DetailList title="Technologies" items={project.technologies} />
            <DetailList title="Results" items={project.results} />
            <Card className="bg-polystar-dark text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Start a related project</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">Discuss requirements, feasibility, architecture, and delivery planning with POLYSTAR.</p>
                <Button asChild variant="secondary" className="mt-5">
                  <Link href="/request-consultation">
                    Request Consultation <ArrowRight className="h-4 w-4" />
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

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 text-sm leading-6 text-muted-foreground">
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
