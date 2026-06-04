import { apiClient } from "./api-client";
export { resources } from "./resource-service";
export { requestService } from "./request-service";

export async function listContent<T>(path: string) {
  const response = await apiClient.get<{ data: T[] }>(path);
  return response.data.data;
}

export async function submitRequest<T>(path: string, payload: T) {
  const response = await apiClient.post(path, payload);
  return response.data;
}
