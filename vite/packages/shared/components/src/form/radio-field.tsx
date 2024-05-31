import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

import { RadioInput, RadioInputProps } from '../input';

export type RadioFieldProps<
  TFieldValues extends FieldValues,
  TOption extends {},
> = FormFieldProps<TFieldValues> &
  Omit<RadioInputProps<TOption>, 'value' | 'onChange' | 'readOnly' | 'disabled'>;

const RadioField = <TFieldValues extends FieldValues, TOption extends {}>({
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
  // added here,
  options,
  classNames,
}: RadioFieldProps<TFieldValues, TOption>) => {
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
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        const notValid = isInvalid || !!error || invalid;

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
              <RadioInput
                disabled={isDisabled}
                options={options}
                value={value}
                onChange={onChange}
                classNames={{
                  container: clsx('form-control d-flex gap-6 border-0 px-0', classNames?.container),
                  item: clsx(
                    'form-check form-check-custom',
                    layoutClassNames.size,
                    layoutClassNames.variant,
                    classNames?.item
                  ),
                  itemInput: clsx(
                    'form-check-input',
                    {
                      'bg-transparent border-danger': notValid,
                    },
                    classNames?.itemInput
                  ),
                  itemLabel: clsx('form-check-label', classNames?.itemLabel),
                }}
              />
            }
          />
        );
      }}
    />
  );
};

export { RadioField };
