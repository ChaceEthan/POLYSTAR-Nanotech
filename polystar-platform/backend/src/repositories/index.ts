import { modelRegistry } from "../models/index.js";
import { GenericRepository } from "./generic.repository.js";

export const repositories = Object.fromEntries(
  Object.entries(modelRegistry).map(([collection, model]) => [collection, new GenericRepository(model)])
) as Record<keyof typeof modelRegistry, GenericRepository<any>>;
