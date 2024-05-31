import { ReactNode } from 'react';

import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

import { SwitchInput, SwitchInputProps } from '../input';

export type SwitchFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Omit<SwitchInputProps, 'checked' | 'disabled' | 'readOnly' | 'onChange' | 'label'> & {
    inputLabel?: ReactNode;
  };

const SwitchField = <TFieldValues extends FieldValues>({
  // props is predefined in types.d.ts file
  name,
  control,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isInvalid,
  helperText,
  placeholder,
  labelClassName,
  // layout props
  orientation,
  size,
  variant,
  layoutConfig,

  // additional props for this component
  // added here
  id,
  classNames,
  inputLabel,
}: SwitchFieldProps<TFieldValues>) => {
  const layoutClassNames = useFormFieldClassNames(
    {
      size,
      variant,
      orientation,
      layoutConfig,
    },
    {
      prefix: 'form-check-',
    }
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <FormFieldLayout
            orientation={layoutClassNames.orientation}
            config={layoutClassNames.layoutConfig}
            errorMessage={error?.message}
            helperText={helperText}
            label={
              <FormLabel className={labelClassName} isRequired={isRequired}>
                {label}
              </FormLabel>
            }
            field={
              <SwitchInput
                id={id}
                disabled={isDisabled}
                checked={!!value}
                onChange={onChange}
                label={inputLabel}
                classNames={{
                  ...classNames,
                  container: clsx(
                    'form-control form-check-custom border-0',
                    // layoutClassNames.size,
                    layoutClassNames.variant,
                    classNames?.container
                  ),
                }}
              />
            }
          />
        );
      }}
    />
  );
};

export { SwitchField };
