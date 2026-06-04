export const DEFAULT_GA_MEASUREMENT_ID = "G-X7YMP4YSNM";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || DEFAULT_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __POLYSTAR_GA_INITIALIZED__?: boolean;
  }
}

export function isGoogleAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function pageview(url: string) {
  if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    send_page_view: true
  });
}

export function trackEvent(
  action: string,
  params: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: unknown;
  } = {}
) {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    event_category: params.category,
    event_label: params.label,
    value: params.value,
    ...params
  });
}
