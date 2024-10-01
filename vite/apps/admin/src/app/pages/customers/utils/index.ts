import { yup } from '@mila/components';

import { AdministrativeUnit } from '../types';

export const locationSchema: yup.ObjectSchema<AdministrativeUnit> = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  code: yup.string().required(),
});
