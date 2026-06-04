import type { DashboardMetric } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StatCard({ metric }: { metric: DashboardMetric }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{metric.value}</div>
        <p className="mt-1 text-xs text-accent">{metric.change}</p>
      </CardContent>
    </Card>
  );
}
