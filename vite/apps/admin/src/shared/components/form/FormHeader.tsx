import { HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

type Props = { title: ReactNode; action?: ReactNode; nestedForm?: boolean } & Omit<
  HTMLAttributes<HTMLDivElement>,
  'title'
>;

const FormHeader = ({ title, className, action, nestedForm, ...rest }: Props) => {
  return (
    <div
      {...rest}
      className={clsx('card-header border-bottom', className, {
        'px-0 min-h-50px mb-4 mb-lg-8': nestedForm,
      })}
    >
      <div className="card-title m-0">
        {typeof title === 'string' ? <h3 className="fw-bolder m-0">{title}</h3> : title}
      </div>

      {action && <div className="card-toolbar">{action}</div>}
    </div>
  );
};

export { FormHeader };
