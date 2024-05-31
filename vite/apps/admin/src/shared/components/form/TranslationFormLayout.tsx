import { PropsWithChildren, ReactNode } from 'react';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import { useI18n } from '@/hooks';
import { SupportedTransFormLanguage, TRANSLATION_FORM_DEFAULT_LANG } from '@/constants';
import { TranslationFormTabHandlerProps } from '@/shared/types';

import { DropdownActions } from '../common';

type Props = PropsWithChildren<
  TranslationFormTabHandlerProps & {
    footer?: ReactNode;
    unmountOnExit?: boolean;
    cloneForm?: (fromLang: SupportedTransFormLanguage) => void;
  }
>;

const TranslationFormLayout = ({
  irremovableTabs,
  activeTab,
  onChangeTab,
  visibleTabs,
  footer,
  children,
  unmountOnExit,
  onAddTab,
  onRemoveTab,
  cloneForm,
}: Props) => {
  const { t } = useI18n();

  const isAddDisabled = (lang: SupportedTransFormLanguage) => visibleTabs.includes(lang);

  const isRemoveDisabled = (lang: SupportedTransFormLanguage) =>
    !visibleTabs.includes(lang) || irremovableTabs.includes(lang);

  const isCloneDisabled = (lang: SupportedTransFormLanguage) =>
    activeTab === lang ||
    !visibleTabs.includes(lang) ||
    activeTab === TRANSLATION_FORM_DEFAULT_LANG;

  return (
    <Tab.Container unmountOnExit={unmountOnExit} activeKey={activeTab} onSelect={onChangeTab}>
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
          <div className="card-toolbar align-items-center gap-2">
            {!!cloneForm && (
              <DropdownActions
                dropdownButton={
                  <div className="btn btn-sm btn-icon btn-bg-light btn-active-primary">
                    <i className="bi bi-copy fs-1" />
                  </div>
                }
                actions={[
                  {
                    isDisabled: isCloneDisabled(SupportedTransFormLanguage.EN),
                    title: t('translationForm.cloneEn'),
                    onClick: () => cloneForm(SupportedTransFormLanguage.EN),
                  },
                  {
                    isDisabled: isCloneDisabled(SupportedTransFormLanguage.VN),
                    title: t('translationForm.cloneVn'),
                    onClick: () => cloneForm(SupportedTransFormLanguage.VN),
                  },
                  {
                    isDisabled: isCloneDisabled(SupportedTransFormLanguage.KR),
                    title: t('translationForm.cloneKr'),
                    onClick: () => cloneForm(SupportedTransFormLanguage.KR),
                  },
                  {
                    isDisabled: isCloneDisabled(SupportedTransFormLanguage.JP),
                    title: t('translationForm.cloneJp'),
                    onClick: () => cloneForm(SupportedTransFormLanguage.JP),
                  },
                ]}
              />
            )}

            <DropdownActions
              dropdownButton={
                <div className="btn btn-sm btn-icon btn-bg-light btn-active-primary">
                  <i className="bi bi-plus-lg fs-1" />
                </div>
              }
              actions={[
                {
                  title: t('translationForm.addVn'),
                  onClick: () => onAddTab(SupportedTransFormLanguage.VN),
                  isDisabled: isAddDisabled(SupportedTransFormLanguage.VN),
                },
                {
                  title: t('translationForm.addKr'),
                  onClick: () => onAddTab(SupportedTransFormLanguage.KR),
                  isDisabled: isAddDisabled(SupportedTransFormLanguage.KR),
                },
                {
                  title: t('translationForm.addJp'),
                  onClick: () => onAddTab(SupportedTransFormLanguage.JP),
                  isDisabled: isAddDisabled(SupportedTransFormLanguage.JP),
                },
              ]}
            />

            <DropdownActions
              dropdownButton={
                <div className="btn btn-sm btn-icon btn-bg-light btn-active-primary">
                  <i className="bi bi-dash-lg fs-1" />
                </div>
              }
              actions={[
                {
                  title: t('translationForm.removeVn'),
                  onClick: () => onRemoveTab(SupportedTransFormLanguage.VN),
                  isDisabled: isRemoveDisabled(SupportedTransFormLanguage.VN),
                },
                {
                  title: t('translationForm.removeKr'),
                  onClick: () => onRemoveTab(SupportedTransFormLanguage.KR),
                  isDisabled: isRemoveDisabled(SupportedTransFormLanguage.KR),
                },
                {
                  title: t('translationForm.removeJp'),
                  onClick: () => onRemoveTab(SupportedTransFormLanguage.JP),
                  isDisabled: isRemoveDisabled(SupportedTransFormLanguage.JP),
                },
              ]}
            />
          </div>
        </div>
        <div className="card-body">
          <Tab.Content>{children}</Tab.Content>
        </div>

        {!!footer && footer}
      </div>
    </Tab.Container>
  );
};

const TabPanel = Tab.Pane;

export { TranslationFormLayout, TabPanel };
