import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  className?: string;
}>;

const FormFooter = ({ children, className }: Props) => {
  return (
    <div className={clsx('card-footer d-flex justify-content-end py-6 px-9 gap-4', className)}>
      {children}
    </div>
  );
};

export { FormFooter };
