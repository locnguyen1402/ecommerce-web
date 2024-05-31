import { PropsWithChildren } from 'react';

import { useI18n } from '@/hooks';

import { CancelButton, OkButton } from '../button';

type Props = PropsWithChildren<{
  onReset?: () => void;
  onSubmit?: () => void;
}>;

const FilterDropdown = ({ children, onReset, onSubmit }: Props) => {
  const { t } = useI18n();

  return (
    <div className="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
      <div className="px-5 py-5">
        <div className="fs-5 text-gray-900 fw-bolder">{t('label.filterOptions')}</div>
      </div>

      <div className="separator border-gray-200"></div>

      <div className="px-5 py-5">
        {children}

        <div className="mt-8 d-flex justify-content-end">
          <CancelButton type="reset" data-kt-menu-dismiss="true" className="me-2" onClick={onReset}>
            {t('actions.reset')}
          </CancelButton>

          <OkButton type="submit" data-kt-menu-dismiss="true" className="" onSubmit={onSubmit}>
            {t('actions.apply')}
          </OkButton>
        </div>
      </div>
    </div>
  );
};

export { FilterDropdown };
