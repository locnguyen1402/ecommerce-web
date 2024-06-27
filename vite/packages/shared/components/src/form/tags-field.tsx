import { useId } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { FormLabel } from './form-label';
import { FormFieldLayout } from './form-field-layout';
import { useFormFieldClassNames } from './form-utils';

import { TagsInput, TagsInputProps } from '../input/tags';

export type TagsFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> &
  Pick<TagsInputProps, 'max' | 'addable' | 'removable' | 'downKey' | 'id'>;

const TagsField = <TFieldValues extends FieldValues>({
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
  max,
  addable,
  removable,
  downKey,
  id,

  ...rest
}: TagsFieldProps<TFieldValues>) => {
  const reactId = useId();
  const layoutClassNames = useFormFieldClassNames({
    size,
    variant,
    orientation,
    layoutConfig,
  });

  const inputId = id || `tag-field-${reactId}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
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
              <TagsInput
                id={inputId}
                max={max}
                addable={addable}
                removable={removable}
                downKey={downKey}
                readonly={isReadOnly}
                disabled={isDisabled}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                classNames={{
                  container: clsx(layoutClassNames.size, layoutClassNames.variant, {
                    'is-invalid': isInvalid || !!error || invalid,
                  }),
                  input: clsx(layoutClassNames.size),
                }}
              />
            }
          />
        );
      }}
    />
  );
};

export { TagsField };
