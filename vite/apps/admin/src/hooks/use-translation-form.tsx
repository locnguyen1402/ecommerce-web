import { useEffect, useState } from 'react';

import {
  useForm,
  yupResolver,
  FormResolver,
  UseFormGetValues,
  UseFormSetValue,
  FormDefaultValues,
} from '@vklink/components';

import { SupportedTransFormLanguage, TRANSLATION_FORM_DEFAULT_LANG } from '@/constants';
import {
  TransFormSubmitData,
  TransFormSubmitFunction,
  UseTranslationFormOptions,
  UseTranslationFormReturn,
} from '@/shared/types';

export const useTranslationForm = <
  TForm extends Record<string, any>,
  TSubForm extends Record<string, any> = TForm,
>({
  schemas,
  defaultValues,
  validateMode,
  ...rest
}: UseTranslationFormOptions<TForm, TSubForm>): UseTranslationFormReturn<TForm, TSubForm> => {
  const [activeTab, setActiveTab] = useState(TRANSLATION_FORM_DEFAULT_LANG);
  const [visibleTabs, setVisibleTabs] = useState([TRANSLATION_FORM_DEFAULT_LANG]);
  const [irremovableTabs, setIrremovableTabs] = useState<SupportedTransFormLanguage[]>([]);

  useEffect(() => {
    if (defaultValues && (defaultValues.vn || defaultValues.kr)) {
      setVisibleTabs(() => {
        return [
          TRANSLATION_FORM_DEFAULT_LANG,
          defaultValues?.vn && SupportedTransFormLanguage.VN,
          defaultValues?.kr && SupportedTransFormLanguage.KR,
          defaultValues?.jp && SupportedTransFormLanguage.JP,
        ].filter(Boolean) as SupportedTransFormLanguage[];
      });

      setIrremovableTabs(() => {
        return [
          defaultValues?.vn && SupportedTransFormLanguage.VN,
          defaultValues?.kr && SupportedTransFormLanguage.KR,
          defaultValues?.jp && SupportedTransFormLanguage.JP,
        ].filter(Boolean) as SupportedTransFormLanguage[];
      });
    }
  }, [defaultValues]);

  const getFormResolver = (
    lang: SupportedTransFormLanguage
  ): FormResolver<any, any> | undefined => {
    const validationSchema = schemas ? schemas[lang] : undefined;

    return validationSchema ? yupResolver(validationSchema as any) : undefined;
  };

  const getFormDefaultValues = (
    lang: SupportedTransFormLanguage
  ): FormDefaultValues<any> | undefined => {
    return defaultValues ? defaultValues[lang] || undefined : undefined;
  };

  const {
    control: enControl,
    formState: { isValid: enIsValid, errors: enErrors },
    getValues: enGetValues,
    trigger: enTrigger,
    reset: enReset,
    setValue: enSetValue,
  } = useForm<TForm>({
    resolver: getFormResolver(SupportedTransFormLanguage.EN),
    mode: validateMode,
    defaultValues: getFormDefaultValues(SupportedTransFormLanguage.EN),
  });
  const {
    control: vnControl,
    formState: { isValid: vnIsValid, errors: vnErrors },
    getValues: vnGetValues,
    trigger: vnTrigger,
    reset: vnReset,
    setValue: vnSetValue,
  } = useForm<TForm>({
    resolver: getFormResolver(SupportedTransFormLanguage.VN),
    mode: validateMode,
    defaultValues: getFormDefaultValues(SupportedTransFormLanguage.VN),
  });
  const {
    control: krControl,
    formState: { isValid: krIsValid, errors: krErrors },
    getValues: krGetValues,
    trigger: krTrigger,
    reset: krReset,
    setValue: krSetValue,
  } = useForm<TForm>({
    resolver: getFormResolver(SupportedTransFormLanguage.KR),
    mode: validateMode,
    defaultValues: getFormDefaultValues(SupportedTransFormLanguage.KR),
  });
  const {
    control: jpControl,
    formState: { isValid: jpIsValid, errors: jpErrors },
    getValues: jpGetValues,
    trigger: jpTrigger,
    reset: jpReset,
    setValue: jpSetValue,
  } = useForm<TForm>({
    resolver: getFormResolver(SupportedTransFormLanguage.JP),
    mode: validateMode,
    defaultValues: getFormDefaultValues(SupportedTransFormLanguage.JP),
  });

  const formValid: Record<SupportedTransFormLanguage, boolean> = {
    [SupportedTransFormLanguage.EN]: enIsValid,
    [SupportedTransFormLanguage.VN]: vnIsValid,
    [SupportedTransFormLanguage.KR]: krIsValid,
    [SupportedTransFormLanguage.JP]: jpIsValid,
  };

  const formGetErrors: Record<SupportedTransFormLanguage, () => typeof enErrors> = {
    [SupportedTransFormLanguage.EN]: () => enErrors,
    [SupportedTransFormLanguage.VN]: () => vnErrors,
    [SupportedTransFormLanguage.KR]: () => krErrors,
    [SupportedTransFormLanguage.JP]: () => jpErrors,
  };

  const formTrigger: Record<SupportedTransFormLanguage, typeof enTrigger> = {
    [SupportedTransFormLanguage.EN]: enTrigger,
    [SupportedTransFormLanguage.VN]: vnTrigger,
    [SupportedTransFormLanguage.KR]: krTrigger,
    [SupportedTransFormLanguage.JP]: jpTrigger,
  };

  const formReset: Record<SupportedTransFormLanguage, typeof enReset> = {
    [SupportedTransFormLanguage.EN]: enReset,
    [SupportedTransFormLanguage.VN]: vnReset,
    [SupportedTransFormLanguage.KR]: krReset,
    [SupportedTransFormLanguage.JP]: jpReset,
  };

  const formGetValues: Record<SupportedTransFormLanguage, UseFormGetValues<TForm>> = {
    [SupportedTransFormLanguage.EN]: enGetValues,
    [SupportedTransFormLanguage.VN]: vnGetValues,
    [SupportedTransFormLanguage.KR]: krGetValues,
    [SupportedTransFormLanguage.JP]: jpGetValues,
  };

  const formSetValue: Record<SupportedTransFormLanguage, UseFormSetValue<TForm>> = {
    [SupportedTransFormLanguage.EN]: enSetValue,
    [SupportedTransFormLanguage.VN]: vnSetValue,
    [SupportedTransFormLanguage.KR]: krSetValue,
    [SupportedTransFormLanguage.JP]: jpSetValue,
  };

  const isDefaultTab = (tabKey: SupportedTransFormLanguage | string) => {
    return tabKey === TRANSLATION_FORM_DEFAULT_LANG;
  };

  const onChangeTab = (tabKey: string | null) => {
    tabKey && setActiveTab(tabKey as SupportedTransFormLanguage);
  };

  const onAddTab = (tabKey: SupportedTransFormLanguage) => {
    setVisibleTabs((prev) => {
      const isExisted = prev.includes(tabKey);

      if (!isExisted) {
        return [...prev, tabKey];
      }

      return prev;
    });
  };

  const onRemoveTab = (tabKey: SupportedTransFormLanguage) => {
    if (tabKey !== TRANSLATION_FORM_DEFAULT_LANG) {
      setVisibleTabs((prev) => prev.filter((tab) => tab !== tabKey));

      if (tabKey === activeTab) {
        setActiveTab(TRANSLATION_FORM_DEFAULT_LANG);
      }
    }
  };

  const isInVisibleTabs = (lang: SupportedTransFormLanguage) => visibleTabs.includes(lang);

  const trigger = () => {
    const triggerPromises: Promise<boolean>[] = [];
    Object.values(SupportedTransFormLanguage).forEach((lang) => {
      if (isInVisibleTabs(lang)) {
        triggerPromises.push(formTrigger[lang]());
      }
    });

    return Promise.all(triggerPromises);
  };

  const isValid = () => {
    const isLangFormValid = (lang: SupportedTransFormLanguage): boolean => {
      const isValid = () => formValid[lang];

      return isInVisibleTabs(lang) ? isValid() : true;
    };

    return Object.values(SupportedTransFormLanguage).every((lang) => isLangFormValid(lang));
  };

  const handleSubmit = (submitFunc: TransFormSubmitFunction<TForm, TSubForm>) => {
    return async () => {
      await trigger();

      const isFormValid = isValid();

      if (!isFormValid) {
        return;
      }

      const submitData = Object.values(SupportedTransFormLanguage).reduce(
        (temp, current) => {
          const inVisibleList = isInVisibleTabs(current);
          return {
            ...temp,
            [current]: inVisibleList ? formGetValues[current]() : null,
          };
        },
        {} as TransFormSubmitData<TForm, TSubForm>
      );

      submitData.defaultData = formGetValues[TRANSLATION_FORM_DEFAULT_LANG]();

      submitFunc(submitData);
    };
  };

  const getFormControl = (lang?: SupportedTransFormLanguage) => {
    switch (lang) {
      case SupportedTransFormLanguage.EN:
        return enControl;
      case SupportedTransFormLanguage.VN:
        return vnControl;
      case SupportedTransFormLanguage.KR:
        return krControl;
      case SupportedTransFormLanguage.JP:
        return jpControl;
      default:
        return enControl;
    }
  };

  const cloneForm = (fromLang: SupportedTransFormLanguage) => {
    if (fromLang !== activeTab && isInVisibleTabs(fromLang)) {
      formReset[activeTab]({
        ...formGetValues[fromLang](),
      });
    }
  };

  const getValues = (lang?: SupportedTransFormLanguage) => {
    return formGetValues[lang || TRANSLATION_FORM_DEFAULT_LANG];
  };

  const setValue = (lang?: SupportedTransFormLanguage) => {
    return formSetValue[lang || TRANSLATION_FORM_DEFAULT_LANG];
  };

  return {
    tabHandler: {
      activeTab: String(activeTab),
      onChangeTab,
      visibleTabs,
      irremovableTabs,
      onAddTab,
      onRemoveTab,
      isDefaultTab,
    },
    formControls: {
      enControl,
      vnControl,
      krControl,
      jpControl,
      defaultControl: enControl,
    },
    getFormControl,
    handleSubmit,
    cloneForm,
    getValues,
    setValue,
    isValid,
  };
};
