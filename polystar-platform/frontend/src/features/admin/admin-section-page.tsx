"use client";

import { type FormEvent, useMemo, useState } from "react";
import { CheckCircle2, EyeOff, Pencil, Plus, Save, SlidersHorizontal, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, entityToDashboardRow } from "@/components/dashboard/data-table";
import { useApiResource } from "@/hooks/use-api-resource";
import { uploadFile } from "@/services/upload-service";
import type { EntityRecord } from "@/services/resource-service";
import { AdminSettingsSectionPage } from "./admin-settings-section-page";

const adminResourcePaths: Record<string, string> = {
  posts: "/blog-posts",
  "company-updates": "/company-updates",
  team: "/admins",
  "case-studies": "/case-studies",
  "blog-posts": "/blog-posts",
  "site-visits": "/site-visits",
  "support-tickets": "/support-tickets",
  "analytics-events": "/analytics-events"
};

const editableSections = new Set([
  "posts",
  "news",
  "company-updates",
  "projects",
  "portfolio",
  "case-studies",
  "blog-posts",
  "services",
  "gallery",
  "videos",
  "documents",
  "team",
  "careers"
]);
const mediaSections = new Set([
  "posts",
  "news",
  "company-updates",
  "projects",
  "portfolio",
  "case-studies",
  "blog-posts",
  "gallery",
  "videos",
  "documents",
  "team",
  "careers"
]);

type UploadedMedia = {
  secure_url?: string;
  url?: string;
  resource_type?: string;
  public_id?: string;
};

type EditorState = {
  title: string;
  slug: string;
  category: string;
  industry: string;
  summary: string;
  description: string;
  status: string;
  imageUrl: string;
  videoUrl: string;
  attachments: string;
};

const emptyEditorState: EditorState = {
  title: "",
  slug: "",
  category: "",
  industry: "",
  summary: "",
  description: "",
  status: "draft",
  imageUrl: "",
  videoUrl: "",
  attachments: ""
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : undefined;
}

function recordId(entity: EntityRecord) {
  return String(entity._id ?? entity.id ?? "");
}

function textValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function objectValue(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function editorStateFromRecord(entity?: EntityRecord): EditorState {
  if (!entity) return emptyEditorState;
  const attachments = Array.isArray(entity.attachments) ? entity.attachments.filter((item) => typeof item === "string").join("\n") : "";

  return {
    title: textValue(entity.title ?? entity.name),
    slug: textValue(entity.slug),
    category: textValue(entity.category),
    industry: textValue(entity.industry),
    summary: textValue(entity.summary),
    description: textValue(entity.description),
    status: textValue(entity.status) || "draft",
    imageUrl: textValue(entity.imageUrl),
    videoUrl: textValue(entity.videoUrl),
    attachments
  };
}

function attachmentsFromText(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function AdminSectionPage({ section }: { section: string }) {
  if (section === "seo" || section === "settings") {
    return <AdminSettingsSectionPage section={section} />;
  }

  const title = section.replaceAll("-", " ");
  const basePath = adminResourcePaths[section] ?? `/${section}`;
  const resource = useApiResource(section, basePath, { limit: 10, sortBy: "updatedAt", sortOrder: "desc" });
  const records = resource.list.data?.data ?? [];
  const rows = records.map(entityToDashboardRow);
  const recordsById = useMemo(() => new Map(records.map((entity) => [recordId(entity), entity])), [records]);
  const total = Number(resource.list.data?.meta?.total ?? rows.length);
  const canManageContent = editableSections.has(section);
  const canManageMedia = mediaSections.has(section);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [form, setForm] = useState<EditorState>(emptyEditorState);
  const [formError, setFormError] = useState<string | undefined>();
  const [uploading, setUploading] = useState<"image" | "video" | undefined>();
  const isSaving = resource.create.isPending || resource.update.isPending;
  const isMutating = isSaving || resource.remove.isPending;

  function openEditor(entity?: EntityRecord) {
    setEditingId(entity ? recordId(entity) : undefined);
    setForm(editorStateFromRecord(entity));
    setFormError(undefined);
    setEditorOpen(true);
  }

  function closeEditor() {
    setEditorOpen(false);
    setEditingId(undefined);
    setForm(emptyEditorState);
    setFormError(undefined);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(undefined);

    const attachments = attachmentsFromText(form.attachments);
    const currentRecord = editingId ? recordsById.get(editingId) : undefined;
    const metadata = objectValue(currentRecord?.metadata);
    const payload: Partial<EntityRecord> = {
      title: form.title,
      slug: form.slug || undefined,
      category: form.category || undefined,
      industry: form.industry || undefined,
      summary: form.summary || undefined,
      description: form.description || undefined,
      status: form.status,
      imageUrl: form.imageUrl || undefined,
      videoUrl: form.videoUrl || undefined,
      attachments,
      metadata: {
        ...metadata,
        media: {
          imageUrl: form.imageUrl || undefined,
          videoUrl: form.videoUrl || undefined,
          attachments
        }
      }
    };

    try {
      if (editingId) {
        await resource.update.mutateAsync({ id: editingId, payload });
      } else {
        await resource.create.mutateAsync(payload);
      }
      closeEditor();
    } catch (error) {
      setFormError(errorMessage(error) ?? "Unable to save this record.");
    }
  }

  async function publishRecord(entity: EntityRecord) {
    const id = recordId(entity);
    if (!id) return;
    setFormError(undefined);
    try {
      await resource.update.mutateAsync({ id, payload: { status: "published" } });
    } catch (error) {
      setFormError(errorMessage(error) ?? "Unable to publish this record.");
    }
  }

  async function unpublishRecord(entity: EntityRecord) {
    const id = recordId(entity);
    if (!id) return;
    setFormError(undefined);
    try {
      await resource.update.mutateAsync({ id, payload: { status: "draft" } });
    } catch (error) {
      setFormError(errorMessage(error) ?? "Unable to unpublish this record.");
    }
  }

  async function deleteRecord(entity: EntityRecord) {
    const id = recordId(entity);
    if (!id) return;
    if (typeof window !== "undefined" && !window.confirm(`Delete ${textValue(entity.title ?? entity.name) || "this record"}?`)) return;
    setFormError(undefined);
    try {
      await resource.remove.mutateAsync(id);
    } catch (error) {
      setFormError(errorMessage(error) ?? "Unable to delete this record.");
    }
  }

  async function handleFileUpload(kind: "image" | "video", file?: File) {
    if (!file) return;
    if (kind === "image" && !file.type.startsWith("image/")) {
      setFormError("Choose an image file.");
      return;
    }
    if (kind === "video" && !file.type.startsWith("video/")) {
      setFormError("Choose a video file.");
      return;
    }

    setUploading(kind);
    setFormError(undefined);
    try {
      const response = await uploadFile(file, `polystar-platform/${section}/${kind}s`);
      const media = response.data as UploadedMedia;
      const url = media.secure_url ?? media.url;
      if (!url) throw new Error("Upload completed without a media URL.");

      setForm((current) => {
        const nextAttachments = attachmentsFromText(current.attachments);
        if (!nextAttachments.includes(url)) nextAttachments.push(url);

        return {
          ...current,
          imageUrl: kind === "image" ? url : current.imageUrl,
          videoUrl: kind === "video" ? url : current.videoUrl,
          attachments: nextAttachments.join("\n")
        };
      });
    } catch (error) {
      setFormError(errorMessage(error) ?? "Upload failed.");
    } finally {
      setUploading(undefined);
    }
  }

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
          {canManageContent && (
            <Button onClick={() => openEditor()}>
              <Plus className="h-4 w-4" />
              New
            </Button>
          )}
        </div>
      </div>
      {editorOpen && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle>{editingId ? `Edit ${title}` : `New ${title}`}</CardTitle>
            <Button type="button" variant="ghost" size="icon" onClick={closeEditor} aria-label="Close editor">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-title`}>Title</Label>
                  <Input
                    id={`${section}-title`}
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-slug`}>Slug</Label>
                  <Input
                    id={`${section}-slug`}
                    value={form.slug}
                    onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-category`}>Category</Label>
                  <Input
                    id={`${section}-category`}
                    value={form.category}
                    onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-industry`}>Industry</Label>
                  <Input
                    id={`${section}-industry`}
                    value={form.industry}
                    onChange={(event) => setForm((current) => ({ ...current, industry: event.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${section}-summary`}>Summary</Label>
                <Textarea
                  id={`${section}-summary`}
                  value={form.summary}
                  onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${section}-description`}>Description</Label>
                <Textarea
                  id={`${section}-description`}
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-status`}>Status</Label>
                  <select
                    id={`${section}-status`}
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${section}-image-url`}>Primary Image URL</Label>
                  <Input
                    id={`${section}-image-url`}
                    value={form.imageUrl}
                    onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))}
                  />
                </div>
              </div>
              {canManageMedia && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`${section}-image-upload`}>Image Upload</Label>
                    <Input
                      id={`${section}-image-upload`}
                      type="file"
                      accept="image/*"
                      disabled={Boolean(uploading)}
                      onChange={(event) => handleFileUpload("image", event.target.files?.[0])}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`${section}-video-upload`}>Video Upload</Label>
                    <Input
                      id={`${section}-video-upload`}
                      type="file"
                      accept="video/*"
                      disabled={Boolean(uploading)}
                      onChange={(event) => handleFileUpload("video", event.target.files?.[0])}
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor={`${section}-video-url`}>Featured Video URL</Label>
                    <Input
                      id={`${section}-video-url`}
                      value={form.videoUrl}
                      onChange={(event) => setForm((current) => ({ ...current, videoUrl: event.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor={`${section}-attachments`}>Media Attachments</Label>
                    <Textarea
                      id={`${section}-attachments`}
                      value={form.attachments}
                      onChange={(event) => setForm((current) => ({ ...current, attachments: event.target.value }))}
                    />
                  </div>
                </div>
              )}
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeEditor}>
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving || Boolean(uploading)}>
                  {uploading ? <Upload className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                  {uploading ? "Uploading" : editingId ? "Save Changes" : "Create"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
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
            actions={
              canManageContent
                ? (row) => {
                    const entity = recordsById.get(row.id);
                    if (!entity) return null;

                    return (
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => openEditor(entity)}>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>
                        {row.status === "published" ? (
                          <Button type="button" variant="outline" size="sm" onClick={() => unpublishRecord(entity)} disabled={isMutating}>
                            <EyeOff className="h-4 w-4" />
                            Unpublish
                          </Button>
                        ) : (
                          <Button type="button" variant="secondary" size="sm" onClick={() => publishRecord(entity)} disabled={isMutating}>
                            <CheckCircle2 className="h-4 w-4" />
                            Publish
                          </Button>
                        )}
                        <Button type="button" variant="outline" size="sm" onClick={() => deleteRecord(entity)} disabled={isMutating}>
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    );
                  }
                : undefined
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
