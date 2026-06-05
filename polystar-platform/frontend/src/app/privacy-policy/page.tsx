import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Privacy Policy",
  "How POLYSTAR Nanotech Ltd handles submitted contact, quotation, consultation, and client portal data.",
  "/privacy-policy"
);

const sections = [
  {
    title: "Information We Collect",
    text: "POLYSTAR collects information submitted through contact, quotation, consultation, site visit, support, and client portal forms, including names, email addresses, phone numbers, company details, project information, and uploaded files."
  },
  {
    title: "How We Use Information",
    text: "Submitted information is used to respond to requests, prepare quotations, coordinate consultations, manage client workspaces, improve platform reliability, and maintain operational records."
  },
  {
    title: "Data Storage",
    text: "Production records are stored in managed database and media services configured for the POLYSTAR Platform. Access is limited to authorized owner, partner, admin, and editor roles according to operational need."
  },
  {
    title: "Contact",
    text: "For privacy requests, contact POLYSTAR Nanotech Ltd at info@polystar.rw."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="border-b bg-muted/40 py-16">
          <div className="container max-w-4xl">
            <p className="text-sm font-semibold uppercase text-secondary">Legal</p>
            <h1 className="mt-3 text-4xl font-semibold">Privacy Policy</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">How POLYSTAR Nanotech Ltd handles website, request, media, and client portal data.</p>
          </div>
        </section>
        <section className="py-14">
          <div className="container grid max-w-4xl gap-4">
            {sections.map((section) => (
              <Card key={section.title}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{section.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
