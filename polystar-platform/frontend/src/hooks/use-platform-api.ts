"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analyticsService, type AnalyticsEventPayload } from "@/services/analytics-service";
import { requestService, type PublicRequestPayload } from "@/services/request-service";
import { settingsService } from "@/services/settings-service";
import { ticketService, type TicketPayload, type TicketReplyPayload } from "@/services/ticket-service";
import { translationsService, type TranslationPayload } from "@/services/translations-service";
import { uploadFile } from "@/services/upload-service";

export function usePublicRequests() {
  return {
    contact: useMutation({ mutationFn: (payload: PublicRequestPayload) => requestService.contact(payload) }),
    quotation: useMutation({ mutationFn: (payload: PublicRequestPayload) => requestService.quotation(payload) }),
    consultation: useMutation({ mutationFn: (payload: PublicRequestPayload) => requestService.consultation(payload) }),
    siteVisit: useMutation({ mutationFn: (payload: PublicRequestPayload) => requestService.siteVisit(payload) })
  };
}

export function useTickets() {
  const queryClient = useQueryClient();
  const list = useQuery({ queryKey: ["tickets"], queryFn: () => ticketService.list() });
  const create = useMutation({
    mutationFn: (payload: TicketPayload) => ticketService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] })
  });
  const reply = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TicketReplyPayload }) => ticketService.reply(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] })
  });
  const close = useMutation({
    mutationFn: (id: string) => ticketService.close(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tickets"] })
  });

  return { list, create, reply, close };
}

export function useSettings() {
  const queryClient = useQueryClient();
  const publicSettings = useQuery({ queryKey: ["settings", "public"], queryFn: () => settingsService.publicSettings() });
  const list = useQuery({ queryKey: ["settings"], queryFn: () => settingsService.list(), enabled: false });
  const upsert = useMutation({
    mutationFn: ({ key, payload }: { key: string; payload: Parameters<typeof settingsService.upsert>[1] }) =>
      settingsService.upsert(key, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] })
  });

  return { publicSettings, list, upsert };
}

export function useTranslations(locale: string, namespace?: string) {
  const queryClient = useQueryClient();
  const publicLocale = useQuery({
    queryKey: ["translations", locale, namespace],
    queryFn: () => translationsService.publicLocale(locale, namespace)
  });
  const upsert = useMutation({
    mutationFn: (payload: TranslationPayload) => translationsService.upsert(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["translations"] })
  });

  return { publicLocale, upsert };
}

export function useAnalytics() {
  return {
    track: useMutation({ mutationFn: (payload: AnalyticsEventPayload) => analyticsService.track(payload) }),
    summary: useQuery({ queryKey: ["analytics", "summary"], queryFn: () => analyticsService.summary(), enabled: false })
  };
}

export function useUpload() {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder?: string }) => uploadFile(file, folder)
  });
}
