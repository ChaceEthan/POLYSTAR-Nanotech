import { apiClient, type ApiEnvelope } from "./api-client";

export async function uploadFile(file: File, folder = "polystar-platform") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const response = await apiClient.post<ApiEnvelope<unknown>>("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
}
