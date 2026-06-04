import { SettingModel } from "../models/index.js";

export class SettingsRepository {
  list(filter: Record<string, unknown> = {}) {
    return SettingModel.find(filter).sort({ group: 1, key: 1 }).lean();
  }

  findByKey(key: string) {
    return SettingModel.findOne({ key }).lean();
  }

  upsert(key: string, payload: Record<string, unknown>) {
    return SettingModel.findOneAndUpdate(
      { key },
      { ...payload, key },
      { new: true, upsert: true, runValidators: true }
    ).lean();
  }

  delete(key: string) {
    return SettingModel.findOneAndDelete({ key }).lean();
  }
}

export const settingsRepository = new SettingsRepository();
