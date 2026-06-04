"use client";

import { Languages } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { useLanguage } from "@/hooks/use-language";
import { Label } from "@/components/ui/label";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-4 w-4 text-muted-foreground" aria-hidden />
      <Label className="sr-only" htmlFor="language">
        Language
      </Label>
      <select
        id="language"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
        className="h-9 rounded-md border bg-background px-2 text-xs font-medium"
      >
        {siteConfig.languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
