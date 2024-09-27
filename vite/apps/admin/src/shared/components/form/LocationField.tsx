import { SearchableSelectField } from '@vklink/components';

import { FIRST_PAGE_INDEX } from '@/constants';
import { useI18n, usePaginationQuery } from '@/hooks';

type Props<T> = {
  url: string;
  name: string;
  control: any;
  label: string;
  disabled?: boolean;
  queryKey: any[];
  dependOn?: Option;
  onChange?: (value: any) => void;
  enabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
};

const LocationField = <T extends {}>({
  name,
  control,
  label,
  disabled,
  url,
  queryKey,
  dependOn,
  onChange,
  enabled,
  isRequired,
  placeholder,
}: Props<T>) => {
  const { t } = useI18n();

  const { data: options, isLoading } = usePaginationQuery(url, {
    enabled,
    paging: {
      pageIndex: FIRST_PAGE_INDEX,
      pageSize: 1000,
    },
    queryKey: [...queryKey, dependOn?.value, dependOn?.label],
  });

  return (
    <SearchableSelectField
      control={control}
      name={name}
      label={label}
      isRequired={isRequired}
      isMulti={false}
      placeholder={placeholder ?? `${t('label.searchBy')} ${t('label.name').toLowerCase()}`}
      getOptionLabel={(p) => (p as any).name}
      getOptionValue={(p) => (p as any).id}
      options={options || []}
      isDisabled={isLoading || disabled}
      isLoading={isLoading}
      onSelect={onChange}
    />
  );
};

export { LocationField };
