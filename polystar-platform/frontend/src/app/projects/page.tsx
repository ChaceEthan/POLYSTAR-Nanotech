import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { ProjectListPage } from "@/features/public/project-list-page";
import { getCmsProjects } from "@/lib/cms-content";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Projects", "Detailed POLYSTAR project pages for AGROMETER, Smart Water Meter, Visitor Management System, RFID Attendance System, and Fish Feed Drying Machine.", "/projects");
export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getCmsProjects();

  return (
    <>
      <PublicHeader />
      <ProjectListPage items={projects} />
      <Footer />
    </>
  );
}
