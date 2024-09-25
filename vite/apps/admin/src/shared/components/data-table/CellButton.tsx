import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  className?: string;
  icon?: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const CellButton = ({ icon, children, className, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'btn btn-sm btn-link pt-0 pb-0 d-flex justify-content-center align-items-center',
        className
      )}
      style={{
        height: 'auto',
        width: 'auto',
      }}
      {...rest}
    >
      {children}
      {!!icon && icon}
    </button>
  );
};

export { CellButton };
