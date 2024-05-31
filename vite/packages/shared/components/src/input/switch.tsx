import { ReactNode, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

export type SwitchInputProps = {
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

const SwitchInput = ({ label, id, checked, classNames, disabled, onChange }: SwitchInputProps) => {
  const [inputId] = useState(id || `switch_input_${uuidv4()}`);

  return (
    <div className={clsx('form-check form-switch', classNames?.container)}>
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

export { SwitchInput };
