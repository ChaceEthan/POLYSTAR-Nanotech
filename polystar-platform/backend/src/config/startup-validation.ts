import { logger } from "../utils/logger.js";

type ValidationGroup = {
  name: string;
  keys: string[];
  mode?: "any" | "all";
  requiredForProduction?: boolean;
  minimumLength?: number;
};

const groups: ValidationGroup[] = [
  { name: "MongoDB Atlas", keys: ["MONGODB_URI"], requiredForProduction: true },
  { name: "JWT access secret", keys: ["JWT_SECRET", "JWT_ACCESS_SECRET"], mode: "any", requiredForProduction: true, minimumLength: 24 },
  { name: "JWT refresh secret", keys: ["JWT_REFRESH_SECRET"], requiredForProduction: true, minimumLength: 24 },
  { name: "SMTP", keys: ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"], mode: "all" },
  { name: "Cloudinary", keys: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"], mode: "all" }
];

function hasAnyKey(keys: string[]) {
  return keys.some((key) => Boolean(process.env[key]));
}

function hasAllKeys(keys: string[]) {
  return keys.every((key) => Boolean(process.env[key]));
}

function missingKeys(keys: string[]) {
  return keys.filter((key) => !process.env[key]);
}

function shortKeys(group: ValidationGroup) {
  if (!group.minimumLength) return [];

  return group.keys.filter((key) => {
    const value = process.env[key];
    return value ? value.length < group.minimumLength! : false;
  });
}

export function validateStartupEnvironment() {
  const isProduction = process.env.NODE_ENV === "production";
  const configured = (group: ValidationGroup) => (group.mode === "all" ? hasAllKeys(group.keys) : hasAnyKey(group.keys));

  const missingProduction = groups
    .filter((group) => isProduction && group.requiredForProduction && !configured(group))
    .map((group) => ({ integration: group.name, acceptedKeys: group.keys }));

  const optionalMissing = groups
    .filter((group) => !group.requiredForProduction && !configured(group))
    .map((group) => ({ integration: group.name, acceptedKeys: group.keys }));

  const partial = groups
    .filter((group) => hasAnyKey(group.keys) && missingKeys(group.keys).length > 0 && group.keys.length > 1 && group.mode === "all")
    .map((group) => ({ integration: group.name, missingKeys: missingKeys(group.keys) }));

  const weakSecrets = groups
    .map((group) => ({ integration: group.name, shortKeys: shortKeys(group), minimumLength: group.minimumLength }))
    .filter((group) => group.shortKeys.length > 0);

  if (missingProduction.length > 0) {
    logger.error("Production environment is missing required configuration; affected features will be degraded", {
      missingProduction
    });
  }

  if (weakSecrets.length > 0) {
    logger.error("Secrets are shorter than the required minimum length", { weakSecrets });
  }

  if (optionalMissing.length > 0) {
    logger.warn("Optional integration environment keys are missing", { optionalMissing });
  }

  if (partial.length > 0) {
    logger.info("Some integration aliases or paired keys are not set", { partial });
  }

  logger.info("Startup environment validation completed", {
    requiredForProduction: groups.filter((group) => group.requiredForProduction).map((group) => group.name),
    missingProductionCount: missingProduction.length
  });
}
