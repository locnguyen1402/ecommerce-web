/// <reference types="vite/client" />
/// <reference types="@vklink/metronic-core/types.d.ts" />
/// <reference types="@vklink/components/types.d.ts" />

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;
