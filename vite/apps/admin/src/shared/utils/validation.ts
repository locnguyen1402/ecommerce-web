import { yup } from '@vklink/components';
import { Combinator, FilterRule, Operator, PaginationApi, PlainMessage } from '@vklink/grpc-api';

export const optionSchema: yup.ObjectSchema<Pick<Option, 'label' | 'value'>> = yup.object({
  label: yup.string().defined(''),
  value: yup.string().required(),
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const uploadingFileSchema: yup.ObjectSchema<UploadingFile> = yup.object<UploadingFile>({
  url: yup.string().required(),
});

export const ValidationSchemas = {
  option: optionSchema,
  uploadingFile: uploadingFileSchema,
};

export const checkExistingRecordAsync = async <
  TRecord extends Record<string, any>,
  TField extends {
    name: string;
    value: string | undefined | null;
  },
>(
  api: PaginationApi<TRecord>,
  options: {
    notEqualFields?: TField[];
    equalFields?: TField[];
  }
) => {
  const notEqualFields = options.notEqualFields || [];
  const equalFields = options.equalFields || [];
  let isExisted = false;

  try {
    const rules = [
      ...notEqualFields.map((field) => {
        if (field.value === null || field.value === undefined) {
          return null;
        }

        return {
          rules: [],
          combinator: Combinator.UNSPECIFIED,
          not: false,
          field: field.name,
          operator: Operator.NOT_EQUAL,
          value: field.value,
        };
      }),
      ...equalFields.map((field) => {
        if (field.value === null || field.value === undefined) {
          return null;
        }

        return {
          rules: [],
          combinator: Combinator.UNSPECIFIED,
          not: false,
          field: field.name,
          operator: Operator.EQUAL,
          value: field.value,
        };
      }),
    ].filter(Boolean) as PlainMessage<FilterRule>[];

    const { value } = await api({
      filter: {
        combinator: Combinator.AND,
        not: false,
        rules,
      },
      sortBy: [],
      paging: {
        pageIndex: 0,
        pageSize: 1,
      },
    });

    isExisted = !!value.length;
  } catch (error) {
    console.error('🚀 ~ checkExistingRecordAsync error:', error);
  }

  return isExisted;
};
