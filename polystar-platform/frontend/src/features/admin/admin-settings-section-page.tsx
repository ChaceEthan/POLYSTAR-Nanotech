"use client";

import { type FormEvent, useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, type DashboardRow } from "@/components/dashboard/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { settingsService } from "@/services/settings-service";

type SettingRecord = {
  key: string;
  value?: unknown;
  group?: string;
  isPublic?: boolean;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
};

type SettingsForm = {
  key: string;
  value: string;
  description: string;
  isPublic: boolean;
};

const emptyForm: SettingsForm = {
  key: "",
  value: "",
  description: "",
  isPublic: false
};

function formatUpdated(value: unknown) {
  if (!value) return "Not updated";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : value == null ? "" : JSON.stringify(value, null, 2);
}

function parseSettingValue(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function formFromRecord(record?: SettingRecord): SettingsForm {
  if (!record) return emptyForm;

  return {
    key: record.key,
    value: stringValue(record.value),
    description: record.description ?? "",
    isPublic: Boolean(record.isPublic)
  };
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to save this setting.";
}

export function AdminSettingsSectionPage({ section }: { section: "seo" | "settings" }) {
  const queryClient = useQueryClient();
  const group = section === "seo" ? "seo" : "general";
  const title = section === "seo" ? "SEO" : "settings";
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | undefined>();
  const [form, setForm] = useState<SettingsForm>(emptyForm);
  const [formError, setFormError] = useState<string | undefined>();
  const list = useQuery({
    queryKey: ["settings", section],
    queryFn: () => settingsService.list()
  });
  const records = ((list.data?.data ?? []) as SettingRecord[]).filter((record) => (record.group ?? "general") === group);
  const recordsByKey = useMemo(() => new Map(records.map((record) => [record.key, record])), [records]);
  const rows: DashboardRow[] = records.map((record) => ({
    id: record.key,
    name: record.key,
    owner: record.group ?? group,
    status: record.isPublic ? "published" : "draft",
    updated: formatUpdated(record.updatedAt ?? record.createdAt)
  }));
  const save = useMutation({
    mutationFn: ({ key, payload }: { key: string; payload: Parameters<typeof settingsService.upsert>[1] }) => settingsService.upsert(key, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] })
  });
  const remove = useMutation({
    mutationFn: (key: string) => settingsService.remove(key),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] })
  });

  function openEditor(record?: SettingRecord) {
    setEditingKey(record?.key);
    setForm(formFromRecord(record));
    setFormError(undefined);
    setEditorOpen(true);
  }

  function closeEditor() {
    setEditingKey(undefined);
    setForm(emptyForm);
    setFormError(undefined);
    setEditorOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(undefined);

    try {
      await save.mutateAsync({
        key: editingKey ?? form.key,
        payload: {
          value: parseSettingValue(form.value),
          group,
          isPublic: form.isPublic,
          description: form.description || undefined
        }
      });
      closeEditor();
    } catch (error) {
      setFormError(errorMessage(error));
    }
  }

  async function setPublic(record: SettingRecord, isPublic: boolean) {
    setFormError(undefined);
    try {
      await save.mutateAsync({
        key: record.key,
        payload: {
          value: record.value,
          group: record.group ?? group,
          isPublic,
          description: record.description
        }
      });
    } catch (error) {
      setFormError(errorMessage(error));
    }
  }

  async function deleteSetting(record: SettingRecord) {
    if (typeof window !== "undefined" && !window.confirm(`Delete ${record.key}?`)) return;
    setFormError(undefined);
    try {
      await remove.mutateAsync(record.key);
    } catch (error) {
      setFormError(errorMessage(error));
    }
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-secondary">CMS</p>
          <h1 className="mt-1 text-3xl font-semibold capitalize">{title}</h1>
        </div>
        <Button onClick={() => openEditor()}>
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>
      {editorOpen && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>{editingKey ? `Edit ${editingKey}` : `New ${title} setting`}</CardTitle>
            <Button type="button" variant="ghost" size="icon" onClick={closeEditor} aria-label="Close editor">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`${section}-key`}>Key</Label>
                <Input
                  id={`${section}-key`}
                  value={form.key}
                  disabled={Boolean(editingKey)}
                  onChange={(event) => setForm((current) => ({ ...current, key: event.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${section}-value`}>Value</Label>
                <Textarea id={`${section}-value`} value={form.value} onChange={(event) => setForm((current) => ({ ...current, value: event.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${section}-description`}>Description</Label>
                <Input
                  id={`${section}-description`}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isPublic}
                  onChange={(event) => setForm((current) => ({ ...current, isPublic: event.target.checked }))}
                />
                Published
              </label>
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeEditor}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" disabled={save.isPending}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{title} records {list.isSuccess ? `(${rows.length})` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          {formError && !editorOpen && <p className="mb-4 text-sm text-destructive">{formError}</p>}
          <DataTable
            rows={rows}
            isLoading={list.isLoading}
            error={errorMessage(list.error)}
            emptyMessage={`No ${title} settings are available yet.`}
            actions={(row) => {
              const record = recordsByKey.get(row.id);
              if (!record) return null;

              return (
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => openEditor(record)}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  {record.isPublic ? (
                    <Button type="button" variant="outline" size="sm" onClick={() => setPublic(record, false)} disabled={save.isPending}>
                      <EyeOff className="h-4 w-4" />
                      Unpublish
                    </Button>
                  ) : (
                    <Button type="button" variant="secondary" size="sm" onClick={() => setPublic(record, true)} disabled={save.isPending}>
                      <CheckCircle2 className="h-4 w-4" />
                      Publish
                    </Button>
                  )}
                  <Button type="button" variant="outline" size="sm" onClick={() => deleteSetting(record)} disabled={remove.isPending}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
