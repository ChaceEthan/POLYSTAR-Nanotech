"use client";

import Link from "next/link";
import { Bell, FileText, FolderKanban, LifeBuoy } from "lucide-react";
import { clientSections } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, entityToDashboardRow } from "@/components/dashboard/data-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { useApiResource } from "@/hooks/use-api-resource";

const icons = [FolderKanban, FileText, Bell, LifeBuoy];

function totalFrom(result: { data?: { data?: unknown[]; meta?: Record<string, unknown> } }) {
  return String(result.data?.meta?.total ?? result.data?.data?.length ?? "0");
}

function metricChange(isLoading: boolean, error: unknown, fallback: string) {
  if (isLoading) return "Loading data";
  if (error) return "Check portal access";
  return fallback;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : undefined;
}

export function ClientDashboard() {
  const projects = useApiResource("client-dashboard-projects", "/projects", { limit: 5, status: "active" });
  const documents = useApiResource("client-dashboard-documents", "/documents", { limit: 1 });
  const reports = useApiResource("client-dashboard-reports", "/reports", { limit: 1 });
  const tickets = useApiResource("client-dashboard-tickets", "/support-tickets", { limit: 1 });
  const projectRows = (projects.list.data?.data ?? []).map(entityToDashboardRow);

  const metrics = [
    { label: "Active Projects", value: totalFrom(projects.list), change: metricChange(projects.list.isLoading, projects.list.error, "Visible project records") },
    { label: "Documents", value: totalFrom(documents.list), change: metricChange(documents.list.isLoading, documents.list.error, "Portal document library") },
    { label: "Reports", value: totalFrom(reports.list), change: metricChange(reports.list.isLoading, reports.list.error, "Project reporting") },
    { label: "Tickets", value: totalFrom(tickets.list), change: metricChange(tickets.list.isLoading, tickets.list.error, "Support requests") }
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-secondary">Client Portal</p>
          <h1 className="mt-1 text-3xl font-semibold">Project workspace</h1>
        </div>
        <Button asChild>
          <Link href="/client/tickets">Open Support Ticket</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = icons[index];
          return (
            <div key={metric.label} className="relative">
              <Icon className="absolute right-5 top-5 h-5 w-5 text-secondary" />
              <StatCard metric={metric} />
            </div>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Current project activity</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={projectRows}
            isLoading={projects.list.isLoading}
            error={errorMessage(projects.list.error)}
            emptyMessage="No active project records are available in this portal yet."
          />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {clientSections.map((section) => (
          <Button key={section} asChild variant="outline" className="justify-start">
            <Link href={`/client/${section}`}>{section}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
