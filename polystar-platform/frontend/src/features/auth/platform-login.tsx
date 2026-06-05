"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { PolystarLogo } from "@/components/brand/polystar-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthApi } from "@/hooks/use-auth-api";

const adminRoles = new Set(["super_admin", "admin", "editor"]);

function nextPathForRole(role: string) {
  if (adminRoles.has(role)) return "/admin";
  if (role === "partner") return "/admin/blog-posts";
  return "/client";
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Login failed.";
}

export function PlatformLogin() {
  const router = useRouter();
  const auth = useAuthApi();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    try {
      const response = await auth.login.mutateAsync({ email, password });
      router.push(nextPathForRole(response.data.user.role));
    } catch (loginError) {
      setError(errorMessage(loginError));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="gap-4">
          <PolystarLogo priority className="max-w-[240px]" />
          <CardTitle>Platform Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={auth.login.isPending}>
              <LogIn className="h-4 w-4" />
              {auth.login.isPending ? "Logging In" : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
