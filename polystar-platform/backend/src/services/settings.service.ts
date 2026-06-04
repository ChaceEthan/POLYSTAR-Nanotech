import { settingsRepository } from "../repositories/settings.repository.js";
import { AppError } from "../middleware/error.js";

export class SettingsService {
  list() {
    return settingsRepository.list();
  }

  publicSettings() {
    return settingsRepository.list({ isPublic: true });
  }

  async get(key: string) {
    const setting = await settingsRepository.findByKey(key);
    if (!setting) throw new AppError("Setting not found", 404, "SETTING_NOT_FOUND");
    return setting;
  }

  upsert(key: string, payload: Record<string, unknown>) {
    return settingsRepository.upsert(key, payload);
  }

  async delete(key: string) {
    const setting = await settingsRepository.delete(key);
    if (!setting) throw new AppError("Setting not found", 404, "SETTING_NOT_FOUND");
    return setting;
  }
}

export const settingsService = new SettingsService();
