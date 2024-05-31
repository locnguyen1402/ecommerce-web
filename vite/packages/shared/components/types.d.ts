/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from 'react';

import { RowData } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    header?: { className?: string };
    body?: { className?: string };
  }
}

declare global {
  interface BaseInputProps {
    startDecorator?: ReactNode;
    endDecorator?: ReactNode;
  }

  interface FormControlOptions {
    isRequired?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
  }

  interface BaseFormFieldProps {
    labelClassName?: string;
    placeholder?: string;
    helperText?: string;
  }

  type Orientation = 'vertical' | 'horizontal';

  interface LayoutFormFieldConfig {
    containerClass?: string;
    vertical?: {
      labelClass?: string;
      inputClass?: string;
    };
    horizontal?: {
      labelClass?: string;
      inputClass?: string;
    };
  }

  interface LayoutFormFieldProps {
    /**
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * @default 'outlined'
     */
    variant?: 'outlined' | 'solid';
    /**
     * @default 'horizontal'
     */
    orientation?: Orientation;
    /**
     * Configure form field layout
     *
     * Check layout in form-field-layout.tsx
     *
     * @description (vertical | horizontal).labelClass: classnames for label wrapper
     * @description (vertical | horizontal).inputClass: classnames for input wrapper
     */
    layoutConfig?: LayoutFormFieldConfig;
  }

  /**
   * base props for form fields
   * this type affects all form fields components
   */
  type FormFieldProps<
    TFieldValues extends
      import('react-hook-form').FieldValues = import('react-hook-form').FieldValues,
    TName extends
      import('react-hook-form').FieldPath<TFieldValues> = import('react-hook-form').FieldPath<TFieldValues>,
  > = BaseFormFieldProps &
    LayoutFormFieldProps &
    FormControlOptions & {
      label?: ReactNode;
      name: TName;
      control: import('react-hook-form').Control<TFieldValues>;
    };

  type Option<TValue extends string | number = string> = {
    label: string;
    value: T;
    disabled?: boolean;
  };

  interface UploadingFile extends File {
    url: string;
    id?: string;
  }

  interface UploadedResponseFile {
    name: string;
    url: string;
  }
}
