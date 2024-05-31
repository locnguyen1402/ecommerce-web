import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import clsx from 'clsx';

type Props = PropsWithChildren<{
  isLoading?: boolean;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
}> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const OkButton = ({
  children,
  startDecorator,
  endDecorator,
  className,
  isLoading,
  disabled,
  ...rest
}: Props) => {
  return (
    <button
      {...rest}
      disabled={isLoading || disabled}
      className={clsx('btn btn-primary btn-flex', className)}
    >
      {startDecorator && <div className=" d-inline-flex me-2">{startDecorator}</div>}
      {children}
      {endDecorator && !isLoading && <div className=" d-inline-flex ms-2">{endDecorator}</div>}

      {isLoading && <span className="spinner-border spinner-border-sm ms-4"></span>}
    </button>
  );
};

export { OkButton };
