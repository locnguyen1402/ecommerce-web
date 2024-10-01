import { SearchableSelectField } from '@mila/components';

import { useDebouncedText, useI18n, usePaginationQuery } from '@/hooks';
import { FIRST_PAGE_INDEX } from '@/constants';
import { INVENTORY_API_URLS } from '@/api';

type Props = {
  control: any;
};

export const useShopCollectionsControl = ({ control }: Props) => {
  const { t } = useI18n();

  const {
    actualText: searchText,
    setActualText: setSearchText,
    debouncedText: debouncedSearchText,
  } = useDebouncedText();

  const { data: items, isLoading } = usePaginationQuery<IdName>(
    INVENTORY_API_URLS.SHOP_COLLECTION_OPTIONS,
    {
      enabled: searchText === debouncedSearchText,
      paging: {
        pageIndex: FIRST_PAGE_INDEX,
        pageSize: 1000,
      },
      queryKey: ['product-create-shop-collection-list', searchText],
      getAdditionalParams: () => ({
        keyword: searchText,
      }),
    }
  );

  return {
    field: (
      <SearchableSelectField
        control={control}
        name="children"
        label={t('label.subcategories')}
        isMulti
        isLoading={isLoading}
        inputValue={searchText}
        onInputChange={setSearchText}
        options={items || []}
        getOptionLabel={(p) => p.name}
        getOptionValue={(p) => p.id}
        isDisabled={isLoading}
      />
    ),
  };
};
