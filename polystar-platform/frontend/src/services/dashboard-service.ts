import { apiClient } from "./api-client";

export type DashboardSummary = {
  users: number;
  projects: number;
  quotations: number;
  consultations: number;
  contacts: number;
  tickets: number;
  blogPosts: number;
  news: number;
  companyUpdates: number;
  portfolioItems: number;
  caseStudies: number;
  services: number;
  testimonials: number;
  media: number;
  documents: number;
  messages: number;
};

export async function getDashboardSummary() {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary");
  return response.data;
}
