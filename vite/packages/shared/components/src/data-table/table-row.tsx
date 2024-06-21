import { memo } from 'react';

import { Row } from '@tanstack/react-table';

import TableCell from './table-cell';

const TableRow = memo(
  <T extends {}>({ row }: { row: Row<T> }) => {
    return (
      <tr>
        {row.getVisibleCells().map((cell) => {
          return <TableCell key={cell.id} cell={cell} />;
        })}
      </tr>
    );
  },
  (prev, next) => {
    return prev.row.id === next.row.id;
  }
);

export default TableRow;
