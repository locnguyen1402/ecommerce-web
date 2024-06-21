import clsx from 'clsx';

import { Cell, flexRender } from '@tanstack/react-table';

import { tableUtils } from './utils';

const TableCell = <T extends {}>({ cell }: { cell: Cell<T, unknown> }) => {
  return (
    <td className={clsx(tableUtils.getBodyCellClassName(cell))}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default TableCell;
