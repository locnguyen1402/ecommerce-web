import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{ className?: string; nestedForm?: boolean }>;

const FormBody = ({ children, className, nestedForm }: Props) => {
  return (
    <div
      className={clsx('card-body', className, {
        'p-0': nestedForm,
      })}
    >
      {children}
    </div>
  );
};

export { FormBody };
