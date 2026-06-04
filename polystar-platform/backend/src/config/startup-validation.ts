import { logger } from "../utils/logger.js";

type ValidationGroup = {
  name: string;
  required?: boolean;
  keys: string[];
};

const groups: ValidationGroup[] = [
  { name: "MongoDB Atlas", required: true, keys: ["MONGODB_URI"] },
  { name: "JWT access secret", required: true, keys: ["JWT_SECRET", "JWT_ACCESS_SECRET"] },
  { name: "JWT refresh secret", required: true, keys: ["JWT_REFRESH_SECRET"] },
  { name: "Cloudinary", keys: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"] },
  { name: "Google Maps", keys: ["GOOGLE_MAPS_API_KEY", "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"] },
  { name: "Google Analytics", keys: ["GOOGLE_ANALYTICS_ID", "NEXT_PUBLIC_GA_MEASUREMENT_ID"] },
  { name: "Google reCAPTCHA", keys: ["GOOGLE_RECAPTCHA_SITE_KEY", "GOOGLE_RECAPTCHA_SECRET_KEY"] },
  { name: "Google Search Console", keys: ["GOOGLE_SEARCH_CONSOLE_VERIFICATION"] }
];

function hasAnyKey(keys: string[]) {
  return keys.some((key) => Boolean(process.env[key]));
}

function missingKeys(keys: string[]) {
  return keys.filter((key) => !process.env[key]);
}

export function validateStartupEnvironment() {
  const missingRequired = groups.filter((group) => group.required && !hasAnyKey(group.keys));
  if (missingRequired.length > 0) {
    throw new Error(`Missing required environment groups: ${missingRequired.map((group) => group.name).join(", ")}`);
  }

  const optionalMissing = groups
    .filter((group) => !group.required && !hasAnyKey(group.keys))
    .map((group) => ({ integration: group.name, acceptedKeys: group.keys }));

  const partial = groups
    .filter((group) => hasAnyKey(group.keys) && missingKeys(group.keys).length > 0 && group.keys.length > 1)
    .map((group) => ({ integration: group.name, missingKeys: missingKeys(group.keys) }));

  if (optionalMissing.length > 0) {
    logger.warn("Optional integration environment keys are missing", { optionalMissing });
  }

  if (partial.length > 0) {
    logger.info("Some integration aliases or paired keys are not set", { partial });
  }

  logger.info("Startup environment validation completed", {
    requiredGroups: groups.filter((group) => group.required).map((group) => group.name)
  });
}
