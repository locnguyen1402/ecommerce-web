import { PropsWithChildren, ReactNode } from 'react';
import { default as BaseDropdown } from 'react-bootstrap/Dropdown';

import { KTIcon } from '@vklink/metronic-core';

import { useI18n } from '@/hooks';

import { CancelButton, OkButton } from '../button';
import { Dropdown } from './Dropdown';

type Props = PropsWithChildren<{
  onReset?: () => void;
  onSubmit?: () => void;

  dropdownButton?: {
    icon?: ReactNode;
    text?: string;
  };
}>;

const FilterDropdownV2 = ({ children, onReset, onSubmit, dropdownButton }: Props) => {
  const { t } = useI18n();

  return (
    <>
      <Dropdown
        dropdownButton={
          <OkButton
            startDecorator={dropdownButton?.icon ?? <KTIcon iconName="filter" className="fs-2" />}
          >
            {dropdownButton?.text || t('actions.filter')}
          </OkButton>
        }
      >
        <div className="w-250px w-md-300px">
          <div className="px-5 py-5">
            <div className="fs-5 text-gray-900 fw-bolder">{t('label.filterOptions')}</div>
          </div>

          <div className="separator border-gray-200"></div>

          <div className="px-5 py-5">
            {children}

            <div className="mt-8 d-flex justify-content-end">
              <BaseDropdown.Item className="p-0 w-auto me-2" onClick={onReset}>
                <CancelButton>{t('actions.reset')}</CancelButton>
              </BaseDropdown.Item>

              <BaseDropdown.Item className="p-0 w-auto" onClick={onSubmit}>
                <OkButton>{t('actions.apply')}</OkButton>
              </BaseDropdown.Item>
            </div>
          </div>
        </div>
      </Dropdown>
    </>
  );
};

export { FilterDropdownV2 };
