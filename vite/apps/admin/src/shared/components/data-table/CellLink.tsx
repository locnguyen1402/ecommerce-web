import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

type Props = PropsWithChildren<{
  href: string;
}>;

const CellLink = ({ href, children }: Props) => {
  return (
    <Link to={href} className="text-gray-900 text-hover-primary fw-bold fs-6">
      {children}
    </Link>
  );
};

export { CellLink };
