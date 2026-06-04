import mongoose from "mongoose";
import { AppError } from "../middleware/error.js";

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

const summaryCollections = [
  { key: "users", collection: "users" },
  { key: "projects", collection: "projects" },
  { key: "quotations", collection: "quotations" },
  { key: "consultations", collection: "consultations" },
  { key: "contacts", collection: "contacts" },
  { key: "tickets", collection: "support_tickets" },
  { key: "blogPosts", collection: "blog_posts" },
  { key: "portfolioItems", collection: "portfolio" },
  { key: "caseStudies", collection: "case_studies" }
] as const;

const emptySummary: DashboardSummary = {
  users: 0,
  projects: 0,
  quotations: 0,
  consultations: 0,
  contacts: 0,
  tickets: 0,
  blogPosts: 0,
  portfolioItems: 0,
  caseStudies: 0
};

const cacheTtlMs = 30_000;
let cache: { expiresAt: number; value: DashboardSummary } | undefined;

function countPipeline(key: keyof DashboardSummary) {
  return [
    { $group: { _id: null, count: { $sum: 1 } } },
    { $project: { _id: 0, key: { $literal: key }, count: 1 } }
  ];
}

export async function getDashboardSummary() {
  if (cache && cache.expiresAt > Date.now()) return cache.value;

  const database = mongoose.connection.db;
  if (!database) throw new AppError("Database is not connected", 503, "DATABASE_NOT_CONNECTED");

  const [first, ...rest] = summaryCollections;
  const rows = await database
    .collection(first.collection)
    .aggregate([
      ...countPipeline(first.key),
      ...rest.map((item) => ({
        $unionWith: {
          coll: item.collection,
          pipeline: countPipeline(item.key)
        }
      })),
      { $group: { _id: null, pairs: { $push: { k: "$key", v: "$count" } } } },
      { $replaceRoot: { newRoot: { $arrayToObject: "$pairs" } } }
    ])
    .toArray();

  const value = { ...emptySummary, ...(rows[0] as Partial<DashboardSummary> | undefined) };
  cache = { value, expiresAt: Date.now() + cacheTtlMs };

  return value;
}
