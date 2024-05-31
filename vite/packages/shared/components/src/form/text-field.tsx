import { InputHTMLAttributes, ReactNode, useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

export type TextFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  InputHTMLAttributes<HTMLInputElement> & {
    inputRender?: (inputComponent: ReactNode) => ReactNode;
  };

const TextField = <TFieldValues extends FieldValues>({
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
  inputRender,

  id,

  ...rest
}: TextFieldProps<TFieldValues>) => {
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
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        const inputComponent = (
          <input
            {...rest}
            id={inputId}
            type={type}
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
            value={value}
            onChange={onChange}
            onBlur={onBlur}
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
            // field={
            //   <div className="d-flex align-items-center position-relative">{inputComponent}</div>
            // }
          />
        );
      }}
    />
  );
};

export { TextField };
