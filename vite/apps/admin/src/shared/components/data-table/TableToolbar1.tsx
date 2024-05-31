import { ReactNode } from 'react';

type Props = {
  left?: ReactNode;
  right?: ReactNode;
};

const TableToolbar1 = ({ left, right }: Props) => {
  return (
    <div className="card-header border-0 pt-6">
      <div className="card-title">{left}</div>
      <div className="card-toolbar">{right}</div>
    </div>
  );
};

export { TableToolbar1 };
