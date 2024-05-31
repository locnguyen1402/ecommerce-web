import { FC, PropsWithChildren } from 'react';
import { FormDataContext, FormDataContextModel } from './form-data';

type Props = PropsWithChildren<Omit<FormDataContextModel, 'inContext'>>;

const FormContainer: FC<Props> = ({
  children,
  variant = 'outlined',
  orientation = 'horizontal',
  size = 'md',
  isInvalid = false,
  isDisabled = false,
  layoutConfig,
}) => {
  const value: FormDataContextModel = {
    orientation,
    variant,
    size,
    isInvalid,
    isDisabled,
    inContext: true,
    layoutConfig,
  };

  return <FormDataContext.Provider value={value}>{children}</FormDataContext.Provider>;
};

export { FormContainer };
