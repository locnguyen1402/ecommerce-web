import { ChangeEventHandler, ReactNode, useMemo } from 'react';

export type RadioInputItemProps<TOption> = {
  id: string;
  name: string;
  disabled?: boolean;
  currentValue?: string;
  option: TOption;
  getOptionLabel?: (opt: TOption) => ReactNode;
  getOptionValue?: (opt: TOption) => string;
  classNames?: {
    container?: string;
    label?: string;
    input?: string;
  };
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

const RadioInputItem = <TOption extends {}>({
  id,
  name,
  disabled,
  option,
  getOptionLabel,
  getOptionValue,
  currentValue,
  classNames,
  onChange,
}: RadioInputItemProps<TOption>) => {
  const label = useMemo(() => {
    let temp: ReactNode = '';

    switch (true) {
      case typeof getOptionLabel === 'function':
        temp = getOptionLabel!(option);
        break;

      default:
        temp = (option as any)?.label;
        break;
    }

    return temp;
  }, [option, getOptionLabel]);

  const value = useMemo(() => {
    let temp = '';

    switch (true) {
      case typeof getOptionValue === 'function':
        temp = getOptionValue!(option);
        break;

      default:
        temp = (option as any)?.value;
        break;
    }

    return temp;
  }, [option, getOptionValue]);

  const isChecked = !!currentValue && !!value && currentValue === value;

  return (
    <div className={classNames?.container}>
      <input
        name={name}
        className={classNames?.input}
        type="radio"
        value={value}
        id={id}
        required
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
      />

      <label className={classNames?.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export { RadioInputItem };
