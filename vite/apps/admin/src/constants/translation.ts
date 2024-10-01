import { toAbsoluteUrl } from '@mila/metronic-core';

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: toAbsoluteUrl('media/flags/united-states.svg'),
  },
  {
    code: 'vi',
    name: 'Việt Nam',
    flag: toAbsoluteUrl('media/flags/vietnam.svg'),
  },
];
