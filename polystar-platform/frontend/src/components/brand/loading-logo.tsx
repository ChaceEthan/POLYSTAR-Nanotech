import { PolystarLogo } from "./polystar-logo";

export function LoadingLogo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-polystar-dark">
      <div className="grid justify-items-center gap-5">
        <div className="relative max-w-[280px]">
          <div className="absolute inset-0 animate-pulse rounded-lg border border-secondary/30" />
          <PolystarLogo variant="mark" priority className="relative px-3 py-2" />
        </div>
        <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}
