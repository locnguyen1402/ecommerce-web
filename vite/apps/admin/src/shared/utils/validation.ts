import { yup } from '@vklink/components';

export const optionSchema: yup.ObjectSchema<Pick<Option, 'label' | 'value'>> = yup.object({
  label: yup.string().defined(''),
  value: yup.string().required(),
});
