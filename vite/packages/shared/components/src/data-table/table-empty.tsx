import { ReactNode } from 'react';

type Props = { columnCount: number; children?: ReactNode };

const TableEmpty = ({ columnCount, children }: Props) => {
  const defaultEmpty = (
    <div className="d-flex justify-content-center w-100 py-5">No data found</div>
  );

  return (
    <tr>
      <td colSpan={columnCount}>{children ?? defaultEmpty}</td>
    </tr>
  );
};

export default TableEmpty;
