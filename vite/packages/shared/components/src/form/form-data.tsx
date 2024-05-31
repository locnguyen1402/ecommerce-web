import { createContext } from 'react';

import { FORM_FIELD_LAYOUT_CONFIG } from './constant';

export type FormDataContextModel = LayoutFormFieldProps & {
  isInvalid?: boolean;
  isDisabled?: boolean;
  layoutConfig?: LayoutFormFieldConfig;
  inContext?: boolean;
};

export const FormDataContext = createContext<FormDataContextModel>({
  variant: 'outlined',
  orientation: 'horizontal',
  size: 'md',
  isInvalid: false,
  isDisabled: false,
  inContext: false,
  layoutConfig: FORM_FIELD_LAYOUT_CONFIG,
});
