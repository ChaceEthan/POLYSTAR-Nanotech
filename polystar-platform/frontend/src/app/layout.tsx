import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { GoogleAnalytics } from "@/components/integrations/google-analytics";
import { createMetadata, organizationJsonLd, serviceCatalogJsonLd, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceCatalogJsonLd()) }}
        />
        <GoogleAnalytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
