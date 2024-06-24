import {
  TextField,
  useForm,
  yupResolver,
  yup,
  FormContainer,
  SelectField,
} from '@vklink/components';
import { KTIcon } from '@vklink/metronic-core';

import { useI18n } from '@/hooks';
import { FilterDropdownV2 } from '@/shared/components';
import { ControlledPaginatedQueryParams } from '@/shared/types';

import { ProductListQuery } from '../types';

type FormValues = ControlledPaginatedQueryParams<ProductListQuery>;

type Props = {
  defaultValues: FormValues;
  onChange: (data: FormValues) => void;
  onReset: (data: FormValues) => void;
  isLoading: boolean;
};

const FilterToolbar = ({ defaultValues, onChange, onReset, isLoading }: Props) => {
  const { t } = useI18n();

  const schema: yup.ObjectSchema<FormValues> = yup.object({
    keyword: yup.string(),
  });

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    onChange(data);
  });

  const handleReset = () => {
    reset({});
    onReset(defaultValues);
  };

  return (
    <FormContainer
      layoutConfig={{
        containerClass: 'row',
      }}
      orientation="vertical"
      variant="solid"
    >
      <form
        onSubmit={onSubmit}
        onReset={handleReset}
        noValidate
        className="d-flex align-items-center gap-2"
      >
        <TextField
          placeholder={`${t('label.searchBy')} ${t('label.name').toLowerCase()}`}
          variant="solid"
          orientation="vertical"
          name="keyword"
          control={control}
          className="ps-10"
          inputRender={(input) => {
            return (
              <div className="d-flex align-items-center position-relative">
                <KTIcon iconName="magnifier" className="position-absolute ms-3 fs-2" />
                {input}
              </div>
            );
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onSubmit();
            }
          }}
        />

        <FilterDropdownV2 onSubmit={onSubmit} onReset={handleReset} />
      </form>
    </FormContainer>
  );
};

export default FilterToolbar;
