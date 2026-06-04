import { repositories } from "../repositories/index.js";
import { GenericCrudService } from "./generic.service.js";

export const services = Object.fromEntries(
  Object.entries(repositories).map(([collection, repository]) => [collection, new GenericCrudService(repository)])
) as Record<keyof typeof repositories, GenericCrudService<any>>;
