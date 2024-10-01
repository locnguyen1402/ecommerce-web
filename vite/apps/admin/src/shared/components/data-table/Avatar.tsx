import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { KTIcon } from '@mila/metronic-core';

type Props = {
  avatar?: string;
  title?: string;

  classNames?: {
    container?: string;
    title?: string;
    description?: string;
  };
};

const Avatar = ({ avatar, title, classNames }: Props) => {
  return (
    <div
      className={clsx(
        'd-flex align-items-center justify-content-start',
        {
          'w-100': !classNames?.container,
        },
        classNames?.container
      )}
    >
      <div className="symbol symbol-50px me-4">
        {avatar ? (
          <img className="symbol-label" src={avatar} alt={title} />
        ) : (
          <span className="symbol-label bg-light-primary">
            <KTIcon iconName="abstract-26" className="fs-2x text-primary" />
          </span>
        )}
      </div>
    </div>
  );
};

export { Avatar };
