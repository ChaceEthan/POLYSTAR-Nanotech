"use client";

import Link from "next/link";
import { Activity, BookOpenText, BriefcaseBusiness, Contact, FileQuestion, FolderKanban, HelpCircle, Layers3, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminMenuItems } from "@/lib/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, entityToDashboardRow } from "@/components/dashboard/data-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { useApiResource } from "@/hooks/use-api-resource";
import { getDashboardSummary } from "@/services/dashboard-service";

const icons = [Users, FolderKanban, FileQuestion, Activity, Contact, HelpCircle, BookOpenText, Layers3, BriefcaseBusiness];

function metricChange(isLoading: boolean, error: unknown, fallback: string) {
  if (isLoading) return "Loading summary";
  if (error) return "Summary unavailable";
  return fallback;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : undefined;
}

export function AdminDashboard() {
  const summary = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary
  });
  const activeProjects = useApiResource("admin-active-projects", "/projects", { limit: 5, status: "active" });
  const recentRows = (activeProjects.list.data?.data ?? []).map(entityToDashboardRow);
  const counts = summary.data;
  const change = (label: string) => metricChange(summary.isLoading, summary.error, label);

  const metrics = [
    { label: "Users", value: String(counts?.users ?? 0), change: change("Mongo users count") },
    { label: "Projects", value: String(counts?.projects ?? 0), change: change("Mongo projects count") },
    { label: "Quotations", value: String(counts?.quotations ?? 0), change: change("Mongo quotations count") },
    { label: "Consultations", value: String(counts?.consultations ?? 0), change: change("Mongo consultations count") },
    { label: "Contacts", value: String(counts?.contacts ?? 0), change: change("Mongo contacts count") },
    { label: "Tickets", value: String(counts?.tickets ?? 0), change: change("Mongo tickets count") },
    { label: "Blog Posts", value: String(counts?.blogPosts ?? 0), change: change("Mongo blog count") },
    { label: "Portfolio Items", value: String(counts?.portfolioItems ?? 0), change: change("Mongo portfolio count") },
    { label: "Case Studies", value: String(counts?.caseStudies ?? 0), change: change("Mongo case study count") }
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge variant="secondary">Admin Dashboard</Badge>
          <h1 className="mt-2 text-3xl font-semibold">Operational command center</h1>
        </div>
        <Button asChild>
          <Link href="/admin/projects">Manage Projects</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
          <CardTitle>Recent platform activity</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            rows={recentRows}
            isLoading={activeProjects.list.isLoading}
            error={errorMessage(activeProjects.list.error)}
            emptyMessage="No active project records are available yet."
          />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {adminMenuItems.filter((item) => item.href !== "/admin").map((item) => (
          <Button key={item.href} asChild variant="outline" className="justify-start">
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
