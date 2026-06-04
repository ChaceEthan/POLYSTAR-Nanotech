import { translationsRepository } from "../repositories/translations.repository.js";
import { AppError } from "../middleware/error.js";

export class TranslationsService {
  async byLocale(locale: string, namespace?: string) {
    const rows = await translationsRepository.list({
      locale,
      status: "active",
      ...(namespace ? { namespace } : {})
    });

    return rows.reduce<Record<string, string>>((acc, row) => {
      acc[`${row.namespace}.${row.key}`] = row.value;
      return acc;
    }, {});
  }

  list(locale?: string, namespace?: string) {
    return translationsRepository.list({
      ...(locale ? { locale } : {}),
      ...(namespace ? { namespace } : {})
    });
  }

  upsert(payload: { locale: string; namespace?: string; key: string; value: string; status?: string; metadata?: Record<string, unknown>; updatedBy?: string }) {
    return translationsRepository.upsert(payload.locale, payload.namespace ?? "common", payload.key, payload.value, payload);
  }

  async delete(locale: string, namespace: string, key: string) {
    const translation = await translationsRepository.delete(locale, namespace, key);
    if (!translation) throw new AppError("Translation not found", 404, "TRANSLATION_NOT_FOUND");
    return translation;
  }
}

export const translationsService = new TranslationsService();
