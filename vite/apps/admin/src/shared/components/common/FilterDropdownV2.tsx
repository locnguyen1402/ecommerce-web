import { PropsWithChildren, ReactNode } from 'react';
import { default as BaseDropdown } from 'react-bootstrap/Dropdown';

import { KTIcon } from '@mila/metronic-core';

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

  closeOnActionsClick?: boolean;
  children: ReactNode | ((props: { close: () => void }) => ReactNode);
}>;

const FilterDropdownV2 = ({
  children,
  onReset,
  onSubmit,
  dropdownButton,
  closeOnActionsClick = true,
}: Props) => {
  const { t } = useI18n();

  return (
    <>
      <Dropdown
        dropdownButton={({ open }) => (
          <OkButton
            onClick={open}
            startDecorator={dropdownButton?.icon ?? <KTIcon iconName="filter" className="fs-2" />}
          >
            {dropdownButton?.text || t('actions.filter')}
          </OkButton>
        )}
      >
        {(props) => (
          <div className="w-250px w-md-300px">
            <div className="px-5 py-5 d-flex justify-content-between align-items-center">
              <div className="fs-5 text-gray-900 fw-bolder">{t('label.filterOptions')}</div>

              <button
                type="button"
                onClick={() => {
                  setTimeout(() => {
                    props.close();
                  }, 50);
                }}
                className="btn btn-sm btn-icon btn-bg-light btn-active-primary"
              >
                <i className="bi bi-x fs-2" />
              </button>
            </div>

            <div className="separator border-gray-200"></div>

            <div className="px-5 py-5">
              {typeof children === 'function' ? children({ close: props.close }) : children}

              <div className="mt-8 d-flex justify-content-end">
                <BaseDropdown.Item
                  className="p-0 w-auto me-2"
                  onClick={() => {
                    if (closeOnActionsClick) {
                      props.close();
                    }

                    onReset?.();
                  }}
                >
                  <CancelButton>{t('actions.reset')}</CancelButton>
                </BaseDropdown.Item>

                <BaseDropdown.Item
                  className="p-0 w-auto"
                  onClick={() => {
                    if (closeOnActionsClick) {
                      props.close();
                    }

                    onSubmit?.();
                  }}
                >
                  <OkButton>{t('actions.apply')}</OkButton>
                </BaseDropdown.Item>
              </div>
            </div>
          </div>
        )}
      </Dropdown>
    </>
  );
};

export { FilterDropdownV2 };
