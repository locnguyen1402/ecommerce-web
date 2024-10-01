import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { KTIcon } from '@mila/metronic-core';

type Props = {
  banner?: string;
  title?: string;

  classNames?: {
    container?: string;
    title?: string;
    description?: string;
  };
};

const Banner = ({ banner, title, classNames }: Props) => {
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
        {banner ? (
          <img
            className="symbol-label w-100px"
            style={{
              objectFit: 'contain',
            }}
            src={banner}
            alt={title}
          />
        ) : (
          <span
            className="symbol-label bg-light-primary w-100px"
            style={{
              objectFit: 'contain',
            }}
          >
            <KTIcon iconName="abstract-26" className="fs-2x text-primary" />
          </span>
        )}
      </div>
    </div>
  );
};

export { Banner };
