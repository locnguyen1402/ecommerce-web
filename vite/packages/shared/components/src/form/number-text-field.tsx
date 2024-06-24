import { forwardRef, useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

const BaseNumericFormatInput = forwardRef<HTMLInputElement, NumericFormatProps>(
  function NumericFormatInput(props, ref) {
    return <NumericFormat getInputRef={ref} {...props} />;
  }
);

export type NumberTextFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  NumericFormatProps;

const NumberTextField = <TFieldValues extends FieldValues>({
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
  type,
  className,
  thousandSeparator,
  decimalSeparator,
  allowedDecimalSeparators,
  thousandsGroupStyle,
  decimalScale,
  fixedDecimalScale,
  allowNegative,
  allowLeadingZeros,
  suffix,
  prefix,
  id,

  ...rest
}: NumberTextFieldProps<TFieldValues>) => {
  const reactId = useId();
  const layoutClassNames = useFormFieldClassNames({
    size,
    variant,
    orientation,
    layoutConfig,
  });

  const inputId = id || `input-${reactId}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <FormFieldLayout
            orientation={layoutClassNames.orientation}
            config={layoutClassNames.layoutConfig}
            errorMessage={error?.message}
            helperText={helperText}
            label={
              <FormLabel htmlFor={inputId} className={labelClassName} isRequired={isRequired}>
                {label}
              </FormLabel>
            }
            field={
              <BaseNumericFormatInput
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                allowedDecimalSeparators={allowedDecimalSeparators}
                thousandsGroupStyle={thousandsGroupStyle}
                decimalScale={decimalScale}
                fixedDecimalScale={fixedDecimalScale}
                allowNegative={allowNegative}
                allowLeadingZeros={allowLeadingZeros}
                suffix={suffix}
                prefix={prefix}
                value={value}
                onValueChange={({ floatValue }) => {
                  onChange(floatValue);
                }}
                onBlur={onBlur}
                ref={ref}
                id={inputId}
                placeholder={placeholder}
                readOnly={isReadOnly}
                disabled={isDisabled}
                className={clsx(
                  'form-control',
                  layoutClassNames.size,
                  layoutClassNames.variant,
                  {
                    'is-invalid': isInvalid || !!error || invalid,
                  },
                  className
                )}
              />
            }
          />
        );
      }}
    />
  );
};

export { NumberTextField };
