import { PropsWithChildren, ReactNode, useEffect, useMemo, useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import { LanguageCode } from '@vklink/grpc-api';
import { LabelValueList, LabelValueListDef } from '@vklink/components';

import {
  MAP_LANG_CODES,
  MAP_SUPPORTED_TRANS_FORM_LANGUAGES,
  SupportedTransFormLanguage,
  TRANSLATION_FORM_DEFAULT_LANG,
} from '@/constants';
import { useI18n } from '@/hooks';

import { TransLabelValueList, TransLabelValueListDef } from '../data-presentation';
import { TabPanel } from '../form';

type GetLangCodeField<TData extends Record<string, any>, TTranslationField extends keyof TData> =
  TData[TTranslationField] extends Array<infer TTranslationObject>
    ? keyof TTranslationObject
    : never;

type Props<
  TData extends Record<string, any>,
  TTranslationField extends keyof TData = 'translations',
  TLangCodeField extends GetLangCodeField<TData, TTranslationField> = GetLangCodeField<
    TData,
    TTranslationField
  >,
> = {
  data: TData | null | undefined;
  unmountOnExit?: boolean;
  toolbar?: ReactNode;
  options?: {
    translationField?: TTranslationField;
    langCodeField?: TLangCodeField;
  };
  defaultLangDef: LabelValueListDef<TData>;
  subLangDef:
    | TransLabelValueListDef<TData, TTranslationField>
    | ((lang: SupportedTransFormLanguage) => TransLabelValueListDef<TData, TTranslationField>);
};

const TranslationDetailLayout = <
  TData extends Record<string, any>,
  TTranslationField extends keyof TData = 'translations',
>({
  data,
  unmountOnExit,
  options,
  toolbar,
  defaultLangDef,
  subLangDef,
}: Props<TData, TTranslationField>) => {
  const { t } = useI18n();
  const [visibleTabs, setVisibleTabs] = useState<SupportedTransFormLanguage[]>([
    TRANSLATION_FORM_DEFAULT_LANG,
  ]);
  const [activeKey, setActiveKey] = useState<SupportedTransFormLanguage>(
    TRANSLATION_FORM_DEFAULT_LANG
  );

  const translationField = options?.translationField || 'translations';
  const langCodeField = options?.langCodeField || 'langCode';

  const translationList: Array<any> = useMemo(() => {
    if (!data) {
      return [];
    }

    const list = data[translationField];

    return Array.isArray(list) ? list : [];
  }, [data]);

  const onChangeTab = (tabKey: string | null) => {
    if (tabKey) {
      setActiveKey(tabKey as SupportedTransFormLanguage);
    }
  };

  useEffect(() => {
    if (data) {
      if (translationList.length) {
        const tabs = (
          translationList
            .map((item) => {
              const langCode = item[langCodeField] as LanguageCode;
              const supportedLang = MAP_SUPPORTED_TRANS_FORM_LANGUAGES[langCode];

              if (!langCode || !supportedLang) {
                return null;
              }

              return supportedLang;
            })
            .filter((t) => t && t !== TRANSLATION_FORM_DEFAULT_LANG) as SupportedTransFormLanguage[]
        ).sort((a, b) => (a > b ? -1 : 1));

        if (tabs.length) {
          setVisibleTabs([TRANSLATION_FORM_DEFAULT_LANG, ...tabs]);
        }
      }
    }
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <Tab.Container unmountOnExit={unmountOnExit} activeKey={activeKey} onSelect={onChangeTab}>
      <div className="card">
        <div className="card-header card-header-stretch">
          <div className="card-toolbar">
            <Nav variant="tabs" className="nav nav-tabs nav-line-tabs nav-stretch">
              {visibleTabs.map((tab) => {
                return (
                  <Nav.Item key={tab}>
                    <Nav.Link eventKey={tab}>{t(`translationForm.${tab}`)}</Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>

          <div className="card-toolbar align-items-center">{toolbar}</div>
        </div>
        <div className="card-body">
          <Tab.Content>
            {visibleTabs.map((tab) => {
              const subData = translationList.find((d) => d[langCodeField] === MAP_LANG_CODES[tab]);
              const isDefaultLang = tab === TRANSLATION_FORM_DEFAULT_LANG;

              const subLangDefs = typeof subLangDef === 'function' ? subLangDef(tab) : subLangDef;

              return (
                <TabPanel key={tab} eventKey={tab}>
                  {isDefaultLang && (
                    <>
                      <LabelValueList t={t as any} data={data} def={defaultLangDef} />
                    </>
                  )}

                  {!isDefaultLang && (
                    <TransLabelValueList
                      t={t as any}
                      data={data}
                      def={subLangDefs}
                      subData={subData}
                    />
                  )}
                </TabPanel>
              );
            })}
          </Tab.Content>
        </div>
      </div>
    </Tab.Container>
  );
};

export { TranslationDetailLayout };
