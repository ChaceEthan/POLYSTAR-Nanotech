# POLYSTAR Platform Analytics

POLYSTAR Platform uses Google Analytics 4 through the Next.js App Router.

## Measurement ID

Set the public frontend environment variable:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-X7YMP4YSNM
```

The analytics utility keeps `G-X7YMP4YSNM` as the audited fallback so local builds still initialize with the official POLYSTAR GA4 property when the public variable is absent.

## Implementation

- `frontend/src/lib/analytics.ts` centralizes the GA4 measurement ID, page view tracking, and event tracking.
- `frontend/src/components/integrations/google-analytics.tsx` injects `gtag.js` globally with `next/script`.
- A browser guard named `window.__POLYSTAR_GA_INITIALIZED__` prevents duplicate initialization.
- Route changes are tracked automatically with `usePathname` and `useSearchParams`.

The injected Google tag resolves to:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-X7YMP4YSNM"></script>
```

and initializes GA4 with:

```ts
gtag("config", "G-X7YMP4YSNM");
```

The production implementation disables the automatic first page view during initialization and sends page views through the reusable route tracker. This prevents duplicate page view events in the App Router.

## Tracking Events

Use the shared helper from client components:

```ts
import { trackEvent } from "@/lib/analytics";

trackEvent("quotation_cta_click", {
  category: "engagement",
  label: "homepage_hero"
});
```

Do not initialize `gtag` directly in feature components. Keep all event calls routed through the shared utility so naming, payload structure, and guards stay consistent.
