/// <reference types="vite/client" />
/// <reference types="@mila/metronic-core/types.d.ts" />
/// <reference types="@mila/components/types.d.ts" />

type Leaves<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ''
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

type IdName = {
  id: string;
  name: string;
};

type IdResponse = {
  value: string;
};

type Nullable<T> = T | null;
