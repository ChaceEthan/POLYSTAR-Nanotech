import Image from "next/image";
import { brandAssets, officialLogoDimensions } from "@/lib/brand";
import { cn } from "@/lib/utils";

type LogoVariant = "full" | "mark";
type LogoTone = "default" | "light";

const logoSources: Record<LogoVariant, string> = {
  full: brandAssets.navbarLogo,
  mark: brandAssets.mark
};

export function PolystarLogo({
  variant = "full",
  tone = "default",
  className,
  priority = false
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
  priority?: boolean;
}) {
  const isMark = variant === "mark";

  return (
    <span className={cn("inline-flex items-center", className)} data-logo-tone={tone}>
      <Image
        src={logoSources[variant]}
        alt="POLYSTAR Nanotech Ltd"
        width={officialLogoDimensions.width}
        height={officialLogoDimensions.height}
        priority={priority}
        sizes={isMark ? "96px" : "(min-width: 640px) 288px, 220px"}
        className={cn(isMark ? "h-10 w-auto object-contain" : "h-10 w-auto object-contain sm:h-12")}
      />
    </span>
  );
}
