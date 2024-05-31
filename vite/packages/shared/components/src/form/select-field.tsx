import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

export type SelectFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  options: Option[];
};

const SelectField = <TFieldValues extends FieldValues>({
  // props is predefined in types.d.ts file
  name,
  control,
  label,
  isRequired,
  isDisabled,
  isReadOnly,
  isInvalid,
  helperText,
  labelClassName,

  // layout props
  orientation,
  size,
  variant,
  layoutConfig,

  // additional props for this component
  // added here
  options,
}: SelectFieldProps<TFieldValues>) => {
  const layoutClassNames = useFormFieldClassNames(
    {
      size,
      variant,
      orientation,
      layoutConfig,
    },
    {
      prefix: 'form-select-',
    }
  );

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
              <select
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                disabled={isDisabled}
                className={clsx('form-select', layoutClassNames.size, layoutClassNames.variant, {
                  'is-invalid': isInvalid || !!error || invalid,
                })}
              >
                {options.map((opt) => {
                  return (
                    <option
                      disabled={opt.disabled}
                      selected={opt.value === value}
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </option>
                  );
                })}
              </select>
            }
          />
        );
      }}
    />
  );
};

export { SelectField };
