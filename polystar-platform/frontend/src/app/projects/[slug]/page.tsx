import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProjectDetailPage } from "@/features/public/project-detail-page";
import { getCmsProject } from "@/lib/cms-content";
import { projects } from "@/lib/public-content";
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCmsProject(slug);

  return project ? createMetadata(project.title, project.summary, `/projects/${project.slug}`) : createMetadata("Project", undefined, "/projects");
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCmsProject(slug);

  if (!project) notFound();

  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", url: siteConfig.website },
    { name: "Projects", url: `${siteConfig.website}/projects` },
    { name: project.title, url: `${siteConfig.website}/projects/${project.slug}` }
  ]);

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PublicHeader />
      <ProjectDetailPage project={project} />
      <Footer />
    </>
  );
}
