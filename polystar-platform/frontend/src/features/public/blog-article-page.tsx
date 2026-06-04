import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogArticle } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  return (
    <main>
      <article>
        <section className="border-b bg-muted/40 py-16">
          <div className="container max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{article.category}</Badge>
              <Badge variant="outline">{article.readingTime}</Badge>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {article.author} · {new Date(article.publishedAt).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </section>
        <section className="py-10">
          <div className="container max-w-4xl">
            <Image src={article.heroImage} alt={article.title} width={1100} height={620} className="h-auto w-full rounded-lg border object-cover" priority />
            <div className="mt-10 grid gap-8">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold">{section.heading}</h2>
                  <p className="mt-3 leading-8 text-muted-foreground">{section.body}</p>
                </section>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
            <Card className="mt-10 bg-polystar-dark text-white">
              <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Apply this thinking to your operation</h2>
                  <p className="mt-2 text-sm text-slate-300">POLYSTAR can help design the engineering system behind the idea.</p>
                </div>
                <Button asChild variant="secondary">
                  <Link href="/request-consultation">
                    Request Consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </article>
    </main>
  );
}
