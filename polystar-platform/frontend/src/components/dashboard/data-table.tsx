import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type DashboardRow = {
  id: string;
  name: string;
  owner: string;
  status: string;
  updated: string;
};

function formatUpdated(value: unknown) {
  if (!value) return "Not updated";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function entityToDashboardRow(entity: Record<string, unknown>, index: number): DashboardRow {
  const id = String(entity._id ?? entity.id ?? entity.slug ?? entity.key ?? index);
  const name = String(entity.title ?? entity.name ?? entity.subject ?? entity.key ?? entity.event ?? entity.email ?? "Untitled record");
  const owner = String(entity.category ?? entity.industry ?? entity.locale ?? entity.role ?? entity.company ?? "POLYSTAR");
  const status = String(entity.status ?? "active");
  const updated = formatUpdated(entity.updatedAt ?? entity.createdAt);

  return { id, name, owner, status, updated };
}

export function DataTable({
  rows = [],
  isLoading = false,
  error,
  emptyMessage = "No records found."
}: {
  rows?: DashboardRow[];
  isLoading?: boolean;
  error?: string;
  emptyMessage?: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <TableRow key={`loading-${index}`}>
              <TableCell colSpan={4}>
                <div className="h-5 w-full animate-pulse rounded bg-muted" />
              </TableCell>
            </TableRow>
          ))}
        {!isLoading && error && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-sm text-destructive">
              {error}
            </TableCell>
          </TableRow>
        )}
        {!isLoading && !error && rows.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-sm text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
        {!isLoading && !error && rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.name}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell>
              <Badge variant={row.status === "active" ? "accent" : "outline"}>{row.status}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{row.updated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
