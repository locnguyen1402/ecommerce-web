import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = PropsWithChildren<{
  className?: string;
  nestedForm?: boolean;
}>;

const FormLayout = ({ children, className, nestedForm }: Props) => {
  return (
    <div
      className={clsx('card', className, {
        'border-0 shadow-none': nestedForm,
      })}
    >
      {children}
    </div>
  );
};

export { FormLayout };
