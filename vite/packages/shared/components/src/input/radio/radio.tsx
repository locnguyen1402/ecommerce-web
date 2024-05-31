import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

import { RadioInputItem, RadioInputItemProps } from './radio-item';

export type RadioInputProps<TOption> = {
  name?: string;
  value?: string;
  options: TOption[];
  classNames?: {
    container?: string;
    item?: string;
    itemLabel?: string;
    itemInput?: string;
  };
} & Pick<
  RadioInputItemProps<TOption>,
  'getOptionLabel' | 'getOptionValue' | 'onChange' | 'disabled'
>;

const RadioInput = <TOption extends {}>({
  name,
  options,
  classNames,
  disabled,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
}: RadioInputProps<TOption>) => {
  const [inputName] = useState(name || `radio_input_${uuidv4()}`);

  return (
    <div
      className={clsx(
        {
          'd-flex gap-6': !classNames?.container,
        },
        classNames?.container
      )}
    >
      {options.map((opt, index) => {
        const key = `${inputName}_${index}`;

        return (
          <RadioInputItem<TOption>
            currentValue={value}
            key={key}
            id={key}
            name={inputName}
            option={opt}
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            classNames={{
              container: classNames?.item,
              label: classNames?.itemLabel,
              input: classNames?.itemInput,
            }}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export { RadioInput };
