import { LanguageCode } from '@vklink/grpc-api';

import {
  GetTFormType,
  GetTSubFormType,
  TransFormSubmitData,
  TranslationFormDefaultValues,
} from '@/shared/types';

import {
  MAP_LANG_CODES,
  SupportedTransFormLanguage,
  TRANSLATION_FORM_DEFAULT_LANG,
} from '@/constants';

/**
 *
 * Map data to default values for translation form
 * Often used in edit page
 *
 * @param data - this is usually response from api
 * @param defaultLangMapHandler - this is used to map data to translation form for default language
 * @param subLangMapHandler - this is used to map data to translation form for non-default languages
 * @param options.translationField - property name of data, is used to get translation list for non-default languages
 * @param options.langCodeField - property name of item in translation list, is used to find item in translation list using in subLangMapHandler
 * @returns default values - {@link TranslationFormDefaultValues}
 *
 * @example
 * ```tsx
 * mapDataToTranslationForm<ApiResponse, NonNullable<FormDefaultValues>>(
 *   detail,
 *   (data: ApiResponse) => {
 *     return {
 *       ...more field here for default values for default language form
 *     };
 *   },
 *   (item in translation list) => {
 *     return {
 *       ...more field here for default values for non-default language form
 *     };
 *   }
 * );
 * ```
 */
export const mapDataToTranslationForm = <
  TData extends Record<string, any>,
  TDefaultValues extends TranslationFormDefaultValues<
    GetTFormType<TDefaultValues>,
    GetTSubFormType<TDefaultValues>
  >,
  TTranslationField extends keyof TData = 'translations',
  TForm = GetTFormType<TDefaultValues>,
  TSubForm = GetTSubFormType<TDefaultValues>,
>(
  data: TData,
  defaultLangMapHandler: (d: TData) => TForm,
  subLangMapHandler: (
    d: TData[TTranslationField][number],
    mappingLangCode: LanguageCode
  ) => TSubForm,
  options?: {
    translationField?: TTranslationField;
    langCodeField?: string;
  }
): Partial<TDefaultValues> => {
  const translationField = (options?.translationField || 'translations') as TTranslationField;
  const langCodeField = options?.langCodeField || 'langCode';
  const translationList = data[translationField] as Array<any>;
  const subLangs = Object.values(SupportedTransFormLanguage).filter(
    (t) => t !== TRANSLATION_FORM_DEFAULT_LANG
  );

  let mappedSubLang: Partial<TDefaultValues> = {};

  if (Array.isArray(translationList)) {
    mappedSubLang = subLangs.reduce((temp, lang) => {
      const langCode = MAP_LANG_CODES[lang];
      const translationData = translationList.find((t) => t[langCodeField] === langCode);

      if (!translationData) {
        return temp;
      }

      return {
        ...temp,
        [lang]: subLangMapHandler(translationData, langCode),
      };
    }, {});
  }

  return {
    [TRANSLATION_FORM_DEFAULT_LANG]: defaultLangMapHandler(data),
    ...mappedSubLang,
  };
};

export const autoMapTranslationListAsync = async <
  TTranslationObject extends Record<string, any>,
  TSubmitData extends TransFormSubmitData<GetTFormType<TSubmitData>, GetTSubFormType<TSubmitData>>,
  TSubForm = GetTSubFormType<TSubmitData>,
>(
  data: TSubmitData,
  mapHandler: (d: WithLangCode<TSubForm>) => Promise<TTranslationObject>,
  options?: {
    includeDefault?: boolean;
  }
) => {
  const supportedLangs = Object.values(SupportedTransFormLanguage).filter(
    (lang) => lang !== TRANSLATION_FORM_DEFAULT_LANG || options?.includeDefault
  );

  const subLangSubmitDataMaps = (
    Object.entries(data)
      .map(([lang, submitData]) => {
        const langCode = (MAP_LANG_CODES as Record<string, LanguageCode>)[lang];

        if (!langCode || !submitData || !supportedLangs.includes(lang as any)) {
          return null;
        }

        return {
          langCode,
          ...submitData,
        };
      })
      .filter(Boolean) as any[] as WithLangCode<TSubForm>[]
  ).sort((a, b) => a.langCode - b.langCode);

  return Promise.all(subLangSubmitDataMaps.map((d) => mapHandler(d)));
};
