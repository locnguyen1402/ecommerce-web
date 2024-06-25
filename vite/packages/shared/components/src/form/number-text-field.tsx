import { ReactNode, forwardRef, useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { NumericFormat as BaseNumericFormat, NumericFormatProps } from 'react-number-format';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

const NumericFormatInput = forwardRef<HTMLInputElement, NumericFormatProps>((props, ref) => {
  return <BaseNumericFormat getInputRef={ref} {...props} />;
});

export type NumericFormatOptions = Pick<
  NumericFormatProps,
  | 'thousandSeparator'
  | 'decimalSeparator'
  | 'allowedDecimalSeparators'
  | 'thousandsGroupStyle'
  | 'decimalScale'
  | 'fixedDecimalScale'
  | 'allowNegative'
  | 'allowLeadingZeros'
  | 'suffix'
  | 'prefix'
>;

export type NumberTextFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  NumericFormatProps & {
    inputRender?: (inputComponent: ReactNode) => ReactNode;
  };

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

  inputRender,

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
        const inputComponent = (
          <NumericFormatInput
            displayType="input"
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
            onValueChange={({ value }) => {
              onChange(value);
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
        );
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
            field={typeof inputRender === 'function' ? inputRender(inputComponent) : inputComponent}
          />
        );
      }}
    />
  );
};

export { NumberTextField };
