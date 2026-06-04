import Image from "next/image";
import { brandAssets } from "@/lib/brand";
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
    <span className={cn("inline-flex items-center", tone === "light" && "brightness-110", className)}>
      <Image
        src={logoSources[variant]}
        alt="POLYSTAR Nanotech Ltd"
        width={isMark ? 320 : 320}
        height={isMark ? 100 : 100}
        priority={priority}
        className={cn(isMark ? "h-10 w-auto" : "h-10 w-auto sm:h-12")}
      />
    </span>
  );
}
