import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  className?: string;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const CellIconButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={clsx(
        'btn btn-icon btn-link pt-0 pb-0 d-flex justify-content-center align-items-center',
        className
      )}
      style={{
        height: 'auto',
        width: 'auto',
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

export { CellIconButton };
