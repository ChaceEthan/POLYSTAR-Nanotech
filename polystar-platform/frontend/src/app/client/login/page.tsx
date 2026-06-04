import Link from "next/link";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ClientLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="gap-4">
          <PolystarLogo priority className="max-w-[240px]" />
          <CardTitle>Client Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button asChild>
            <Link href="/client">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
