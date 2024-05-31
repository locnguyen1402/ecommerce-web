import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export enum FormModes {
  UNKNOWN = 'unknown',
  VIEW = 'view',
  EDIT = 'edit',
  CREATE = 'create',
}

export const useFormMode = () => {
  const { pathname } = useLocation();

  return useMemo(() => {
    const formMode = pathname
      .split('/')
      .filter((x: any) => !!x)
      .pop();

    const isCreateMode = formMode === FormModes.CREATE;
    const isEditMode = formMode === FormModes.EDIT;
    const isViewMode = formMode === FormModes.VIEW || (!isEditMode && !isCreateMode);

    return {
      isViewMode,
      isCreateMode,
      isEditMode,
    };
  }, [pathname]);
};
