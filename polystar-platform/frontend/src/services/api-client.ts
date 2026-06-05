import axios from "axios";
import { siteConfig } from "@/lib/constants";

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
  meta?: Record<string, unknown>;
};

export const apiClient = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("polystar_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.code === "ECONNABORTED"
        ? "The request timed out while connecting to the POLYSTAR API. Please try again."
        : error.response?.data?.message ?? error.message ?? "Request failed";
    return Promise.reject(new Error(message));
  }
);

export async function apiGet<T>(path: string, params?: Record<string, unknown>) {
  const response = await apiClient.get<ApiEnvelope<T>>(path, { params });
  return response.data;
}

export async function apiPost<TResponse, TPayload = unknown>(path: string, payload?: TPayload) {
  const response = await apiClient.post<ApiEnvelope<TResponse>>(path, payload);
  return response.data;
}

export async function apiPut<TResponse, TPayload = unknown>(path: string, payload?: TPayload) {
  const response = await apiClient.put<ApiEnvelope<TResponse>>(path, payload);
  return response.data;
}

export async function apiDelete<TResponse>(path: string) {
  const response = await apiClient.delete<ApiEnvelope<TResponse>>(path);
  return response.data;
}
