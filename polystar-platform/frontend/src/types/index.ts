export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
};

export type NavigationItem = {
  href: string;
  label: string;
};

export type RequestFormType = "contact" | "consultation" | "quotation" | "siteVisit";
