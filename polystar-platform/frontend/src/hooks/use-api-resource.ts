"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createResourceService, type EntityRecord, type ListParams } from "@/services/resource-service";

export function useApiResource<T extends EntityRecord = EntityRecord>(resourceKey: string, basePath: string, params?: ListParams) {
  const queryClient = useQueryClient();
  const service = createResourceService<T>(basePath);
  const listKey = [resourceKey, params];

  const list = useQuery({
    queryKey: listKey,
    queryFn: () => service.list(params)
  });

  const create = useMutation({
    mutationFn: (payload: Partial<T>) => service.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resourceKey] })
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<T> }) => service.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resourceKey] })
  });

  const remove = useMutation({
    mutationFn: (id: string) => service.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resourceKey] })
  });

  return { list, create, update, remove };
}
