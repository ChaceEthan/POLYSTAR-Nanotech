import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata("Terms and Conditions", "Terms governing use of the POLYSTAR Platform and public website.", "/terms-and-conditions");

const sections = [
  {
    title: "Use of the Platform",
    text: "The POLYSTAR Platform provides public company information, request forms, content pages, and authenticated workspaces for authorized users."
  },
  {
    title: "Requests and Quotations",
    text: "Submitted quotation, consultation, contact, and site visit requests are treated as preliminary inquiries until POLYSTAR confirms scope, schedule, terms, and commercial details in writing."
  },
  {
    title: "Content and Media",
    text: "Website content, documents, images, videos, and platform records are owned by POLYSTAR Nanotech Ltd or their respective rights holders and may not be reused without permission."
  },
  {
    title: "Account Access",
    text: "Authenticated users are responsible for maintaining credential confidentiality and using admin, partner, editor, or client access only for authorized POLYSTAR work."
  }
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="border-b bg-muted/40 py-16">
          <div className="container max-w-4xl">
            <p className="text-sm font-semibold uppercase text-secondary">Legal</p>
            <h1 className="mt-3 text-4xl font-semibold">Terms and Conditions</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">Terms governing use of the POLYSTAR Platform and public website.</p>
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
