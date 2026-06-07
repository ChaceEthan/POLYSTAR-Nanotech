import Image from "next/image";
import Link from "next/link";
import { blogArticles } from "@/lib/public-content";
import type { BlogArticle } from "@/lib/public-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogListPage({ articles = blogArticles }: { articles?: BlogArticle[] }) {
  return (
    <main>
      <section className="border-b bg-muted/40 py-16">
        <div className="container max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">Blog</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">Engineering insight for industry, infrastructure, and innovation.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Professional articles on Industrial IoT, smart cities, embedded systems, AI in industry, and engineering innovation in Rwanda.
          </p>
        </div>
      </section>
      <section className="py-14">
        <div className="container grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug} className="overflow-hidden">
              <Image src={article.heroImage} alt={article.title} width={760} height={420} className="h-44 w-full object-cover" />
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <Badge variant="secondary">{article.readingTime}</Badge>
                </div>
                <CardTitle>{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <Button asChild className="mt-5">
                  <Link href={`/blog/${article.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
