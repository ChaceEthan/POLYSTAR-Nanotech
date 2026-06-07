import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicSectionPage } from "@/features/public/public-section-page";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Training Programs", undefined, "/training-programs");

export default function TrainingProgramsPage() {
  return (
    <>
      <PublicHeader />
      <PublicSectionPage slug="training-programs" />
      <Footer />
    </>
  );
}
