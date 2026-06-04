"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">The platform could not complete this request.</p>
        <Button className="mt-6" onClick={reset}>Try Again</Button>
      </div>
    </main>
  );
}
