import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import Flatpickr, { DateTimePickerProps } from 'react-flatpickr';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

export type DateTimeFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  options?: DateTimePickerProps['options'];
};

const DateTimeField = <TFieldValues extends FieldValues>({
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
  options,
  ...rest
}: DateTimeFieldProps<TFieldValues>) => {
  const layoutClassNames = useFormFieldClassNames({
    size,
    variant,
    orientation,
    layoutConfig,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
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
              <Flatpickr
                {...rest}
                readOnly={isReadOnly}
                disabled={isDisabled}
                onBlur={onBlur}
                className={clsx('form-control', layoutClassNames.size, layoutClassNames.variant, {
                  'is-invalid': isInvalid || !!error || invalid,
                })}
                placeholder={placeholder}
                value={value}
                onChange={(selected) => {
                  if (!options?.mode || options.mode === 'single' || options.mode === 'time') {
                    onChange(selected[0]);
                  } else {
                    onChange(selected);
                  }
                }}
                options={options}
              />
            }
          />
        );
      }}
    />
  );
};

export { DateTimeField };
