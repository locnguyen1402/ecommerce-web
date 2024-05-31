import { LanguageCode } from '@vklink/grpc-api';

export enum SupportedTransFormLanguage {
  EN = 'en',
  VN = 'vn',
  KR = 'kr',
  JP = 'jp',
}

export const TRANSLATION_FORM_DEFAULT_LANG = SupportedTransFormLanguage.EN;

export const MAP_LANG_CODES: Record<SupportedTransFormLanguage, LanguageCode> = {
  [SupportedTransFormLanguage.EN]: LanguageCode.EN,
  [SupportedTransFormLanguage.VN]: LanguageCode.VN,
  [SupportedTransFormLanguage.KR]: LanguageCode.KR,
  [SupportedTransFormLanguage.JP]: LanguageCode.JP,
};

export const MAP_SUPPORTED_TRANS_FORM_LANGUAGES: Record<LanguageCode, SupportedTransFormLanguage> =
  {
    [LanguageCode.UNSPECIFIED]: SupportedTransFormLanguage.EN,
    [LanguageCode.EN]: SupportedTransFormLanguage.EN,
    [LanguageCode.VN]: SupportedTransFormLanguage.VN,
    [LanguageCode.KR]: SupportedTransFormLanguage.KR,
    [LanguageCode.JP]: SupportedTransFormLanguage.JP,
  };
