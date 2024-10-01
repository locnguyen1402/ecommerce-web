import { yup } from '@mila/components';

export const optionSchema: yup.ObjectSchema<Pick<Option, 'label' | 'value'>> = yup.object({
  label: yup.string().defined(''),
  value: yup.string().required(),
});
