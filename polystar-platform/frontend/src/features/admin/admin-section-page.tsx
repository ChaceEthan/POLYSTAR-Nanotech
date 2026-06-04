"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, entityToDashboardRow } from "@/components/dashboard/data-table";
import { useApiResource } from "@/hooks/use-api-resource";

const adminResourcePaths: Record<string, string> = {
  "case-studies": "/case-studies",
  "blog-posts": "/blog-posts",
  "site-visits": "/site-visits",
  "support-tickets": "/support-tickets",
  "analytics-events": "/analytics-events"
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : undefined;
}

export function AdminSectionPage({ section }: { section: string }) {
  const title = section.replaceAll("-", " ");
  const basePath = adminResourcePaths[section] ?? `/${section}`;
  const resource = useApiResource(section, basePath, { limit: 10, sortBy: "updatedAt", sortOrder: "desc" });
  const rows = (resource.list.data?.data ?? []).map(entityToDashboardRow);
  const total = Number(resource.list.data?.meta?.total ?? rows.length);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-secondary">Management</p>
          <h1 className="mt-1 text-3xl font-semibold capitalize">{title}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            New
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">{title} records {resource.list.isSuccess ? `(${total})` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={rows}
            isLoading={resource.list.isLoading}
            error={errorMessage(resource.list.error)}
            emptyMessage={`No ${title} records are available yet.`}
          />
        </CardContent>
      </Card>
    </div>
  );
}
