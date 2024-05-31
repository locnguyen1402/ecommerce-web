/* eslint-disable @typescript-eslint/ban-types */
import { ColumnMeta, Header, Cell } from '@tanstack/react-table';

const getHeaderCellClassName = <T extends {}>(header: Header<T, unknown>): string => {
  const meta = header.column.columnDef.meta as ColumnMeta<T, unknown>;

  return meta?.header?.className || '';
};

const getBodyCellClassName = <T extends {}>(cell: Cell<T, unknown>): string => {
  const meta = cell.column.columnDef.meta as ColumnMeta<T, unknown>;

  return meta?.body?.className || '';
};

export const tableUtils = {
  getHeaderCellClassName,
  getBodyCellClassName,
};
