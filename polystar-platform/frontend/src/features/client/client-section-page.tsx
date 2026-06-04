"use client";

import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, entityToDashboardRow } from "@/components/dashboard/data-table";
import { useApiResource } from "@/hooks/use-api-resource";

const clientResourcePaths: Record<string, string> = {
  tickets: "/support-tickets"
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : undefined;
}

export function ClientSectionPage({ section }: { section: string }) {
  const basePath = clientResourcePaths[section] ?? `/${section}`;
  const resource = useApiResource(`client-${section}`, basePath, { limit: 10, sortBy: "updatedAt", sortOrder: "desc" });
  const rows = (resource.list.data?.data ?? []).map(entityToDashboardRow);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-secondary">Client Workspace</p>
          <h1 className="mt-1 text-3xl font-semibold capitalize">{section}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="h-4 w-4" />
            Search
          </Button>
          <Button>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{section} overview</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={rows}
            isLoading={resource.list.isLoading}
            error={errorMessage(resource.list.error)}
            emptyMessage={`No ${section} are available in your workspace yet.`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
