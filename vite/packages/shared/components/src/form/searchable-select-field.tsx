import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

import { SearchableSelectInput, SearchableSelectInputProps } from '../input';

export type SearchableSelectFieldProps<
  TFieldValues extends FieldValues,
  TOption extends {},
  IsMulti extends boolean = false,
> = FormFieldProps<TFieldValues> &
  Omit<
    SearchableSelectInputProps<TOption, IsMulti>,
    'value' | 'onChange' | 'isDisabled' | 'defaultValue' | 'placeholder' | 'onBlur'
  > & {
    onSelect?: (newValue: any) => void;
  };

const SearchableSelectField = <
  TFieldValues extends FieldValues,
  TOption extends {},
  IsMulti extends boolean = false,
>({
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
  className,
  onSelect,
  ...baseSelectProps
}: SearchableSelectFieldProps<TFieldValues, TOption, IsMulti>) => {
  const layoutClassNames = useFormFieldClassNames(
    {
      size,
      variant,
      orientation,
      layoutConfig,
    },
    {
      prefix: 'react-select-',
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
              <SearchableSelectInput
                className={clsx(layoutClassNames.size, layoutClassNames.variant, className)}
                value={value}
                onChange={(evt) => {
                  onChange(evt);
                  typeof onSelect === 'function' && onSelect(evt);
                }}
                onBlur={onBlur}
                placeholder={placeholder}
                isDisabled={isDisabled}
                {...baseSelectProps}
                classNames={{
                  ...baseSelectProps.classNames,
                  control: (props) => {
                    return clsx(
                      typeof baseSelectProps.classNames?.control === 'function' &&
                        baseSelectProps.classNames?.control(props),
                      {
                        'border-danger': notValid,
                      }
                    );
                  },
                }}
              />
            }
          />
        );
      }}
    />
  );
};

export { SearchableSelectField };
