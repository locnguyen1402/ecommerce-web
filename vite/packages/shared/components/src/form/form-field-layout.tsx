import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  label?: ReactNode;
  field: ReactNode;

  errorMessage?: string;
  helperText?: string;

  orientation?: Orientation;
  config?: LayoutFormFieldConfig;
};

const FormFieldLayout = ({
  label,
  field,
  helperText,
  errorMessage,
  orientation = 'horizontal',
  config,
}: Props) => {
  const isVertical = orientation === 'vertical';
  const isHorizontal = orientation === 'horizontal';

  const labelColClass = clsx(
    isHorizontal && config?.horizontal?.labelClass,
    isVertical && config?.vertical?.labelClass
  );

  const inputColClass = clsx(
    isHorizontal && config?.horizontal?.inputClass,
    isVertical && config?.vertical?.inputClass
  );

  return (
    <div className={config?.containerClass}>
      <div className={labelColClass}>{!!label && label}</div>
      <div className={inputColClass}>
        {field}
        {!!errorMessage && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">{errorMessage}</div>
          </div>
        )}
        {!!helperText && <div className="form-text">{helperText}</div>}
      </div>
    </div>
  );
};

export { FormFieldLayout };
