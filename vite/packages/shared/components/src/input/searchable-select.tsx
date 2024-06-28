import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import clsx from 'clsx';

import Select, { MenuListProps, MenuProps, Props as SelectProps, components } from 'react-select';

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
  | 'id'
> & {
  hasMore?: boolean;
  loadMore?: () => void;
};

type Props = {
  hasMore?: boolean;
  loadMore?: () => void;
};

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
  hasMore,
  loadMore,
  id,
}: SearchableSelectInputProps<TOption, IsMulti>) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  console.log('🚀 ~ menuIsOpen:', menuIsOpen);

  const EndList = ({ hasMore, loadMore }: Props) => {
    const { ref, inView } = useInView({
      threshold: 0,
    });

    useEffect(() => {
      if (hasMore && inView && !!loadMore) {
        loadMore();
      }
    }, [inView]);

    return <div ref={ref} style={{ height: 1 }} />;
  };

  const MenuList = ({ children, ...rest }: MenuListProps<TOption>) => {
    return (
      <components.MenuList {...rest}>
        {children}
        <EndList hasMore={hasMore} loadMore={loadMore} />
      </components.MenuList>
    );
  };

  console.log('🚀 ~ inputValue:', inputValue);
  useEffect(() => {
    console.log('🚀 ~ useEffect ~ useEffect:');
  }, []);

  return (
    <Select<TOption, IsMulti>
      id={id}
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
      // components={{ MenuList }}
      // menuIsOpen={menuIsOpen}
      // isSearchable
      // filterOption={() => true}
      // onMenuOpen={() => setMenuIsOpen(true)}
    />
  );
};

export { SearchableSelectInput };
