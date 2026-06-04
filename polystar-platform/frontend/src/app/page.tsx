import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { HomePage } from "@/features/home/home-page";

export default function Page() {
  return (
    <>
      <PublicHeader />
      <HomePage />
      <Footer />
    </>
  );
}
