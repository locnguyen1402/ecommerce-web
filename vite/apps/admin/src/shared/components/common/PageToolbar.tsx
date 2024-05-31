import { PropsWithChildren } from 'react';

type Props = PropsWithChildren;

/**
 * @reference ToolbarClassic.tsx
 */
const PageToolbar = ({ children }: Props) => {
  if (!children) {
    return null;
  }

  return <div className="d-flex align-items-center gap-2 gap-lg-3">{children}</div>;
};

export { PageToolbar };
