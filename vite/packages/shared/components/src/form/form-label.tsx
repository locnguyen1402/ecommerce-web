import { ReactNode } from 'react';

import clsx from 'clsx';

type Props = {
  children?: ReactNode;
  className?: string;
  htmlFor?: string | undefined;
} & Pick<FormControlOptions, 'isRequired'>;

const FormLabel = ({ children, isRequired, className, htmlFor }: Props) => {
  return (
    !!children && (
      <label
        htmlFor={htmlFor}
        className={clsx(className, {
          required: isRequired,
          'form-label fw-bold fs-6': !className,
        })}
      >
        {children}
      </label>
    )
  );
};

export { FormLabel };
