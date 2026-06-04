import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectListPage() {
  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Real POLYSTAR engineering projects.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Explore complete project references across AgriTech, smart infrastructure, identity systems, enterprise software, and industrial equipment.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.slug} className="flex flex-col">
              <CardHeader>
                <Badge variant="outline">{project.sector}</Badge>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm leading-6 text-muted-foreground">{project.summary}</p>
                <Button asChild className="mt-6 w-fit">
                  <Link href={`/projects/${project.slug}`}>
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
