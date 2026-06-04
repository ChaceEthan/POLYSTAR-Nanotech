import { TranslationModel } from "../models/index.js";

export class TranslationsRepository {
  list(filter: Record<string, unknown> = {}) {
    return TranslationModel.find(filter).sort({ namespace: 1, key: 1 }).lean();
  }

  upsert(locale: string, namespace: string, key: string, value: string, payload: Record<string, unknown> = {}) {
    return TranslationModel.findOneAndUpdate(
      { locale, namespace, key },
      { ...payload, locale, namespace, key, value },
      { new: true, upsert: true, runValidators: true }
    ).lean();
  }

  delete(locale: string, namespace: string, key: string) {
    return TranslationModel.findOneAndDelete({ locale, namespace, key }).lean();
  }
}

export const translationsRepository = new TranslationsRepository();
