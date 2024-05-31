import './rich-text-field.scss';

import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

import { RichTextInput } from '../input';

export type RichTextFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues>;

const RichTextField = <TFieldValues extends FieldValues>({
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
}: RichTextFieldProps<TFieldValues>) => {
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
              <RichTextInput
                placeholder={placeholder}
                readOnly={isReadOnly}
                disabled={isDisabled}
                className={clsx('form-control', layoutClassNames.size, layoutClassNames.variant, {
                  'is-invalid': isInvalid || !!error || invalid,
                })}
                value={value}
                onChange={onChange}
              />
            }
          />
        );
      }}
    />
  );
};

export { RichTextField };
