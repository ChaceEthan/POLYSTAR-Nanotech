import type { AuthUser } from "@polystar/shared";
import { apiGet, apiPost } from "./api-client";
import { clearSession, setSession } from "@/store/session-store";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
  company?: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export const authService = {
  async login(payload: LoginPayload) {
    const response = await apiPost<AuthResponse, LoginPayload>("/auth/login", payload);
    setSession({ accessToken: response.data.accessToken, userName: response.data.user.name });
    return response;
  },
  async register(payload: RegisterPayload) {
    const response = await apiPost<AuthResponse, RegisterPayload>("/auth/register", payload);
    setSession({ accessToken: response.data.accessToken, userName: response.data.user.name });
    return response;
  },
  async refresh(refreshToken?: string) {
    const response = await apiPost<AuthResponse, { refreshToken?: string }>("/auth/refresh", { refreshToken });
    setSession({ accessToken: response.data.accessToken, userName: response.data.user.name });
    return response;
  },
  async logout(refreshToken?: string) {
    const response = await apiPost<{ loggedOut: boolean }, { refreshToken?: string }>("/auth/logout", { refreshToken });
    clearSession();
    return response;
  },
  me: () => apiGet<AuthUser>("/auth/me")
};
