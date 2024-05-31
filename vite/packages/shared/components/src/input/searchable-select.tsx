import clsx from 'clsx';
import Select, { Props as SelectProps } from 'react-select';

export type SearchableSelectInputProps<TOption, IsMulti extends boolean> = Pick<
  SelectProps<TOption, IsMulti>,
  | 'placeholder'
  | 'options'
  | 'getOptionLabel'
  | 'getOptionValue'
  | 'defaultValue'
  | 'value'
  | 'onChange'
  | 'isLoading'
  | 'inputValue'
  | 'onInputChange'
  | 'isClearable'
  | 'isMulti'
  | 'classNames'
  | 'isDisabled'
  | 'onBlur'
  | 'className'
>;

const SearchableSelectInput = <TOption extends {}, IsMulti extends boolean = false>({
  isLoading,
  placeholder,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  inputValue,
  onInputChange,
  isClearable,
  isMulti,
  classNames,
  isDisabled,
  onBlur,
  className,
}: SearchableSelectInputProps<TOption, IsMulti>) => {
  return (
    <Select<TOption, IsMulti>
      classNamePrefix="react-select"
      className={clsx('react-select-styled', className)}
      classNames={classNames}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isLoading={isLoading}
      isMulti={isMulti}
      options={options}
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      value={value}
      onChange={onChange}
      inputValue={inputValue}
      onInputChange={onInputChange}
      onBlur={onBlur}
    />
  );
};

export { SearchableSelectInput };
