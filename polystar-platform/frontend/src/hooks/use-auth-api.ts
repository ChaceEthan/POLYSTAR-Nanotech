"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, type LoginPayload, type RegisterPayload } from "@/services/auth-service";

export function useAuthApi() {
  const queryClient = useQueryClient();

  const me = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authService.me(),
    enabled: typeof window !== "undefined" && Boolean(window.localStorage.getItem("polystar_access_token"))
  });

  const login = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] })
  });

  const register = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["auth"] })
  });

  const logout = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => queryClient.removeQueries({ queryKey: ["auth"] })
  });

  return { me, login, register, logout };
}
