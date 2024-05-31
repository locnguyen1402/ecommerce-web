import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const CancelButton = ({ children, startDecorator, endDecorator, className, ...rest }: Props) => {
  return (
    <button {...rest} className={clsx('btn btn-light btn-active-light-primary btn-flex', className)}>
      {startDecorator && <div className=" d-inline-flex me-2">{startDecorator}</div>}
      {children}
      {endDecorator && <div className=" d-inline-flex ms-2">{endDecorator}</div>}
    </button>
  );
};

export { CancelButton };
