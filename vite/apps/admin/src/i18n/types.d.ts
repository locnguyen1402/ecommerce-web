// import the original type declarations
// import 'i18next';

// import all namespaces (for the default language, only)
// import en from 'locales/en.json';

import { resources } from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
