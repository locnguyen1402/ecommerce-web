import { useMemo } from 'react';

import { FieldValues, SearchableSelectField, SearchableSelectFieldProps } from '@vklink/components';

import { useDebouncedText, usePaginationQuery } from '@/hooks';
import { FIRST_PAGE_INDEX } from '@/constants';

type Props<
  TFieldValues extends FieldValues,
  TOption extends {},
  IsMulti extends boolean = false,
> = Omit<
  SearchableSelectFieldProps<TFieldValues, TOption, IsMulti>,
  'inputValue' | 'onInputChange' | 'options'
> & {
  apiUrl: string;
  queryKey: any[];
};

const ApiSearchableSelectField = <
  TFieldValues extends FieldValues,
  TOption extends Record<string, any> = IdName,
  IsMulti extends boolean = false,
>({
  apiUrl,
  queryKey,
  ...selectProps
}: Props<TFieldValues, TOption, IsMulti>) => {
  const {
    actualText: searchText,
    setActualText: setSearchText,
    debouncedText: debouncedSearchText,
  } = useDebouncedText();

  const { data: items, isLoading } = usePaginationQuery<TOption>(apiUrl, {
    enabled: searchText === debouncedSearchText,
    paging: {
      pageIndex: FIRST_PAGE_INDEX,
      pageSize: 1000,
    },
    queryKey: [...queryKey, searchText],
    getAdditionalParams: () => ({
      keyword: searchText,
    }),
  });

  const getOptionLabel = useMemo(
    () => (selectProps.getOptionLabel || ((p) => p.name)) as typeof selectProps.getOptionLabel,
    [selectProps.getOptionLabel]
  );

  const getOptionValue = useMemo(
    () => (selectProps.getOptionValue || ((p) => p.id)) as typeof selectProps.getOptionValue,
    [selectProps.getOptionValue]
  );

  return (
    <SearchableSelectField
      {...selectProps}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      inputValue={searchText}
      onInputChange={setSearchText}
      options={items || []}
      isLoading={selectProps.isLoading || isLoading}
      isDisabled={isLoading || selectProps.isDisabled}
    />
  );
};

export { ApiSearchableSelectField };
