import type { MetadataRoute } from "next";
import { brandAssets } from "@/lib/brand";
import { siteConfig } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.platformName,
    short_name: "POLYSTAR",
    description: siteConfig.tagline,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0A2E5D",
    categories: ["business", "productivity", "technology"],
    lang: "en",
    icons: [
      {
        src: brandAssets.favicon,
        sizes: "3000x900",
        type: "image/png",
        purpose: "any"
      },
      {
        src: brandAssets.loadingMark,
        sizes: "3000x900",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
