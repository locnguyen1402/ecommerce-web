import { useContext } from 'react';

import { FormDataContext } from './form-data';
import { FORM_FIELD_CLASS_NAME_PREFIX, FORM_FIELD_LAYOUT_CONFIG } from './constant';

const bindFormFieldClassName = (
  val?: string,
  options?: {
    prefix?: string;
    getter?: (val: string | undefined) => string;
  }
): string => {
  let className = '';

  if (!!val) {
    if (typeof options?.getter === 'function') {
      className = options.getter(val);
    } else if (!!options?.prefix) {
      className = `${options.prefix}${val}`;
    } else {
      className = `${FORM_FIELD_CLASS_NAME_PREFIX}${val}`;
    }
  }

  return className;
};

const mergeFormLayoutConfig = (
  priority1: LayoutFormFieldConfig | undefined,
  priority2: LayoutFormFieldConfig | undefined
): LayoutFormFieldConfig => {
  return {
    containerClass:
      priority1?.containerClass ||
      priority2?.containerClass ||
      FORM_FIELD_LAYOUT_CONFIG.containerClass,
    vertical: {
      labelClass:
        priority1?.vertical?.labelClass ||
        priority2?.vertical?.labelClass ||
        FORM_FIELD_LAYOUT_CONFIG.vertical?.labelClass,
      inputClass:
        priority1?.vertical?.inputClass ||
        priority2?.vertical?.inputClass ||
        FORM_FIELD_LAYOUT_CONFIG.vertical?.inputClass,
    },
    horizontal: {
      labelClass:
        priority1?.horizontal?.labelClass ||
        priority2?.horizontal?.labelClass ||
        FORM_FIELD_LAYOUT_CONFIG.horizontal?.labelClass,
      inputClass:
        priority1?.horizontal?.inputClass ||
        priority2?.horizontal?.inputClass ||
        FORM_FIELD_LAYOUT_CONFIG.horizontal?.inputClass,
    },
  };
};

type UseFormClassNamesOptions = {
  prefix?: string;
  classNameGetters?: {
    size?: (val: string | undefined) => string;
    variant?: (val: string | undefined) => string;
  };
};

export const useFormDataClassNames = (options?: UseFormClassNamesOptions) => {
  const context = useContext(FormDataContext);

  const sizeClassName = bindFormFieldClassName(context.size, {
    prefix: options?.prefix,
    getter: options?.classNameGetters?.size,
  });
  const variantClassName = bindFormFieldClassName(context.variant, {
    prefix: options?.prefix,
    getter: options?.classNameGetters?.variant,
  });

  return {
    size: context.inContext ? sizeClassName : undefined,
    variant: context.inContext ? variantClassName : undefined,
  };
};

export const useFormFieldClassNames = (
  fieldOption: LayoutFormFieldProps,
  options?: UseFormClassNamesOptions
) => {
  const context = useContext(FormDataContext);
  const formClassNames = useFormDataClassNames(options);
  const sizeClassName = bindFormFieldClassName(fieldOption?.size, options);
  const variantClassName = bindFormFieldClassName(fieldOption?.variant, options);

  const orientation =
    fieldOption.orientation || (context.inContext ? context.orientation : undefined);

  const layoutConfig = mergeFormLayoutConfig(
    fieldOption.layoutConfig,
    context.inContext ? context.layoutConfig : undefined
  );

  return {
    size: sizeClassName || formClassNames.size,
    variant: variantClassName || formClassNames.variant,
    orientation,
    layoutConfig,
  };
};
