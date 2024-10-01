import { SearchableSelectField } from '@mila/components';

import { useDebouncedText, useI18n, usePaginationQuery } from '@/hooks';
import { FIRST_PAGE_INDEX } from '@/constants';
import { INVENTORY_API_URLS } from '@/api';

type Props = {
  control: any;
};

export const useCategoriesControl = ({ control }: Props) => {
  const { t } = useI18n();

  const {
    actualText: searchText,
    setActualText: setSearchText,
    debouncedText: debouncedSearchText,
  } = useDebouncedText();

  const { data: categories, isLoading: isCategoryLoading } = usePaginationQuery<IdName>(
    INVENTORY_API_URLS.CATEGORIES,
    {
      enabled: searchText === debouncedSearchText,
      paging: {
        pageIndex: FIRST_PAGE_INDEX,
        pageSize: 1000,
      },
      queryKey: ['product-create-category-list', searchText],
      getAdditionalParams: () => ({
        keyword: searchText,
      }),
    }
  );

  return {
    field: (
      <SearchableSelectField
        control={control}
        name="categories"
        label={t('label.categories')}
        isMulti
        isLoading={isCategoryLoading}
        inputValue={searchText}
        onInputChange={setSearchText}
        options={categories || []}
        getOptionLabel={(p) => p.name}
        getOptionValue={(p) => p.id}
        isDisabled={isCategoryLoading}
      />
    ),
  };
};
