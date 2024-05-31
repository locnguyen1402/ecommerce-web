import {
  FormDefaultValues,
  UseFormGetValues,
  UseFormSetValue,
  ValidationMode,
  yup,
} from '@vklink/components';

import { SupportedTransFormLanguage } from '@/constants';

export type GetTFormType<T> =
  T extends Partial<infer U>
    ? U extends TransFormLanguageMapObject<infer TForm, infer TSubForm>
      ? TSubForm extends undefined
        ? TForm
        : TForm
      : never
    : never;

export type GetTSubFormType<T> =
  T extends Partial<infer U>
    ? U extends TransFormLanguageMapObject<infer TForm, infer TSubForm>
      ? TForm extends undefined
        ? TForm
        : TSubForm extends undefined
          ? TForm
          : TSubForm
      : never
    : never;

export type TransFormSubLanguages = Exclude<`${SupportedTransFormLanguage}`, 'en'>;
export type TransFormMainLanguage = Exclude<`${SupportedTransFormLanguage}`, TransFormSubLanguages>;

export type TranslationFormProps = {
  control: any;
};

export type TransFormLanguageMapObject<TMain, TSub = TMain> = {
  [key in TransFormMainLanguage | TransFormSubLanguages]: key extends TransFormMainLanguage
    ? TMain
    : TSub extends undefined
      ? TMain
      : TSub;
};

export type TransFormSubmitData<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any> = TForm,
> = TransFormLanguageMapObject<TForm, TSubForm | null> & {
  defaultData: TForm;
};

export type TranslationFormSchema<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any> = TForm,
> = Partial<
  TransFormLanguageMapObject<
    yup.ObjectSchema<TForm>,
    yup.ObjectSchema<TSubForm extends undefined ? TForm : TSubForm>
  >
>;

export type TranslationFormDefaultValues<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any> = TForm,
> = Partial<
  TransFormLanguageMapObject<
    FormDefaultValues<TForm>,
    FormDefaultValues<TSubForm extends undefined ? TForm : TSubForm>
  >
>;

export type TransFormSubmitFunction<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any>,
> = (data: TransFormSubmitData<TForm, TSubForm>) => void;

export type TranslationFormTabHandlerProps = {
  activeTab: string;
  onChangeTab: (tabKey: string | null) => void;
  visibleTabs: SupportedTransFormLanguage[];
  irremovableTabs: SupportedTransFormLanguage[];
  onAddTab: (tabKey: SupportedTransFormLanguage) => void;
  onRemoveTab: (tabKey: SupportedTransFormLanguage) => void;
  isDefaultTab: (tabKey: SupportedTransFormLanguage | string) => boolean;
};

export type UseTranslationFormOptions<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any>,
> = {
  schemas?: TranslationFormSchema<TForm, TSubForm>;
  defaultValues?: TranslationFormDefaultValues<TForm, TSubForm>;
  validateMode?: keyof ValidationMode;
};

export type UseTranslationFormReturn<
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any>,
> = {
  tabHandler: TranslationFormTabHandlerProps;
  formControls: Record<`${SupportedTransFormLanguage}Control`, any> & {
    defaultControl: any;
  };
  /**
   * Get form control by language,
   *
   * @returns default if undefined
   */
  getFormControl: (lang?: SupportedTransFormLanguage) => any;
  handleSubmit: (submitFunc: TransFormSubmitFunction<TForm, TSubForm>) => () => void;
  cloneForm: (fromLang: SupportedTransFormLanguage) => void;
  /**
   * Get form get values function by language,
   *
   * @returns default if undefined
   */
  getValues: (lang?: SupportedTransFormLanguage) => UseFormGetValues<TForm>;
  /**
   * Get form set value function by language,
   *
   * @returns default if undefined
   */
  setValue: (lang?: SupportedTransFormLanguage) => UseFormSetValue<TForm>;
  isValid: () => boolean;
};
