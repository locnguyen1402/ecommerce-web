import { ReactNode, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

export type CheckboxInputProps = {
  id?: string;
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  classNames?: {
    container?: string;
    label?: string;
    input?: string;
  };
};

const CheckboxInput = ({
  label,
  id,
  checked,
  classNames,
  disabled,
  onChange,
}: CheckboxInputProps) => {
  const [inputId] = useState(id || `check_box_${uuidv4()}`);

  return (
    <div className={clsx('form-check', classNames?.container)}>
      <input
        className={clsx('form-check-input', classNames?.input)}
        type="checkbox"
        id={inputId}
        checked={checked}
        disabled={disabled}
        onChange={(evt) => !!onChange && onChange(evt.target.checked)}
      />
      {!!label && (
        <label className={clsx('form-check-label', classNames?.label)} htmlFor={inputId}>
          {label}
        </label>
      )}
    </div>
  );
};

export { CheckboxInput };
