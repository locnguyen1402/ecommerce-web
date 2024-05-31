import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { KTIcon } from '@vklink/metronic-core';

type Props = {
  avatar?: string;
  title: string;
  description?: string;
  href?: string;

  classNames?: {
    container?: string;
    title?: string;
    description?: string;
  };
};

const RepresentativeInfo = ({ avatar, title, description, href, classNames }: Props) => {
  const hasDescription = !!description;

  const renderInfos = () => {
    const titleClassName = clsx(
      'text-gray-900 fw-bold fs-6',
      {
        'text-hover-primary': href,
        'mb-1': hasDescription,
      },
      classNames?.title
    );

    return (
      <>
        {href ? (
          <Link to={href} className={titleClassName}>
            {title}
          </Link>
        ) : (
          <div className={titleClassName}>{title}</div>
        )}
        {hasDescription && (
          <span
            className={clsx(
              'd-block text-muted text-truncate text fw-semibold fs-7 w-100',
              classNames?.description
            )}
          >
            {description}
          </span>
        )}
      </>
    );
  };

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
      <div className="flex-fill d-flex flex-column align-items-start overflow-hidden">
        {renderInfos()}
      </div>
    </div>
  );
};

export { RepresentativeInfo };
