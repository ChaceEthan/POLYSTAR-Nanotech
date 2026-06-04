import { apiClient } from "./api-client";

export type DashboardSummary = {
  users: number;
  projects: number;
  quotations: number;
  consultations: number;
  contacts: number;
  tickets: number;
  blogPosts: number;
  portfolioItems: number;
  caseStudies: number;
};

export async function getDashboardSummary() {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary");
  return response.data;
}
